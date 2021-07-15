import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import OpenRequest from './OpenRequest';
import PendingRequest from './PendingRequest';
import ClaimedRequest from './ClaimedRequest';

const SelectedTaskFrame = styled.div`
  width: 500px;
  height: 600px;
  background-color: #FBFBFB;
  margin-top: 2em;
  margin-left: 1em;
  border-radius: 10px;
  font-family: Roboto;
`;

const SelectedTask = () => {
  const dispatch = useDispatch();
  const task = useSelector((store) => store.selectedTaskReducer.task);

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
      time: DateTime.fromISO(task.time).toFormat('h:mm a'),
      date: getTimeUntil(task.date),
    });
  });

  return (
    <SelectedTaskFrame>
      {/* <OpenRequest /> */}
      {/* <PendingRequest /> */}
      <ClaimedRequest />
    </SelectedTaskFrame>
  );
};

export default SelectedTask;
