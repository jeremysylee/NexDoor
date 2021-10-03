import React from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

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
  padding: 0.7em;
  box-shadow: 2px 2px 3px #cacaca, -1px -1px 11px #f1f2f5;
  background-color: white;
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

const RequestCardTiny = () => {
  const selectedTask = useSelector((store) => store.selectedTaskReducer.task);
  const user = selectedTask.requester;

  return (
    <RequestCardTinyContainer>
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

export default RequestCardTiny;
