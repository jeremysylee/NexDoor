/* eslint-disable import/order */

const { app } = require('./app');

const port = process.env.PORT || 3500;

const server = app.listen(port, () => {
  console.log(`app is listening at port: ${port}`);
});

// Attach socket.io to the server //
const io = require('socket.io')(server, { cors: { origin: '*' } });

io.sockets.on('connection', (socket) => {
  console.log('user connected');
  socket.on('send-message', ({ task, message }) => {
    console.log('socket', task, message);
    socket.broadcast.emit(task, message);
  });
});

/* CONCEPT: app.listen is identical to http.Server.listen().
In fact Express uses the http (note: NOT https) module under the hood.

        express().listen = function() {
          var server = http.createServer(this);
          return server.listen.apply(server, arguments);
        }

The app returned by express() is a javascript function to be used as a callback by the server.
In otherwords, when the server is accessed, it invokes app function (object) as a callback.
Also, as seen above, app.listen returns the server instance
if you need to re-use the server instance
*/
