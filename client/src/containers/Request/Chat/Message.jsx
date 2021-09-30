import React from 'react';
import { Container, Grid, Avatar } from '@material-ui/core';
import styled from 'styled-components';
import { DateTime } from 'luxon';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Message = ({ message, user, isUser }) => {
  // console.log(message);
  let style;
  // let profilePic = message.firstname[0];//******** uncomment
  let profilePic = 'm';
  // console.log(profilePic);
  const dateStyle = {
    fontSize: '10px',
    color: 'grey',
  };

  const dateStyle2 = {
    fontSize: '10px',
    color: 'white',
    marginTop: '-5px',
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
      padding: '11px 14px 8px',
    };

    return (
      <Grid container display="flex" justifyContent="flex-end">
      <div style={style}>
        <span style={messageStyle}>{message.messageBody}</span>
        <div style={profilePicStyle}>{user.firstname.slice(0, 1)}</div>
        <div style={dateStyle}>{message.time} {message.date}</div>
        {/* <span>{message.time}</span> */}
      </div>
      </Grid>
    );
  }
  style = {
    marginLeft: '10%',
    margin: '10px 10px',
    backgroundColor: '#414292',
    borderRadius: '22px',
    padding: '2px 24px 9px',
    color: 'white',
  };
  return (
    <Grid container justifyContent="flex-start">
      <div style={style}>
        <Row>
          <span style={profilePicStyle}>{profilePic}</span>
          <div style={messageStyle}>{message.messageBody}</div>
        </Row>
        <div style={dateStyle2}>{DateTime.fromISO(message.time).toFormat('ccc')} {DateTime.fromISO(message.date).toFormat('HH:mm:ss')}</div>
        {/* <span>{message.time}</span> */}
      </div>
    </Grid>
  );

  const dateFormatted = DateTime.fromISO(now).toFormat('yyyy-MM-dd');
  const timeFormatted = DateTime.fromISO(now).toFormat('HH:mm:ss');

  // console.log(message.messageBody)
  // return (
  //   <div style={style}>

  //     <div>{message.messageBody}</div>
  //     {/* <span>{message.time}</span> */}
  //   </div>
  // );
};

export default Message;
