/* eslint camelcase: 0 */ // --> OFF

import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import {
  SelectedTaskContainer,
  AvatarLg,
  Username,
  UserInfo,
  StatusText,
  DetailsContainer,
  HeadingSmall,
  Row,
  Col,
  Button,
  ButtonDecline,
} from './styles-SelectedTask';

const url = 'http://localhost:3500';

const OpenRequest = () => {
  const task = useSelector((store) => store.selectedTaskReducer.task);
  const date = useSelector((store) => store.taskDataFormattedReducer.date);
  const time = useSelector((store) => store.taskDataFormattedReducer.time);
  const {
    street_address,
    city,
    state,
    zipcode,
  } = task.location;

  const clickApproveHandler = () => {
    axios.get(`${url}/task/help/${task.task_id}/37`)
      .then((res) => console.log(res));
  };

  return (
    <SelectedTaskContainer>
      <AvatarLg
        src={task.requester.profile_picture_url}
        alt={task.requester.firstname}
      />
      <Username>{`${task.requester.firstname} ${task.requester.lastname}`}</Username>
      <UserInfo>
        <span>{`★ ${task.requester.average_rating}`}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>1.2 miles away</span>
      </UserInfo>
      <StatusText>is requesting your assistance</StatusText>
      <DetailsContainer>
        <HeadingSmall>REQUEST DETAILS</HeadingSmall>
        <p>{task.description}</p>
      </DetailsContainer>
      <Row>
        <DetailsContainer>
          <HeadingSmall>TASK LOCATION</HeadingSmall>
          <Col>
            <span>{`${street_address}`}</span>
            <span>{`${city} ${state} ${zipcode}`}</span>
          </Col>
        </DetailsContainer>
        <DetailsContainer>
          <HeadingSmall>TIME</HeadingSmall>
          <Col>
            <span>{`${date}`}</span>
            <span>{`${time}`}</span>
          </Col>
        </DetailsContainer>
      </Row>
      <Row>
        <ButtonDecline>Decline</ButtonDecline>
        <Button onClick={clickApproveHandler}>Approve</Button>
      </Row>
      {/* <button>Next</button> */}
    </SelectedTaskContainer>
  );
};

export default OpenRequest;
