import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import {
  SelectedTaskContainer,
  AvatarLg,
  Username,
  UserInfo,
  StatusText,
  DetailsContainer,
  HeadingSmall,
  Row,
  Button,
  ButtonDecline,
} from './styles-SelectedTask';

const url = 'http://localhost:3500';

const MyRequestClaimed = () => {
  const history = useHistory();
  const task = useSelector((store) => store.selectedTaskReducer.task);

  const clickAcceptHandler = () => {
    axios.put(`${url}/api/task/change/Active/${task.task_id}`)
      .then((res) => console.log(res))
      .then(() => { history.push('/active'); });
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
    </SelectedTaskContainer>
  );
};

export default MyRequestClaimed;
