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
  Col,
} from './styles-SelectedTask';

const OpenRequest = () => {
  const task = useSelector((store) => store.selectedTaskReducer.task);
  const date = useSelector((store) => store.taskDataFormattedReducer.date);
  const time = useSelector((store) => store.taskDataFormattedReducer.time);
  const {
    streetAddress,
    city,
    state,
    zipcode,
  } = task.address;

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
      <StatusText>is requesting your assistance</StatusText>
      <DetailsContainer>
        <HeadingSmall>REQUEST DETAILS</HeadingSmall>
        <p>{task.description}</p>
      </DetailsContainer>
      <Row>
        <DetailsContainer>
          <HeadingSmall>TASK LOCATION</HeadingSmall>
          <Col>
            <span>{`${streetAddress}`}</span>
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
      {/* <button>Next</button> */}
    </SelectedTaskContainer>
  );
};

export default OpenRequest;
