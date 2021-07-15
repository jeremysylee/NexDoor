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

const PendingRequest = () => {
  const task = useSelector((store) => store.selectedTaskReducer.task);
  const date = useSelector((store) => store.taskDataFormattedReducer.date);
  const time = useSelector((store) => store.taskDataFormattedReducer.time);
  const {
    street_address,
    city,
    state,
    zipcode,
  } = task.location;

  return (
    <SelectedTaskContainer>
      <AvatarLg
        src={task.user.profile_picture_url}
        alt={task.user.firstname}
      />
      <Username />
      <Username>{`${task.user.firstname} ${task.user.lastname}`}</Username>
      <UserInfo>
        <span>{`★ ${task.user.average_rating}`}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>1.2 miles away</span>
      </UserInfo>
      <StatusText>{`${task.user.firstname} has not accepted your help yet`}</StatusText>
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
      {/* <button>Next</button> */}
    </SelectedTaskContainer>
  );
};

export default PendingRequest;
