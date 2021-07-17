/* eslint camelcase: 0 */ // --> OFF

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import {
  SelectedTaskContainer,
  AvatarLg,
  AvatarRing,
  AvatarMiddleRing,
  Username,
  UserInfo,
  StatusText,
  DetailsContainer,
  DetailsContainerTime,
  HeadingSmall,
  Row,
  RowSlim,
  Col,
  Button,
  ButtonDecline,
  BackButton,
  LineTop,
  LineBottom,
} from './styles-SelectedTask';

const url = 'http://localhost:3500';

const OpenTask = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.currentUserReducer.userId);
  const task = useSelector((store) => store.selectedTaskReducer.task);
  const date = useSelector((store) => store.taskDataFormattedReducer.date);
  const time = useSelector((store) => store.taskDataFormattedReducer.time);
  const {
    street_address,
    city,
    state,
    zipcode,
  } = task.location;

  const clickClaimHandler = () => {
    axios.put(`${url}/api/task/help/${task.task_id}/${userId}`)
      .then((res) => console.log(res));
  };

  const clickBackHandler = () => {
    dispatch({
      type: 'SHOW_MAP', toggle: true,
    });
  };

  return (
    <SelectedTaskContainer>
      <RowSlim>
        <BackButton onClick={clickBackHandler}>Back</BackButton>
      </RowSlim>
      <Col>
        <AvatarLg
          src={task.requester.profile_picture_url}
          alt={task.requester.firstname}
        />
        <AvatarRing />
        <AvatarMiddleRing />
      </Col>
      <Username>{`${task.requester.firstname} ${task.requester.lastname}`}</Username>
      <UserInfo>
        <span>{`★ ${task.requester.avg_rating || 0} (${task.requester.task_count})`}</span>
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
        <DetailsContainerTime>
          <HeadingSmall>TIME</HeadingSmall>
          <Col>
            <span>{`${date}`}</span>
            <span>{`${time}`}</span>
          </Col>
        </DetailsContainerTime>
      </Row>
      <LineTop />
      <Row>
        <ButtonDecline onClick={clickBackHandler}>Decline</ButtonDecline>
        <Button onClick={clickClaimHandler}>Claim</Button>
      </Row>
      <LineBottom />
    </SelectedTaskContainer>
  );
};

export default OpenTask;
