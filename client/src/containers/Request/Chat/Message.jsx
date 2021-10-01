import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Avatar } from '@material-ui/core';
import styled from 'styled-components';
import { DateTime } from 'luxon';

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

const Message = ({ message, user, isUser }) => {
  if (isUser) {
    return (
      <Grid container display="flex" justifyContent="flex-end">
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
      </Grid>
    );
  }

  return (
    <Grid container justifyContent="flex-start">
      <Row>
        <Avatar src={user.profile_picture_url} alt={user.firstname.slice(0, 1)} />
        <YourText>
          <Col>
            <div>{message.message_body}</div>
            <YourTimeStamp>
              {`${DateTime.fromISO(message.date).toFormat('ccc')} ${DateTime.fromISO(message.time).toFormat('t')}`}
            </YourTimeStamp>
          </Col>
          {/* <span>{message.time}</span> */}
        </YourText>
      </Row>
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
  isUser: PropTypes.bool.isRequired,
};

export default Message;
