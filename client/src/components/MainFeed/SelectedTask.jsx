import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { DateTime } from 'luxon';

const SelectedTaskContainer = styled.div`
  width: 500px;
  height: 500px;
  background-color: #FBFBFB;
  margin-top: 2em;
  margin-left: 1em;
  border-radius: 10px;
  box-shadow: inset 2px 2px 4px #DEDEDE, inset -2px -2px 4px white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: Roboto;
  padding: 1em;
`;

const AvatarLg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 100%;
`;

const Username = styled.div`
  font-weight: 400;
  font-size: 18px;
  margin-top: 1em;
`;

const UserInfo = styled.div`
  font-weight: 400;
  font-size: 14px;
  margin-top: 0.5em;
`;

const StatusText = styled(Username)`
  margin-bottom: 2em;
  font-weight: 200;
`;

const DetailsContainer = styled.div`
  width: 80%;
  height: auto;
  justify-content: flex-start;
  flex-direction: column;
  font-weight: 200;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 10px;
  padding: 1em 2em;
  box-shadow: inset 2px 2px 4px #DEDEDE, inset -2px -2px 4px white;
  background-color: #FBFBFB;
`;

const HeadingSmall = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: grey;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectedTask = () => {
  const task = useSelector((store) => store.selectTaskReducer.task);
  const [daysUntil, setDaysUntil] = useState();
  const {
    streetAddress,
    city,
    state,
    zipcode,
  } = task.address;

  const timeFormatted = DateTime.fromISO(task.time).toFormat('h:mm a');

  const getTimeUntil = (rawDate) => {
    const dateToday = DateTime.local();
    const { days } = DateTime.fromISO(rawDate).diff(dateToday, ['days']).values;
    const dateFormatted = DateTime.fromISO(rawDate).toFormat('LLL dd');
    if (days <= 1) { return setDaysUntil('Today'); }
    if (days === 2) { return setDaysUntil('Tomorrow'); }
    return setDaysUntil(dateFormatted);
  };

  useEffect(() => {
    getTimeUntil(task.date);
  });

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
            <span>{`${daysUntil}`}</span>
            <span>{`${timeFormatted}`}</span>
          </Col>
        </DetailsContainer>
      </Row>
      <button>Next</button>
    </SelectedTaskContainer>
  );
};

export default SelectedTask;
