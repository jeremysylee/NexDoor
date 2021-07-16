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
  // Col,
  Button,
  ButtonDecline,
} from './styles-SelectedTask';

const url = 'http://localhost:3500';

const OpenRequest = () => {
  const task = useSelector((store) => store.selectedTaskReducer.task);
  // const date = useSelector((store) => store.taskDataFormattedReducer.date);
  // const time = useSelector((store) => store.taskDataFormattedReducer.time);
  // const {
  //   streetAddress,
  //   city,
  //   state,
  //   zipcode,
  // } = task.address;

  // function to get user from task.helper_id
  // Temp data below

  const clickAcceptHandler = () => {
    axios.put(`${url}/api/task/change/Active/${task.task_id}`)
      .then((res) => console.log(res));
  };

  const clickDeclineHandler = () => {
    axios.put(`${url}/api/task/rmhelp/${task.task_id}`)
      .then((res) => console.log(res));
  };

  return (
    <SelectedTaskContainer>
      <AvatarLg
        src={task.helper.profile_picture_url}
        alt={task.helper.firstname}
      />
      <Username>{`${task.helper.firstname} ${task.helper.lastname}`}</Username>
      <UserInfo>
        <span>{`★ ${task.helper.average_rating}`}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>1.2 miles away</span>
      </UserInfo>
      <StatusText>has claimed your request!</StatusText>
      <Row>
        <ButtonDecline onClick={clickDeclineHandler}>Decline</ButtonDecline>
        <Button onClick={clickAcceptHandler}>Accept</Button>
      </Row>
      <DetailsContainer>
        <HeadingSmall>REQUEST DETAILS</HeadingSmall>
        <p>{task.description}</p>
      </DetailsContainer>
      {/* <button>Next</button> */}
    </SelectedTaskContainer>
  );
};

export default OpenRequest;
