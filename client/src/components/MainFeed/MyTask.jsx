import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import styled, { ThemeProvider } from 'styled-components';
import useFormatDate from './hooks/useFormatDate';

import {
  Card,
  Row,
  CardContent,
  Username,
  Description,
  DetailsCol,
  Details,
  StatusBadgeTasks,
} from './styles-MainFeed';

const RowFixed = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const StatusBadgeTasks2 = styled.div`
  border-radius: 100px;
  height: 20px;
  width: 100px;
  z-index: 1;
  background-color: ${(props) => props.theme.statusColor};
  text-align: center;
  padding: 1px;
  color: white;
  font-size: 0.75rem;
  font-weight: 400;
  position: absolute;
  transform: scale(1) translate(0%, -108%);
  transform-origin: 0% 0%;
  margin-right: -16px;
`;

StatusBadgeTasks.defaultProps = {
  theme: {
    statusColor: '#f50257',
  },
};

const MyTask = ({ task }) => {
  const dispatch = useDispatch();
  const { day, time } = useFormatDate(task.start_date, task.start_time);

  // ************************************************************* //

  // STATUS TRANSLATION //

  /* Status's here are being translated for the current users perspective.
  A request status that is 'open' will appear as "Unclaimed".
  Once a helper claims the requesters task, the task status converts to 'Pending' which
  will appear as "Claimed" to the requester.
  */

  const [status, setStatus] = useState(0);
  const translateStatus = () => {
    if (task.status === 'Open') { return 'Unclaimed'; }
    return task.status;
  };

  // ************************************************************* //

  // COLOR THEMING FOR STATUS BADGE //

  const [color, setColor] = useState('#f50257');
  const theme = {
    statusColor: color,
  };

  const getColor = () => {
    if (status === 'Unclaimed') { setColor('#ed8e99'); }
    if (status === 'Pending') { setColor('#e87f4c'); }
    if (status === 'Active') { setColor('#1698b7'); }
    if (status === 'Closed') { setColor('#F3960A'); }
    if (status === 'Completed') { setColor('#666666'); }
  };

  // ************************************************************* //

  useEffect(() => {
    setStatus(translateStatus());
    getColor();
  });

  const selectTaskHandler = () => {
    // let showMapToggle = false;
    // if (task.status === 'Active') {
    //   history.push('/active');
    //   showMapToggle = true;
    // }
    dispatch({
      type: 'SET_TASK', task,
    });
    dispatch({
      type: 'SHOW_MAP', toggle: false,
    });
  };

  return (
    <Card onClick={selectTaskHandler}>
      <RowFixed>
        <ThemeProvider theme={theme}>
          <StatusBadgeTasks2>{status}</StatusBadgeTasks2>
        </ThemeProvider>
      </RowFixed>
      <Row style={{ justifyContent: 'space-between' }}>
        <Row>
          <Avatar src={task.requester.profile_picture_url} alt="profilePHoto" />
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
