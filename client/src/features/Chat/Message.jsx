import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Avatar } from '@material-ui/core';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { motion } from 'framer-motion';

import IsTyping from './IsTyping';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
`;

const MyText = styled.div`
  text-align: right;
  background-color: #4496B4;
  border-radius: 22px;
  width: fit-content;
  padding: 6px 2px 6px 24px;
  color: white;
  font-size: 14px;
  margin: 0.4em 3.5em;
`;

const YourText = styled(MyText)`
  text-align: left;
  background-color: white;
  color: black;
  margin-left: 10%;
  margin: 10px 10px;
  padding: 4px 31px 5px 19px;
`;

const MyTimeStamp = styled.div`
  font-size: 9px;
  color: white;
`;
const YourTimeStamp = styled(MyTimeStamp)`
  color: grey;
`;

const Message = ({
  message,
  otherUser,
  isUser,
  isTyping,
  isLast,
}) => {
  const rightBubble = {
    hidden: {
      opacity: 1,
      scale: 0,
      x: 40,
      y: 40,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const leftBubble = {
    start: {
      opacity: 0,
      scale: 0,
      x: -40,
      y: 40,
    },
    end: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
    },
  };

  if (isUser) {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={rightBubble}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
            <MyText>
              <Row>
                <Col style={{ marginRight: '15px' }}>
                  <span>{message.message_body}</span>
                  <MyTimeStamp>
                    {`${DateTime.fromISO(message.date).toFormat('ccc')} ${DateTime.fromISO(message.time).toFormat('t')}`}
                  </MyTimeStamp>
                </Col>
              </Row>
            </MyText>
          </motion.div>
        </div>
        {isTyping && isLast && (
          <IsTyping />
        )}
      </>
    );
  }

  return (
    <Grid container justifyContent="flex-start">
      <Col>
        <Row>
          <Avatar src={otherUser.profile_picture_url} alt={otherUser.firstname.slice(0, 1)} />
          <motion.div
            initial="start"
            animate="end"
            variants={leftBubble}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              ease: 'easeInOut',
            }}
          >
            <YourText>
              <Col>
                <div>{message.message_body}</div>
                <YourTimeStamp>
                  {`${DateTime.fromISO(message.date).toFormat('ccc')} ${DateTime.fromISO(message.time).toFormat('t')}`}
                </YourTimeStamp>
              </Col>
            </YourText>
          </motion.div>
        </Row>
        {isTyping && isLast && (
          <IsTyping />
        )}
      </Col>
    </Grid>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    date: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    message_body: PropTypes.string,
    time: PropTypes.string,
    userId: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    address: PropTypes.oneOfType([PropTypes.object]),
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    user_id: PropTypes.number,
    profile_picture_url: PropTypes.string,
  }).isRequired,
  otherUser: PropTypes.shape({
    address: PropTypes.oneOfType([PropTypes.object]),
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    user_id: PropTypes.number,
    profile_picture_url: PropTypes.string,
  }).isRequired,
  isUser: PropTypes.bool.isRequired,
  isTyping: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
};

export default Message;
