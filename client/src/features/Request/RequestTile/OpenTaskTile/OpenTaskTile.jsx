import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import useFormatDate from '../../hooks/useFormatDate';

import {
  Card,
  CardContent,
  Description,
  Details,
  DetailsCol,
  Row,
  Username,
} from '../../RequestFeed.styles';

const OpenTask = ({ task }) => {
  const dispatch = useDispatch();
  const selectedTaskId = useSelector((store) => store.selectedTaskReducer.task.task_id);
  const { day, time } = useFormatDate(task.start_date, task.start_time);

  const selectTaskHandler = () => {
    // clear task if clicking on open task
    if (selectedTaskId === task.task_id) {
      return dispatch({
        type: 'SET_TASK', task: { task_id: 0 },
      });
    }
    dispatch({
      type: 'SET_TASK', task,
    });
    return <></>;
  };

  return (
    <>
      <Card onClick={selectTaskHandler}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Row>
            <Avatar src={task.requester.profile_picture_url} alt="profilePhoto" />
            <CardContent>
              <Username>{`${task.requester.firstname} ${task.requester.lastname}`}</Username>
              <Description>{`${task.description}`}</Description>
            </CardContent>
          </Row>
          <DetailsCol>
            <Details>{day}</Details>
            <Details>{`${time}`}</Details>
          </DetailsCol>
        </Row>
      </Card>
    </>
  );
};

OpenTask.propTypes = {
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
};

export default OpenTask;
