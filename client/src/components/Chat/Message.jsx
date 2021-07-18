import React from 'react';

const Message = ({ message, isUser }) => {
  // console.log(message);
  let style;
  // let profilePic = message.firstname[0];//******** uncomment
  let profilePic = 'm';
  // console.log(profilePic);
  const dateStyle = {
    fontSize: '10px',
    color: 'grey',
  };

  const profilePicStyle = {
    height: '25px',
    width: '25px',
    backgroundColor: '#bbb',
    borderRadius: '50%',
    display: 'inline-block',
    textAlign: 'center',
  };

  const messageStyle = {
    margin: '10px',
  };

  if (isUser) {
    style = {
      marginRight: '10%',
      textAlign: 'right',
      margin: '10px',
    };

    return (
      <div style={style}>
        <span style={messageStyle}>{message.message_body}</span>
        <span style={profilePicStyle}>{profilePic}</span>
        <div style={dateStyle}>{message.time} {message.date}</div>
        {/* <span>{message.time}</span> */}
      </div>
    );
  }
  style = {
    margintLeft: '10%',
    margin: '10px',
  };
  return (
    <div style={style}>
      <span style={profilePicStyle}>{profilePic}</span>
      <span style={messageStyle}>{message.message_body}</span>
      <div style={dateStyle}>{message.time} {message.date}</div>
      {/* <span>{message.time}</span> */}
    </div>
  );

  // console.log(message.message_body)
  // return (
  //   <div style={style}>

  //     <div>{message.message_body}</div>
  //     {/* <span>{message.time}</span> */}
  //   </div>
  // );
};

export default Message;
