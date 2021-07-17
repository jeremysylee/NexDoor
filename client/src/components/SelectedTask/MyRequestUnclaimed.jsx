/* eslint camelcase: 0 */ // --> OFF

import React from 'react';
import { useSelector } from 'react-redux';
import EditTaskModal from './EditTaskModal';
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

const UnclaimedRequest = () => {
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
        style={{ backgroundColor: 'grey' }}
        alt=""
      />
      <Username />
      <UserInfo />
      <StatusText>No one has claimed your request yet</StatusText>
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
      <EditTaskModal />
      {/* <button>Next</button> */}
    </SelectedTaskContainer>
  );
};

export default UnclaimedRequest;
