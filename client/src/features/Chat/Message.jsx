import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Avatar } from '@material-ui/core';
import { DateTime } from 'luxon';
import { motion } from 'framer-motion';

import IsTyping from './IsTyping';
import {
  Row,
  Col,
  MyTextContainer,
  RightText,
  LeftText,
  TextBody,
  TextBodySmall,
  MyTimeStamp,
  YourTimeStamp,
} from './Chat.styles';

import {
  rightBubbleVariants,
  leftBubbleVariants,
  BubbleTransition,
} from './Chat.motion';

const Message = ({
  message,
  otherUser,
  isUser,
  isTyping,
  isLast,
}) => {
  if (isUser) {
    return (
      <>
        <MyTextContainer>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={rightBubbleVariants}
            transition={BubbleTransition}
          >
            <RightText>
              {message.message_body.length < 20
                ? <TextBodySmall>{message.message_body}</TextBodySmall>
                : <TextBody>{message.message_body}</TextBody>}
              <MyTimeStamp>
                {`${DateTime.fromISO(message.date).toFormat('ccc')} ${DateTime.fromISO(message.time).toFormat('t')}`}
              </MyTimeStamp>
            </RightText>
          </motion.div>
        </MyTextContainer>
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
          <Avatar
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={otherUser.profile_picture_url}
            alt={otherUser.firstname.slice(0, 1)}
          />
          <motion.div
            initial="start"
            animate="end"
            variants={leftBubbleVariants}
            transition={BubbleTransition}
          >
            <LeftText>
              <TextBody>{message.message_body}</TextBody>
              <YourTimeStamp>
                {`${DateTime.fromISO(message.date).toFormat('ccc')} ${DateTime.fromISO(message.time).toFormat('t')}`}
              </YourTimeStamp>
            </LeftText>
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
