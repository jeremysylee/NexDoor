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
} from '../styles-TaskCard';

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
    dispatch({
      type: 'SET_TASK', task: { task_id: 0 },
    });
  };

  const clickGoToRequestHandler = () => {
    if (category.role === 'requester') {
      history.push('/myactiverequest');
    } else {
      history.push('/active');
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

  const clickAcceptHandler = () => {
    axios.put(`${url}/api/tasks/${taskId}/status/Active/`)
      .then((res) => console.log(res))
      .then(() => { history.push('/myactiverequest'); });
  };
  const clickDeclineHandler = () => {
    axios.delete(`${url}/api/tasks/helper/${taskId}`)
      .then((res) => console.log(res));
    dispatch({ type: 'SHOW_MAP', toggle: true });
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

export const InputUnclaimedRequest = () => {
  const dispatch = useDispatch();
  function handleClickOpen() {
    // setOpen(true);
    dispatch({ type: 'TOGGLE_AR_MODAL', toggle: true, mode: 'edit' });
  }

  return (
    <ColCentered>
      <LineTop style={{ marginBottom: '5px' }} />
      <Row>
        <ButtonCancel onClick={handleClickOpen}>Cancel request</ButtonCancel>
        <ButtonDecline onClick={handleClickOpen}>Edit request</ButtonDecline>
      </Row>
    </ColCentered>
  );
};

export const InputOpenRequest = ({ taskId }) => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.currentUserReducer.userData.user_id);
  const clickClaimHandler = () => {
    axios.put(`${url}/api/tasks/${taskId}/helper/${userId}`)
      .then((res) => console.log(res));
    dispatch({ type: 'SHOW_MAP', toggle: true });
  };

  const clickBackHandler = () => {
    dispatch({
      type: 'SET_TASK', task: { task_id: 0 },
    });
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
};
