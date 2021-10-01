/* eslint-disable import/order */

const { app } = require('./app');

const port = process.env.PORT || 3500;

const server = app.listen(port, () => {
  console.log(`app is listening at port: ${port}`);
});

// Attach socket.io to the server //
const io = require('socket.io')(server, { cors: { origin: '*' } });

io.sockets.on('connection', (socket) => {
  socket.on('send-message', ({ task, message }) => {
    socket.broadcast.emit(task, message);
  });
  socket.on('typing', ({ task, status }) => {
    socket.broadcast.emit(task, status);
  });
});
