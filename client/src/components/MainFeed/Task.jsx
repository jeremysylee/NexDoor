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
    setDay(formatDate(task.start_date, task.start_time).start_date);
    setTime(formatDate(task.start_date, task.start_time).time);
  });

  return (
    <Card onClick={selectTaskHandler}>
      <Row style={{ justifyContent: 'space-between' }}>
        <Row>
          <Avatar src={task.requester.profile_picture_url} alt="profilePhoto" />
          <CardContent>
            <Username>{`${task.requester.firstname} ${task.requester.lastname}`}</Username>
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
    requester: PropTypes.shape({
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      profile_picture_url: PropTypes.string.isRequired,
    }),
    task_id: PropTypes.number,
    description: PropTypes.string.isRequired,
    duration: PropTypes.number,
    start_date: PropTypes.string,
    start_time: PropTypes.string,
    car_required: PropTypes.bool,
  }).isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default Task;
