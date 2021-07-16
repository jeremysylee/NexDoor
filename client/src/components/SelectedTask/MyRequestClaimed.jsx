/* eslint camelcase: 0 */ // --> OFF

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import {
  SelectedTaskContainer,
  AvatarLg,
  Username,
  UserInfo,
  StatusText,
  DetailsContainer,
  DetailsContainerTime,
  HeadingSmall,
  Row,
  Col,
  Line,
  RowSlim,
  Button,
  ButtonDecline,
  BackButton,
} from './styles-SelectedTask';

const url = 'http://localhost:3500';

const MyRequestClaimed = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const task = useSelector((store) => store.selectedTaskReducer.task);
  const date = useSelector((store) => store.taskDataFormattedReducer.date);
  const time = useSelector((store) => store.taskDataFormattedReducer.time);
  const {
    street_address,
    city,
    state,
    zipcode,
  } = task.location;

  const clickAcceptHandler = () => {
    axios.put(`${url}/api/task/change/Active/${task.task_id}`)
      .then((res) => console.log(res))
      .then(() => { history.push('/active'); });
  };

  const clickDeclineHandler = () => {
    axios.put(`${url}/api/task/rmhelp/${task.task_id}`)
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
      <div>
        <AvatarLg
          src={task.helper.profile_picture_url}
          alt={task.helper.firstname}
        />
        {/* <AvatarRing /> */}
      </div>
      <Username>{`${task.helper.firstname} ${task.helper.lastname}`}</Username>
      <UserInfo>
        <span>{`★ ${task.helper.average_rating}`}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>1.2 miles away</span>
      </UserInfo>
      <StatusText>has claimed your request!</StatusText>
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
      <Line />
      <Row>
        <ButtonDecline onClick={clickDeclineHandler}>Decline</ButtonDecline>
        <Button onClick={clickAcceptHandler}>Accept</Button>
      </Row>
    </SelectedTaskContainer>
  );
};

export default MyRequestClaimed;
