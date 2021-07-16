/* eslint camelcase: 0 */ // --> OFF

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectedTaskContainer,
  AvatarLg,
  Username,
  UserInfo,
  StatusText,
  DetailsContainer,
  HeadingSmall,
  Row,
  RowSlim,
  Col,
  BackButton,
} from './styles-SelectedTask';

const MyTaskPending = () => {
  const dispatch = useDispatch();
  const task = useSelector((store) => store.selectedTaskReducer.task);
  const date = useSelector((store) => store.taskDataFormattedReducer.date);
  const time = useSelector((store) => store.taskDataFormattedReducer.time);
  const {
    street_address,
    city,
    state,
    zipcode,
  } = task.location;

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
      <AvatarLg
        src={task.requester.profile_picture_url}
        alt={task.requester.firstname}
      />
      <Username />
      <Username>{`${task.requester.firstname} ${task.requester.lastname}`}</Username>
      <UserInfo>
        <span>{`★ ${task.requester.avg}`}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>1.2 miles away</span>
      </UserInfo>
      <StatusText>{`${task.requester.firstname} has not accepted your help yet`}</StatusText>
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

export default MyTaskPending;
