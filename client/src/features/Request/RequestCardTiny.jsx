import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { motion } from 'framer-motion';

import {
  AvatarRing,
  AvatarMiddleRing,
  Username,
  UserInfoSt,
  Star,
} from './components/TaskCard.styles';

import { Col, Row } from '../../components/App.styles';

const RequestCardTinyContainer = styled(Row)`
  position: absolute;
  width: 262px;
  justify-content: center;
  border-radius: 10px;
  background-color: #FFFFFF;
  padding: 1em 0em;
  box-shadow: 2px 2px 5px #aeaeae, -1px -1px 5px #ededed;
  background-color: white;
  transform: translate(-40%, -160%);
  z-index: 200;
  &:hover {
    cursor: pointer;
  }
`;

const CardPoint = styled(RequestCardTinyContainer)`
  transform: rotate(45deg);
  position: absolute;
  z-index: -2;
  border-radius: 3px;
  width: 50;
  height: 50;
  left: 78px;
`;

const CardPointCover = styled(RequestCardTinyContainer)`
  transform: none;
  z-index: -1;
  height: 62px;
  top: 0;
  box-shadow: none;
`;

const AvatarRingSmall = styled(AvatarRing)`
  height: 52px;
  width: 52px;
`;

const AvatarMiddleRingSmall = styled(AvatarMiddleRing)`
  height: 46px;
  width: 46px;
`;

const UsernameSmall = styled(Username)`
  font-size: 14px;
  margin-top: 0;
`;

const UserInfoStSmall = styled(UserInfoSt)`
  font-size: 12px;
`;

const ColCentered = styled(Col)`
  justify-content: center;
  align-items: center;
`;

const AvatarTiny = styled(Avatar)`
  width: 42;
  height: 42;
  z-index: 100;
`;

const RequestCardTiny = ({ task, onMouseEnter, onMouseLeave }) => {
  const dispatch = useDispatch();
  const user = task.requester;

  const clickHandler = () => {
    dispatch({ type: 'SET_TASK', task });
    dispatch({ type: 'TOGGLE_REQUEST_MODAL', toggle: true });
  };

  const requestCardTinyContainerVariants = {
    start: { opacity: 0 },
    end: { opacity: 1 },
  };

  return (
    <RequestCardTinyContainer
      onClick={clickHandler}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      as={motion.div}
      initial="start"
      animate="end"
      exit={{ opacity: 0 }}
      variants={requestCardTinyContainerVariants}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <CardPointCover />
      <CardPoint />
      <ColCentered>
        <AvatarTiny src={user.profile_picture_url} alt={user.firstname} />
        <AvatarRingSmall />
        <AvatarMiddleRingSmall />
      </ColCentered>
      <Row style={{ marginLeft: '1em' }}>
        <Col>
          <UsernameSmall>{`${user.firstname} ${user.lastname}`}</UsernameSmall>
          <UserInfoStSmall>
            <Row style={{ alignItems: 'center' }}>
              <Star> ★ </Star>
              &nbsp;
              <b>{`${user.average_rating.toFixed(1) || 0}`}</b>
              <span>
                &nbsp;
                {`(${user.task_count})`}
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <b>1.2</b>
              &nbsp;
              <span> miles away</span>
            </Row>
          </UserInfoStSmall>
        </Col>
      </Row>
    </RequestCardTinyContainer>
  );
};

RequestCardTiny.propTypes = {
  task: PropTypes.shape({
    requester: PropTypes.shape({
      profile_picture_url: PropTypes.string,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      average_rating: PropTypes.number,
      task_count: PropTypes.number,
    }),
  }),
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

RequestCardTiny.defaultProps = {
  task: {
    requester: {
      profile_picture_url: '',
      firstname: '',
      lastname: '',
      average_rating: 0,
      task_count: 0,
    },
  },
};

export default RequestCardTiny;
