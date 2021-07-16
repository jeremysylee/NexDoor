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
  const [currentTask, setCurrentTask] = useState(taskId);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
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

  const [currentUser, setCurrentUser] = useState();

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleSend = () => {
    // send Message to database
    // add message to messages and display render on screen(setstate)
    const d = new Date();
    console.log(d);
    const message = {
      firstname: firstName,
      lastname: lastName,
      message_body: currentMessage,
      date: '',
      time: '',
    };
    socket.emit('send-message', { task: currentTask, message: message });

    setMessages((prev) => [...prev, message]); // ???

    // axios.post(`${url}/${taskId}/${userId}`)
    //   .catch((err) => {
    //     throw (err);
    //   });

    // add message to
  };

  useEffect(() => {
    const result = window.prompt('Enter name and task number');
    const resultContainer = result.split(' ');
    setFirstName(resultContainer[0]);
    setLastName(resultContainer[1]);
    setCurrentUser(resultContainer[0] + ' ' + resultContainer[1]);
    setCurrentTask(resultContainer[2]);
  }, []);

  useEffect(() => {
    // console.log('hi');
    // console.log('result: ', result);
    // setCurrentTask(taskId);
    // socket.emit('join', 'room1');
    socket.on(currentTask, (data) => {
      // console.log('currentTask: ', currentTask);
      // console.log('data: ', data);
      setMessages((prev) => [...prev, data]);
    });
  }, [currentTask]);

  return (
    <div>
      <div>
        {messages.map((message, idx) => {
          console.log('current User: ', currentUser);
          console.log('info: ', message.firstname, ' ', message.lastname);
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