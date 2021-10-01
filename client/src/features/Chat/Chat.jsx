/* eslint-disable react/no-array-index-key */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import { DateTime } from 'luxon';
import Message from './Message';
import {
  ChatContainer,
  MessagesContainer,
  Input,
  Form,
} from './Chat.styles';

const url = 'http://localhost:3500';
const socket = io('http://localhost:3500');

const Chat = () => {
  const user = useSelector((store) => store.currentUserReducer.userData);
  const task = useSelector((store) => store.selectedTaskReducer.task);
  const userId = user.user_id;

  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [timer, setTimer] = useState();
  // Concept: if a variable is declared here instead of state,
  // that variable will get reassigned on every re-render.

  const handleChange = (e) => {
    socket.emit('typing', { task: task.task_id, status: true });

    clearTimeout(timer);

    setTimer(setTimeout(() => {
      socket.emit('typing', { task: task.task_id, status: false });
    }, 5000));

    setInput(e.target.value);
  };

  const resetInput = () => {
    setInput('');
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (!input) {
      return 'requires input';
    }

    const now = DateTime.local();
    const dateFormatted = DateTime.fromISO(now).toFormat('yyyy-MM-dd');
    const timeFormatted = DateTime.fromISO(now).toFormat('HH:mm:ss');
    const message = {
      user_id: user.user_id,
      firstname: user.firstname,
      lastname: user.lastname,
      message_body: input,
      date: dateFormatted,
      time: timeFormatted,
    };

    // socket.io for live updates
    socket.emit('send-message', { task: task.task_id, message });
    socket.emit('typing', { task: task.task_id, status: false });

    setMessages((prev) => [...prev, message]);

    // reset input (before the api call so there is no delay);
    resetInput();

    // data persistence stores in database
    try {
      return axios.post(`${url}/api/messages/${task.task_id}/${userId}`, message);
    } catch (err) {
      return console.log(err);
    }
  };

  const getMessages = async () => {
    try {
      const { data } = await axios.get(`${url}/api/messages/${task.task_id}`);
      setMessages(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMessages();
    socket.on(task.task_id, (data) => {
      if (data.user_id) {
        setMessages((prev) => [...prev, data]);
      } else {
        setTyping(data);
      }
    });
  }, []);

  useEffect(() => {
    // Keeps window scrolled to the bottom of the chat window //
    const elem = document.getElementById('allMessages');
    elem.scrollTop = elem.scrollHeight;
  }, [messages]);

  return (
    <ChatContainer>
      <MessagesContainer id="allMessages">
        {messages.map((message, idx) => (
          <Message
            key={idx}
            message={message}
            user={user}
            otherUser={task.requester.user_id === userId ? task.helper : task.requester}
            isUser={message.user_id === userId}
            isTyping={typing}
            isLast={idx === messages.length - 1}
          />
        ))}
      </MessagesContainer>
      <Form onSubmit={(e) => { handleSend(e); }}>
        <Input
          placeholder="Write message here..."
          type="text"
          value={input}
          onChange={handleChange}
        />
        <IconButton type="submit">
          <SendTwoToneIcon />
        </IconButton>
      </Form>
    </ChatContainer>
  );
};
export default Chat;
