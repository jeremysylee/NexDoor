import React, { useState, useEffect } from 'react';
import Message from './Message';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = () => {
  let taskId;//= redux;
  if (!taskId) {
    return <></>;
  }
  // input -> two user id's
  // get existing chat messages from database
  // display existing chat messages
  //
  let userId; // from react-redux*********
  const url = 'http://localhost:3500';
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentTask, setCurrentTask] = useState(taskId);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [messages, setMessages] = useState([]);

  const [currentUser, setCurrentUser] = useState();//set to user id*********

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const formatTime = (time) => {
    let trail = 'AM';
    let hour = Number(time.substring(0, 2));
    const minutes = time.slice(2);
    // console.log(minutes);
    // console.log(hour);
    if (hour >= 12) {
      hour -= 12;
      trail = 'PM';
    }

    return hour + minutes + ' ' + trail;
  };

  const handleSend = () => {
    // send Message to database
    // add message to messages and display render on screen(setstate)
    const d = new Date();
    const dStr = d.toString();
    const currentDayOfMonth = d.getDate();
    const currentMonth = d.getMonth(); // Be careful! January is 0, not 1
    const currentYear = d.getFullYear();
    // const timeString = dStr.slice(16, 21);
    const timeString = formatTime(dStr.slice(16, 21));
    const dateString = (currentMonth + 1) + "/" + currentDayOfMonth + "/" + currentYear;

    console.log(timeString);
    console.log(dateString);
    const message = {
      firstname: firstName,
      lastname: lastName,
      message_body: currentMessage,
      date: dateString,
      time: timeString,
    };
    socket.emit('send-message', { task: currentTask, message: message });

    setMessages((prev) => [...prev, message]); // ???

    // axios.post(`${url}/${taskId}/${userId}`)
    //   .catch((err) => {
    //     throw (err);
    //   });

    // add message to
    const resetElements = document.getElementsByClassName('messageInput');
    for (let i = 0; i < resetElements.length; i++) {
      resetElements[i].value = '';
      resetElements[i].src = '';
    }
  };

  useEffect(() => {
    // const result = window.prompt('Enter name and task number');
    // const resultContainer = result.split(' ');
    setFirstName();
    setLastName();
    setCurrentUser();
    setCurrentTask(taskId);
    axios.get(`${url}/api/messages/${taskId}`)
      .then((data) => {
        setMessages(data);
      });
  }, [taskId]);

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

  useEffect(() => {
    const elem = document.getElementById('allMessages');
    elem.scrollTop = elem.scrollHeight;
  }, [messages]);

  const chatStyle = {
    position: 'relative',
    width: '600px',
    height: 'auto',
    margin: '50px auto',
    padding: '5px',
    borderRadius: '20px',
    boxShadow: '0 8px 16px 0 #BDC9D7',
  };

  const messageContaierStyle = {
    margin: '10px',
    height: '30vh',
    overflow: 'auto',
  };

  return (
    <div style={chatStyle}>
      <div style={messageContaierStyle} id="allMessages">
        {messages.map((message, idx) => {
          // console.log('current User: ', currentUser);
          // console.log('info: ', message.firstname, ' ', message.lastname);
          const user = `${message.firstname} ${message.lastname}`;
          // console.log(messages);
          let isUser;
          if (user === currentUser) {//set user to user id *********
            isUser = true;
          } else {
            isUser = false;
          }
          return (<Message key={idx} message={message} isUser={isUser} />);
        })}
      </div>
      <div style={{ position: 'relative', bottom: '0', right: '0', margin: '5px' }}>
        <input className="messageInput" placeholder="Write message here..." onChange={handleChange} />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;

// are messages already in order??
// using user_id rather than name would be preferable
