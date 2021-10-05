/* eslint camelcase: 0 */ // --> OFF

import React from 'react';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

import {
  Row,
  Col,
} from '../../components/App.styles';

const RequestInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 2em;
  padding: 1.5em 2em;
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 2px 3px #cccccc, -1px -1px 27px #f1f2f5;
`;

const AvatarTiny = styled(Avatar)`
  width: 55;
  height: 55;
  z-index: 100;
`;

const InfoHeader = styled.span`
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 0.5em;
`;
const InfoBody = styled.div`
  font-weight: 300;
  font-size: 14px;
`;

const InfoDetails = styled(InfoBody)`
  font-size: 14px;
  font-weight: 300;
  text-align: right;
  line-height: 1.3;
`;

const DateTime = styled(InfoDetails)`
  text-align: left;
`;

const Username = styled.span`
  font-weight: 500;
  font-size: 15px;
`;

const RequestInfoCard = () => {
  const selectedTask = useSelector((store) => store.selectedTaskReducer.task);
  const user = useSelector((store) => store.currentUserReducer.userData);
  const relevantUser = user.user_id === selectedTask.requester.user_id
    ? selectedTask.helper : selectedTask.requester;
  const date = useSelector((store) => store.taskDataFormattedReducer.date);
  const time = useSelector((store) => store.taskDataFormattedReducer.time);
  const {
    street_address,
    city,
    state,
    zipcode,
  } = selectedTask.location;

  return (
    <RequestInfoContainer>
      <Row style={{ justifyContent: 'space-between' }}>
        <Row style={{ alignItems: 'center' }}>
          <AvatarTiny src={relevantUser.profile_picture_url} alt={relevantUser.firstname} />
          <Col style={{ marginLeft: '1em' }}>
            <Username>{`${relevantUser.firstname} ${relevantUser.lastname}`}</Username>
            <DateTime>{`${date} ${time}`}</DateTime>
          </Col>
        </Row>
        <Col>
          <InfoDetails>{street_address}</InfoDetails>
          <InfoDetails>{`${city}, ${state} ${zipcode}`}</InfoDetails>
        </Col>
      </Row>
      <br />
      <InfoHeader>REQUEST DESCRIPTION:</InfoHeader>
      <InfoBody>
        {selectedTask.description}
      </InfoBody>
    </RequestInfoContainer>
  );
};

export default RequestInfoCard;
