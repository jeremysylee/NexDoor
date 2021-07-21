import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { DateTime } from 'luxon';

import { UserProfile, UserProfileBlank } from './UserProfile';
import DetailsSection from './DetailsSection';
import { InputOpenTask, InputActiveTask, InputPendingRequest } from './Inputs';
import EditTaskModal from './EditTaskModal';
import {
  SelectedTaskContainer,
  StatusText,
  RowSlim,
  BackButton,
} from './styles-SelectedTask';

const SelectedTaskFrame = styled.div`
  // width: 500px;
  min-width: 440px;
  max-width: 500px;
  flex-grow: 1;
  height: 100%;
  background-color: white;
  margin-top: 2em;
  margin-left: 1em;
  border-radius: 10px;
  font-family: Roboto;
  padding-top: 3em;
  padding-bottom: 2em;
  position: sticky;
  top: 1em;
  -webkit-transition: 200ms linear;
  -moz-transition: 200ms linear;
  -ms-transition: 200ms linear;
  -o-transition: 200ms linear;
  transition: 200ms linear;
`;

const SelectedTask = () => {
  const dispatch = useDispatch();
  const task = useSelector((store) => store.selectedTaskReducer.task);
  const currentUserId = useSelector((store) => store.currentUserReducer.userData.user_id);
  const category = useSelector((store) => store.taskCategoryReducer);

  // <-------------------SET CATEGORY-------------------------> //
  const setCategory = () => {
    if (task.status === 'Open' && task.requester.user_id === currentUserId) {
      return dispatch({
        type: 'SET_CATEGORY',
        role: 'requester',
        status: 'unclaimed',
        statusText: 'No one has claimed your request yet',
      });
    }
    if (task.status === 'Pending' && task.requester.user_id === currentUserId) {
      return dispatch({
        type: 'SET_CATEGORY',
        role: 'requester',
        status: 'claimed',
        statusText: `${task.helper.firstname} has claimed your request!`,
      });
    }
    if (task.status === 'Active' && task.requester.user_id === currentUserId) {
      return dispatch({
        type: 'SET_CATEGORY',
        role: 'requester',
        status: 'active',
        statusText: 'is helping you with this request!',
      });
    }
    if (task.status === 'Pending' && task.helper.user_id === currentUserId) {
      return dispatch({
        type: 'SET_CATEGORY',
        role: 'helper',
        status: 'pending',
        statusText: `${task.requester.firstname} has not accepted your help yet`,
      });
    }
    if (task.status === 'Active' && task.helper.user_id === currentUserId) {
      return dispatch({
        type: 'SET_CATEGORY',
        role: 'helper',
        status: 'active',
        statusText: `You are helping ${task.requester.firstname} with this request`,
      });
    }
    return dispatch({
      type: 'SET_CATEGORY',
      role: 'helper',
      status: 'open',
      statusText: 'is requesting your assistance',
    });
  };
  // <-------------------SET CATEGORY END-------------------------> //

  const getTimeUntil = (rawDate) => {
    const dateToday = DateTime.local();
    const { days } = DateTime.fromISO(rawDate).diff(dateToday, ['days']).values;
    const dateFormatted = DateTime.fromISO(rawDate).toFormat('ccc, LLL dd');
    if (days <= 1) { return 'Today'; }
    if (days === 2) { return 'Tomorrow'; }
    return dateFormatted;
  };

  // EVENT HANDLERS //
  const clickBackHandler = () => {
    dispatch({
      type: 'SHOW_MAP', toggle: true,
    });
  };

  // LIFECYCLE //
  useEffect(() => {
    dispatch({
      type: 'FORMAT_DATA',
      time: DateTime.fromISO(task.start_time).toFormat('h:mm a'),
      date: getTimeUntil(task.start_date),
    });
    setCategory();
  }, [task]);

  // RENDER //
  return (
    <SelectedTaskFrame>
      <SelectedTaskContainer>
        <RowSlim>
          <BackButton onClick={clickBackHandler}>Back</BackButton>
        </RowSlim>
        {category.role === 'helper' && <UserProfile user={task.requester} />}
        {task.helper && category.role === 'requester' && <UserProfile user={task.helper} />}
        {category.status === 'unclaimed' && <UserProfileBlank />}
        <StatusText>{category.statusText}</StatusText>
        <DetailsSection />
        {category.role === 'requester' && category.status === 'claimed' && <InputPendingRequest taskId={task.task_id} />}
        {category.status === 'active' && <InputActiveTask />}
        {category.status === 'open' && <InputOpenTask taskId={task.task_id} />}
        {category.status === 'unclaimed' && <EditTaskModal />}
      </SelectedTaskContainer>
    </SelectedTaskFrame>
  );
};

export default SelectedTask;
