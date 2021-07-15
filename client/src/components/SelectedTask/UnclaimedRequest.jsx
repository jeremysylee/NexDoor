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

const UnclaimedRequest = () => {
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

export default UnclaimedRequest;
