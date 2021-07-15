import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

import {
  Card,
  Row,
  CardContent,
  Username,
  Description,
  DetailsCol,
  Details,
} from './styles-MainFeed';

const Task = ({ task, formatDate }) => {
  const dispatch = useDispatch();
  const [day, setDay] = useState(0);
  const [time, setTime] = useState();

  const selectTaskHandler = () => {
    dispatch({
      type: 'SET_TASK', task,
    });
  };

  useEffect(() => {
    setDay(formatDate(task.date, task.time).date);
    setTime(formatDate(task.date, task.time).time);
  });

  return (
    <Card onClick={selectTaskHandler}>
      <Row style={{ justifyContent: 'space-between' }}>
        <Row>
          <Avatar src={task.user.profile_picture} alt="profilePhoto" />
          <CardContent>
            <Username>{`${task.user.firstname} ${task.user.lastname}`}</Username>
            <Description>{`${task.description.substring(0, 60)}...`}</Description>
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
    task_id: PropTypes.number,
    description: PropTypes.string.isRequired,
    duration: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    car_required: PropTypes.bool,
  }).isRequired,
  formatDate: PropTypes.func.isRequired,
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
