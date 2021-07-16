import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import OpenRequest from './OpenRequest';
import UnclaimedRequest from './UnclaimedRequest';
import ClaimedRequest from './ClaimedRequest';
import PendingTask from './PendingTask';
import Active from '../ActiveTask/Active';

const SelectedTaskFrame = styled.div`
  width: 500px;
  height: 100%;
  background-color: #FBFBFB;
  margin-top: 2em;
  margin-left: 1em;
  border-radius: 10px;
  font-family: Roboto;
  padding: 2em 0;
  position: sticky;
  top: 1em;
`;

const SelectedTask = () => {
  const dispatch = useDispatch();
  const task = useSelector((store) => store.selectedTaskReducer.task);
  const currentUserId = useSelector((store) => store.currentUserReducer.userId);

  const getTimeUntil = (rawDate) => {
    const dateToday = DateTime.local();
    const { days } = DateTime.fromISO(rawDate).diff(dateToday, ['days']).values;
    const dateFormatted = DateTime.fromISO(rawDate).toFormat('LLL dd');
    if (days <= 1) { return 'Today'; }
    if (days === 2) { return 'Tomorrow'; }
    return dateFormatted;
  };

  useEffect(() => {
    dispatch({
      type: 'FORMAT_DATA',
      time: DateTime.fromISO(task.start_time).toFormat('h:mm a'),
      date: getTimeUntil(task.start_date),
    });
  });

  if (task.status === 'Open' && task.requester.user_id === currentUserId) {
    return (
      <SelectedTaskFrame>
        <UnclaimedRequest />
      </SelectedTaskFrame>

    );
  }

  if (task.status === 'Pending' && task.requester.user_id === currentUserId) {
    return (
      <SelectedTaskFrame>
        <ClaimedRequest />
      </SelectedTaskFrame>
    );
  }

  if (task.status === 'Pending' && task.helper.user_id === currentUserId) {
    return (
      <SelectedTaskFrame>
        <PendingTask />
      </SelectedTaskFrame>
    );
  }

  if (task.status === 'Active') {
    return (
      <Active />
    );
  }

  return (
    <SelectedTaskFrame>
      <OpenRequest />
    </SelectedTaskFrame>
  );
};

export default SelectedTask;
