import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

const Card = styled.div`
  max-width: 100%;
  padding: 1.5em;
  margin-top: 1.5em;
  border-radius: 20px;
  box-shadow: 0 8px 16px 0 #BDC9D7;
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
  direction: row;
`;

const CardContent = styled.div`
  font-family: Roboto;
  margin-left: 1em;
`;

const Description = styled.div`
  wrap: wrap;
  max-width: 40%
  font-size: 14px;
  font-weight: lighter;
  margin-top: 2px;
  color: grey;
`;

const Username = styled.div`
  font-weight: 400;
  font-size: 16px;
`;

const DetailsCol = styled.div`
  font-family: Roboto;
  margin-left: 1em;
  margin-right: 1.5em;
  text-align: right;
  color: grey;
  flex-wrap: no-wrap;
`;

const Details = styled.div`
  font-size: 14px;
  font-weight: lighter;
  margin-top: 2px;
  color: grey;
  width: 120%
`;

const Task = ({ task }) => {
  const [day, setDay] = useState(0);
  const [time, setTime] = useState();

  const timeDifference = () => {
    const endDate = DateTime.fromISO(task.date);
    const start = DateTime.local();
    const diff = endDate.diff(start, ['months', 'days']);

    if (diff.values.days <= 1) {
      setDay('Today');
      setTime(DateTime.fromISO(task.time).toFormat('h:mm a'));
    } else if (diff.values.days === 2) {
      setDay('Tomorow');
      console.log(`in ${endDate.toFormat('ccc, LLL dd')} days`);
    } else if (diff.values.days < 8) {
      setDay(endDate.toFormat('ccc, LLL dd'));
    } else {
      setDay(endDate.toFormat('LLL dd'));
    }
  };

  useEffect(() => {
    timeDifference();
  });

  return (
    <Card>
      <Row style={{ justifyContent: 'space-between' }}>
        <Row>
          <Avatar src={task.user.profile_picture} alt="profilePhoto" />
          <CardContent>
            <Username>{`${task.user.firstname} ${task.user.lastname}`}</Username>
            <Description>{`${task.description.substring(0, 80)}...`}</Description>
          </CardContent>
        </Row>
        <DetailsCol>
          <Details>{day}</Details>
          <Details>{`${time}`}</Details>
        </DetailsCol>
      </Row>
    </Card>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    user: PropTypes.shape({
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      profile_picture: PropTypes.string.isRequired,
    }),
    description: PropTypes.string.isRequired,
    duration: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    car_required: PropTypes.bool,
  }).isRequired,
};

export default Task;

// const timeDifference = () => {
//   const endDate = DateTime.fromISO(task.date);
//   const endTime = DateTime.fromISO(task.time);
//   const start = DateTime.local();
//   const diff = endDate.diff(start, ['months', 'days']);
//   const diffTime = endTime.diff(start, ['hours', 'minutes', 'seconds']);

//   if (diff.values.days <= 1) {
//     setTime(DateTime.fromISO(task.time).toFormat('h:mm a'));
//     // setMinutesRemaining(diffTime.values.minutes);
//     // setHoursRemaining(diffTime.values.hours);
//     // setDaysRemaining('today');
//   } else if (diff.values.days > 1) {
//     // setDaysRemaining(endDate.toFormat('ccc, LLL dd'));
//     console.log(`in ${endDate.toFormat('ccc, LLL dd')} days`);
//   }
// };
