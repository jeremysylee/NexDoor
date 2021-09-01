import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import useFormatDate from '../../hooks/useFormatDate';
import SelectedRequest from '../../SelectedRequestCard';

import {
  Card,
  CardContent,
  Description,
  Details,
  DetailsCol,
  Row,
  RowRight,
  StatusBadge,
  Username,
  VerticalLineFaded,
  SelectedTaskContainer,
} from '../../RequestFeed.styles';

StatusBadge.defaultProps = {
  theme: {
    statusColor: '#f50257',
  },
};

const MyTask = ({ task }) => {
  const dispatch = useDispatch();
  const { day, time } = useFormatDate(task.start_date, task.start_time);
  const selectedTaskId = useSelector((store) => store.selectedTaskReducer.task.task_id);

  // STATUS TRANSLATION //
  /* Status's here are being translated for the current users perspective as a helper.
  A request status that is 'Open' will appear as "Unclaimed" */
  const [status, setStatus] = useState(0);
  const translateStatus = () => {
    if (task.status === 'Open') { return 'Unclaimed'; }
    return task.status;
  };

  // COLOR THEMING FOR STATUS BADGE //
  const [color, setColor] = useState('#f50257');
  const theme = { statusColor: color };
  const getColor = () => {
    if (status === 'Unclaimed') { setColor('#ed8e99'); }
    if (status === 'Pending') { setColor('#e87f4c'); }
    if (status === 'Active') { setColor('#1698b7'); }
    if (status === 'Closed') { setColor('#F3960A'); }
    if (status === 'Completed') { setColor('#666666'); }
  };

  useEffect(() => {
    setStatus(translateStatus());
    getColor();
  });

  const selectTaskHandler = () => {
    if (selectedTaskId === task.task_id) {
      return dispatch({
        type: 'SET_TASK', task: { task_id: 0 },
      });
    }
    dispatch({ type: 'SET_TASK', task });
    return <></>;
  };

  return (
    <>
      <Card onClick={selectTaskHandler}>
        <RowRight>
          <ThemeProvider theme={theme}>
            <StatusBadge>{status}</StatusBadge>
          </ThemeProvider>
        </RowRight>
        <Row style={{ justifyContent: 'space-between' }}>
          <Row>
            <Avatar src={task.requester.profile_picture_url} alt={task.requester.firstname} />
            <CardContent>
              <Username>{`${task.requester.firstname} ${task.requester.lastname}`}</Username>
              <Description>{`${task.description.substring(0, 60)}...`}</Description>
            </CardContent>
          </Row>
          <DetailsCol>
            <Details>{day}</Details>
            <Details>{time}</Details>
          </DetailsCol>
        </Row>
      </Card>
      {selectedTaskId === task.task_id && (
        <SelectedTaskContainer>
          <VerticalLineFaded onClick={selectTaskHandler} />
          <SelectedRequest />
        </SelectedTaskContainer>
      )}
    </>
  );
};

MyTask.propTypes = {
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
    status: PropTypes.oneOf(['Open', 'Pending', 'Active', 'Complete', 'Closed']),
  }).isRequired,
};

export default MyTask;
