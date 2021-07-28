import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { DateTime } from 'luxon';

// Imported Components
import { UserProfile, UserProfileBlank } from './UserProfile';
import DetailsSection from './DetailsSection';
import {
  InputOpenRequest,
  InputActiveTask,
  InputClaimedRequest,
  InputUnclaimedRequest,
} from './Inputs';
import {
  StatusText,
  RowSlim,
  BackButton,
} from './styles-SelectedTask';

const SelectedTaskCard = styled.div`
  width: 100%;
  height: 100%;
  padding: 3em 2.5em 1em;
  overflow: hidden;
  background-color: white;
  border-radius: 10px;
  font-family: Roboto;
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

  const getTimeUntil = (rawDate) => {
    const dateToday = DateTime.local();
    const { days } = DateTime.fromISO(rawDate).diff(dateToday, ['days']).values;
    const dateFormatted = DateTime.fromISO(rawDate).toFormat('ccc, LLL dd');
    if (days <= 1) { return 'Today'; }
    if (days === 2) { return 'Tomorrow'; }
    return dateFormatted;
  };

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

  // EVENT HANDLERS //
  const clickBackHandler = () => {
    dispatch({
      type: 'SET_TASK', task: { task_id: 0 },
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
    <SelectedTaskCard>
      <RowSlim>
        <BackButton onClick={clickBackHandler}>Back</BackButton>
      </RowSlim>
      {category.role === 'helper' && <UserProfile user={task.requester} />}
      {category.status === 'claimed' && <UserProfile user={task.helper} />}
      {task.helper && category.role === 'requester' && <UserProfile user={task.helper} />}
      {category.status === 'unclaimed' && <UserProfileBlank />}
      <StatusText>{category.statusText}</StatusText>
      <DetailsSection />
      {category.status === 'active' && <InputActiveTask />}
      {category.status === 'claimed' && <InputClaimedRequest taskId={task.task_id} />}
      {category.status === 'unclaimed' && <InputUnclaimedRequest />}
      {category.status === 'open' && <InputOpenRequest taskId={task.task_id} />}
    </SelectedTaskCard>
  );
};

export default SelectedTask;
