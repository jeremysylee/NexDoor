import React from 'react';
import { useSelector } from 'react-redux';

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

  return (
    <SelectedTaskContainer>
      <AvatarLg
        src={task.user.profile_picture}
        alt={task.user.firstname}
      />
      <Username>{`${task.user.firstname} ${task.user.lastname}`}</Username>
      <UserInfo>
        <span>{`★ ${task.user.average_rating}`}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>1.2 miles away</span>
      </UserInfo>
      <StatusText>has claimed your request!</StatusText>
      <Row>
        <ButtonDecline>Decline</ButtonDecline>
        <Button>Approve</Button>
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
