const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const io = require('socket.io')(3000, {
  cors: {
    origin: '*',
  },
});
const router = require('./router');
require('dotenv').config();

const app = express();
const port = 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());
app.use('/api', router);

app.listen(port, () => {
  console.log(`app is listening at port: ${port}`);
});

app.use(express.static(path.join(__dirname, '..', 'client/index')));

io.on('connection', (socket) => {
  console.log('user connected');
  // socket.on('join', (room) => {
  //   socket.join(room);
  // });
  socket.on('send-message', ({ task, message }) => {
    console.log(task);
    socket.broadcast.emit(task, message);
    // socket.to('room1').emit(message);
  });
});
