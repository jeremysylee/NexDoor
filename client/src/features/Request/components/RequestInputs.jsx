import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { url } from '../../../../config';
import {
  LineTop,
  Row,
  ColCentered,
  ButtonDecline,
  Button,
  ButtonClaimedDecline,
  ButtonGoToRequest,
  ButtonClaimed,
  ButtonCancel,
  ButtonRow,
} from './TaskCard.styles';

/* TOC
1: InputActiveTask
3: InputClaimedRequest
4. InputUnclaimedRequest
1: InputOpenRequest
*/

export const InputActiveTask = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const category = useSelector((store) => store.taskCategoryReducer);

  const clickBackHandler = () => {
    dispatch({ type: 'TOGGLE_REQUEST_MODAL', toggle: false });
  };

  const clickGoToRequestHandler = () => {
    if (category.role === 'requester') {
      history.push('/request');
    } else {
      history.push('/request');
    }
  };

  return (
    <ColCentered>
      <LineTop style={{ marginBottom: '1px' }} />
      <Row style={{ justifyContent: 'space-between' }}>
        <ButtonClaimedDecline onClick={clickBackHandler}>Back</ButtonClaimedDecline>
        <ButtonGoToRequest onClick={clickGoToRequestHandler}>Go to request</ButtonGoToRequest>
      </Row>
    </ColCentered>
  );
};

export const InputClaimedRequest = ({ taskId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const clickAcceptHandler = async () => {
    await axios.put(`${url}/api/tasks/${taskId}/status/Active/`);
    history.push('/request');
  };
  const clickDeclineHandler = async () => {
    await axios.put(`${url}/api/tasks/${taskId}/status/Open`);
    await axios.delete(`${url}/api/tasks/${taskId}/helper`);
    dispatch({ type: 'TOGGLE_REQUEST_MODAL', toggle: false });
  };
  return (
    <ColCentered>
      <LineTop style={{ marginBottom: '1px' }} />
      <Row style={{ justifyContent: 'space-between' }}>
        <ButtonClaimedDecline onClick={clickDeclineHandler}>Decline</ButtonClaimedDecline>
        <ButtonClaimed onClick={clickAcceptHandler}>Accept</ButtonClaimed>
      </Row>
    </ColCentered>
  );
};
InputClaimedRequest.propTypes = {
  taskId: PropTypes.number.isRequired,
};

export const InputUnclaimedRequest = ({ taskId }) => {
  const dispatch = useDispatch();
  function handleClickOpen() {
    dispatch({ type: 'TOGGLE_AR_MODAL', toggle: true, mode: 'edit' });
  }

  const clickDeclineHandler = async () => {
    await axios.delete(`${url}/api/tasks/${taskId}`);
    dispatch({ type: 'TOGGLE_REQUEST_MODAL', toggle: false });
  };

  return (
    <ColCentered>
      <LineTop style={{ marginBottom: '1px' }} />
      <ButtonRow>
        <ButtonCancel onClick={clickDeclineHandler}>Cancel request</ButtonCancel>
        <ButtonDecline onClick={handleClickOpen}>Edit request</ButtonDecline>
      </ButtonRow>
    </ColCentered>
  );
};

InputUnclaimedRequest.propTypes = {
  taskId: PropTypes.number.isRequired,
};

export const InputOpenRequest = ({ taskId, task }) => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.currentUserReducer.userData.user_id);
  const clickClaimHandler = async () => {
    await axios.put(`${url}/api/tasks/${taskId}/helper/${userId}`);
    const newTask = task;
    newTask.status = 'Claimed';
    dispatch({ type: 'SET_TASK', task: newTask });
    dispatch({
      type: 'SET_CATEGORY',
      role: 'helper',
      status: 'pending',
      statusText: `${task.requester.firstname} has not accepted your help yet`,
    });
  };

  const clickBackHandler = () => {
    dispatch({ type: 'TOGGLE_REQUEST_MODAL', toggle: false });
  };

  return (
    <ColCentered>
      <LineTop />
      <Row>
        <ButtonDecline onClick={clickBackHandler}>Decline</ButtonDecline>
        <Button onClick={clickClaimHandler}>Claim</Button>
      </Row>
    </ColCentered>
  );
};
InputOpenRequest.propTypes = {
  taskId: PropTypes.number.isRequired,
  task: PropTypes.shape({
    requester: PropTypes.shape({
      firstname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
