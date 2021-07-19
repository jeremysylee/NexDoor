import React from 'react';
import { Container, Grid, Avatar } from '@material-ui/core';
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
      textAlign: 'right',
      margin: '10px 10px',
      height: '8vh',
      backgroundColor: '#F2F1F7',
      borderRadius: '22px',
      width: 'fit-content',
      padding: '11px 14px 8px'
    };

    return (
      <Grid container display="flex" justifyContent="flex-end">
      <div style={style}>
        <span style={messageStyle}>{message.message_body}</span>
        <div style={profilePicStyle}>{profilePic}</div>
        <div style={dateStyle}>{message.time} {message.date}</div>
        {/* <span>{message.time}</span> */}
      </div>
      </Grid>
    );
  }
  style = {
    margintLeft: '10%',
    margin: '10px',
  };
  return (
    <div style={style}>
      <span style={profilePicStyle}>{profilePic}</span>
      <div style={messageStyle}>{message.message_body}</div>
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
