/* eslint camelcase: 0 */ // --> OFF

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  ButtonGoToRequest,
  ButtonClaimedDecline,
  BackButton,
} from './styles-SelectedTask';

const MyRequestActive = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const task = useSelector((store) => store.selectedTaskReducer.task);
  const date = useSelector((store) => store.taskDataFormattedReducer.date);
  const time = useSelector((store) => store.taskDataFormattedReducer.time);
  const userId = useSelector((store) => store.currentUserReducer.userData.user_id);
  const {
    street_address,
    city,
    state,
    zipcode,
  } = task.location;

  const [user, setUser] = useState({});

  // here here
  const setTaskRoleRelativeToUser = () => {
    if (task.requester.user_id !== userId) {
      setUser(task.requester);
    } else {
      setUser(task.helper);
    }
  };

  useEffect(() => {
    setTaskRoleRelativeToUser();
  });

  const clickGoToRequestHandler = () => {
    history.push('/active');
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
          src={user.profile_picture_url}
          alt={user.firstname}
        />
        <AvatarRing />
        <AvatarMiddleRing />
      </Col>
      <Username>{`${user.firstname} ${user.lastname}`}</Username>
      <UserInfo>
        <span>{`★ ${user.avg_rating || 0} (${user.task_count})`}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>1.2 miles away</span>
      </UserInfo>
      <StatusText>is helping you with this request!</StatusText>
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
        <ButtonClaimedDecline onClick={clickBackHandler}>Back</ButtonClaimedDecline>
        <ButtonGoToRequest onClick={clickGoToRequestHandler}>Go to request</ButtonGoToRequest>
      </Row>
    </SelectedTaskContainer>
  );
};

export default MyRequestActive;
