import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import OpenTask from './OpenTask';
import MyRequestUnclaimed from './MyRequestUnclaimed';
import MyRequestClaimed from './MyRequestClaimed';
import MyTaskPending from './MyTaskPending';
import Active from '../ActiveTask/MyActive/MyActiveRequest';

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
        <MyRequestUnclaimed />
      </SelectedTaskFrame>

    );
  }

  if (task.status === 'Pending' && task.requester.user_id === currentUserId) {
    return (
      <SelectedTaskFrame>
        <MyRequestClaimed />
      </SelectedTaskFrame>
    );
  }

  if (task.status === 'Pending' && task.helper.user_id === currentUserId) {
    return (
      <SelectedTaskFrame>
        <MyTaskPending />
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
      <OpenTask />
    </SelectedTaskFrame>
  );
};

export default SelectedTask;
