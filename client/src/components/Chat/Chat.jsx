import React, { useState, useEffect } from 'react';
import Message from './Message';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';

const socket = io('http://localhost:3000');

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
  let user = useSelector((store) => store.currentUserReducer.userData); // from react-redux*********
  let userId = user.user_id;
  console.log('userId: ', userId);
  const url = 'http://localhost:3500';
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentTask, setCurrentTask] = useState(taskId);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [messages, setMessages] = useState([]);

  const [currentUser, setCurrentUser] = useState(userId);//set to user id*********

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
      userId,
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
    setCurrentUser(userId);
    setCurrentTask(taskId);
    axios.get(`${url}/api/messages/${taskId}`)
      .then((data) => {
        setMessages(data.data);
      });
  }, [taskId, userId]);

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
    width: '746px',
    height: '100vh',
    padding: '5px',
    borderRadius: '20px'
  };

  const messageContaierStyle = {
    margin: '10px',
    height: '89vh',
    overflow: 'auto',
  };

  return (
    <div style={chatStyle}>
      <div style={messageContaierStyle} id="allMessages">
        {messages.map((message, idx) => {
          // console.log('current User: ', currentUser);
          // console.log('info: ', message.firstname, ' ', message.lastname);
          const user_1 = userId;
          // console.log(messages);
          let isUser;
          console.log(user_1, currentUser);
          if (user_1 === currentUser) {//set user to user id *********
            isUser = true;
          } else {
            isUser = false;
          }
          return (<Message key={idx} message={message} isUser={isUser} />);
        })}
      </div>
      <div style={{ position: 'relative', bottom: '0', right: '0', margin: '5px' }}>
        <input
          style={{ width: '45vw', borderRadius: '25px', height: '6vh', borderColor: 'grey' }}
          className="messageInput" placeholder="Write message here..." onChange={handleChange} />
        <IconButton onClick={handleSend} > <SendTwoToneIcon /></IconButton>
        {/* <button onClick={handleSend}>Send</button> */}
      </div>
    </div>
  );
};

export default Chat;

// are messages already in order??
// using user_id rather than name would be preferable
