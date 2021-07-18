/* eslint camelcase: 0 */ // --> OFF

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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
  Col,
  LineTop,
  RowSlim,
  ButtonClaimed,
  ButtonClaimedDecline,
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
    dispatch({
      type: 'SHOW_MAP', toggle: true,
    });
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
          src={task.helper.profile_picture_url}
          alt={task.helper.firstname}
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=170667a&w=0&h=zP3l7WJinOFaGb2i1F4g8IS2ylw0FlIaa6x3tP9sebU='; }}
        />
        <AvatarRing />
        <AvatarMiddleRing />
      </Col>
      <Username>{`${task.helper.firstname} ${task.helper.lastname}`}</Username>
      <UserInfo>
        <span>{`★ ${task.helper.avg_rating || 0} (${task.helper.task_count})`}</span>
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
      <LineTop style={{ marginBottom: '1px' }} />
      <Row style={{ justifyContent: 'space-between' }}>
        <ButtonClaimedDecline onClick={clickDeclineHandler}>Decline</ButtonClaimedDecline>
        <ButtonClaimed onClick={clickAcceptHandler}>Accept</ButtonClaimed>
      </Row>
    </SelectedTaskContainer>
  );
};

export default MyRequestClaimed;
