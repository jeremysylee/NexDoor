import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { motion } from 'framer-motion';
import { Dialog } from '@material-ui/core/';

// Imported Components
import { UserInfo, UserInfoBlank } from './components/UserInfo';
import DetailsSection from './components/RequestDetails';
import {
  InputOpenRequest,
  InputActiveTask,
  InputClaimedRequest,
  InputUnclaimedRequest,
} from './components/RequestInputs';
import {
  StatusText,
  RowSlim,
  BackButton,
} from './components/TaskCard.styles';

const SelectedTaskCard = styled.div`
  width: 100%;
  height: 100%;
  max-width: 500px;
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
  const modalToggle = useSelector((store) => store.modalRequestCardReducer.toggle);

  const closeHandler = () => {
    dispatch({ type: 'TOGGLE_REQUEST_MODAL', toggle: false });
  };

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
    if (task.status === 'Open' && task.requester.user_id !== currentUserId) {
      return dispatch({
        type: 'SET_CATEGORY',
        role: 'helper',
        status: 'open',
        statusText: 'is requesting your assistance',
      });
    }
    return <> </>;
  };
  // <-------------------SET CATEGORY END-------------------------> //

  // LIFECYCLE //
  useEffect(() => {
    dispatch({
      type: 'FORMAT_DATA',
      time: DateTime.fromISO(task.start_time).toFormat('h:mm a'),
      date: getTimeUntil(task.start_date),
    });
    setCategory();
  }, [task]);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  // RENDER //
  return (
    <Dialog open={modalToggle} onClose={closeHandler}>
      <motion.div
        initial="hidden"
        animate="visible"
        className="container"
        variants={container}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        <SelectedTaskCard>
          <RowSlim>
            <BackButton onClick={closeHandler}>Back</BackButton>
          </RowSlim>
          {category.role === 'helper' && <UserInfo user={task.requester} />}
          {!task.helper && category.status === 'claimed' && <UserInfo user={task.helper} />}
          {task.helper && category.role === 'requester' && <UserInfo user={task.helper} />}
          {category.status === 'unclaimed' && <UserInfoBlank user={task.requester} />}
          <motion.div variants={item}>
            <StatusText>{category.statusText}</StatusText>
          </motion.div>
          <motion.div variants={item}>
            <DetailsSection />
            {category.status === 'active' && <InputActiveTask />}
            {category.status === 'claimed' && <InputClaimedRequest taskId={task.task_id} />}
            {category.status === 'pending' && <div style={{ height: '1em' }} />}
            {category.status === 'unclaimed' && <InputUnclaimedRequest taskId={task.task_id} />}
            {category.status === 'open' && <InputOpenRequest taskId={task.task_id} task={task} />}
          </motion.div>
        </SelectedTaskCard>
      </motion.div>
    </Dialog>
  );
};

export default SelectedTask;
