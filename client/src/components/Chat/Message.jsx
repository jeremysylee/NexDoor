import React from 'react';

const Message = ({ message, isUser }) => {
  // console.log(message);
  let style;

  if (isUser) {
    style = { marginRight: '10%', textAlign: 'right' };
  } else {
    style = { margintLeft: '10%' };
  }

  console.log(message.message_body)
  return (
    <div style={style}>
      <div>{message.message_body}</div>
      <span>{message.time}</span>
    </div>
  );
};

export default Message;
