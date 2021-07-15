import React from 'react';

const Message = ({ message, isUser }) => {
  console.log(message);
  let style;

  if (isUser) {
    style = { 'margin-right': '10%', 'text-align': 'right' };
  } else {
    style = { 'margin-left': '10%' };
  }
  return (
    <div style={style}>
      <div>{message.message_body}</div>
      <span>{message.time}</span>
    </div>
  );
};

export default Message;
