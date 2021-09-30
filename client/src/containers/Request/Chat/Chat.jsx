import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import { DateTime } from 'luxon';
import Message from './Message';

const socket = io('http://localhost:3500');

const Chat = () => {
  const selectedTask = useSelector((store) => store.selectedTaskReducer.task);
  const taskId = selectedTask.task_id;
  if (taskId === undefined) {
    return <></>;
  }
  // input -> two user id's
  // get existing chat messages from database
  // display existing chat messages
  //
  const user = useSelector((store) => store.currentUserReducer.userData);
  const task = useSelector((store) => store.selectedTaskReducer.task);
  const userId = user.user_id;

  const url = 'http://localhost:3500';
  const [input, setinput] = useState('');
  const [messages, setMessages] = useState([]);

  socket.on(task.task_id, (data) => {
    setMessages((prev) => [...prev, data]);
  });

  const handleChange = (e) => {
    setinput(e.target.value);
  };

  const resetInput = () => {
    setinput('');
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const now = DateTime.local();
    const dateFormatted = DateTime.fromISO(now).toFormat('yyyy-MM-dd');
    const timeFormatted = DateTime.fromISO(now).toFormat('HH:mm:ss');
    const message = {
      userId,
      firstname: user.firstname,
      lastname: user.lastname,
      messageBody: input,
      date: dateFormatted,
      time: timeFormatted,
    };

    // socket.io for live updates
    socket.emit('send-message', { task: task.task_id, message });

    setMessages((prev) => [...prev, message]);

    // data persistence stores in database
    try {
      await axios.post(`${url}/api/messages/${task.task_id}/${userId}`, message);
    } catch (err) {
      console.log(err);
    }

    // reset inputs
    resetInput();
    const resetElements = document.getElementsByClassName('messageInput');
    for (let i = 0; i < resetElements.length; i++) {
      resetElements[i].value = '';
      resetElements[i].src = '';
    }
  };

  const getMessages = () => {
    axios.get(`${url}/api/messages/${taskId}`)
      .then((data) => {
        setMessages(data.data);
      });
  };

  useEffect(() => {
    // get the messages on load
    getMessages();
  }, [taskId, userId]);

  // useEffect(() => {
  //   const elem = document.getElementById('allMessages');
  //   elem.scrollTop = elem.scrollHeight;
  //   console.log(messages, 'messages');
  // }, [messages]);

  const chatStyle = {
    position: 'relative',
    minWidth: '40%',
    height: '75vh',
    padding: '5px',
    borderRadius: '20px',
  };

  const messageContaierStyle = {
    margin: '10px',
    height: '89%',
    overflow: 'auto',
  };

  // const [currentInterval, setCurrentInterval] = useState();

  // useEffect(() => {
  //   getMessages();
  //   if (currentInterval) {
  //     clearInterval(currentInterval);
  //   }

  //   const getTimer = setInterval(getMessages, 100);
  //   setCurrentInterval(getTimer);
  // }, [userId]);

  return (
    <div style={chatStyle}>
      <div style={messageContaierStyle} id="allMessages">
        {messages.map((message, idx) => {
          let isUser;
          if (message.user_id === userId) {
            isUser = true;
          } else {
            isUser = false;
          }
          return (<Message key={idx} message={message} user={user} isUser={isUser} />);
        })}
      </div>
      <form style={{
        position: 'relative',
        bottom: '0',
        right: '0',
        margin: '5px',
      }}
      >
        <input
          style={{
            width: '45vw',
            borderRadius: '25px',
            height: '6vh',
            borderColor: 'grey',
          }}
          placeholder="Write message here..."
          type="text"
          value={input}
          onChange={handleChange}
        />
        <IconButton
          onClick={(e) => { handleSend(e); }}
          type="submit"
        >
          <SendTwoToneIcon />
        </IconButton>
      </form>
    </div>
  );
};
export default Chat;

// // are messages already in order??
// // using user_id rather than name would be preferable
