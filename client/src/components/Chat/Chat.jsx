import React, { useState, useEffect } from 'react';
import Message from './Message';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = (taskId) => {
  // input -> two user id's
  // get existing chat messages from database
  // display existing chat messages
  //
  let userId; // from react-redux
  const url = 'http://localhost:3500';
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      "firstname": "andrew",
      "lastname": "munoz",
      "message_body": "where are you",
      "date": "2021-06-13T07:00:00.000Z",
      "time": "04:51:00"
    },
    {
      "firstname": "Spongebob",
      "lastname": "Squarepants",
      "message_body": "i have no idea where i am",
      "date": "2021-04-13T07:00:00.000Z",
      "time": "06:21:00"
    },
  ]);

  const [currentUser, setCurrentUser] = useState('Spongebob Squarepants');

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleSend = () => {
    // send Message to database
    // add message to messages and display render on screen(setstate)
    const d = new Date();
    console.log(d.toISOString());
    const message = {
      firstname: 'Spongebob',
      lastname: 'Squarepants',
      message_body: currentMessage,
      date: '',
      time: '',
    };
    socket.emit('send-chat-message', message.message_body);

    setMessages((prev) => [...prev, message]); // ???

    // axios.post(`${url}/${taskId}/${userId}`)
    //   .catch((err) => {
    //     throw (err);
    //   });

    // add message to
  };

  useEffect(() => {
    console.log('hi');
    socket.on('chat-message', (data) => {
      console.log('data: ', data);
    });
  }, []);

  return (
    <div>
      <div>
        {messages.map((message, idx) => {
          const user = `${message.firstname} ${message.lastname}`;
          // console.log(messages);
          let isUser;
          if (user === currentUser) {
            isUser = true;
          } else {
            isUser = false;
          }
          return (<Message key={idx} message={message} isUser={isUser} />);
        })}
      </div>
      <textarea placeholder="Write message here..." onChange={handleChange} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;

// are messages already in order??
// using user_id rather than name would be preferable