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
} from './styles-SelectedTask';

export const InputOpenTask = ({ taskId }) => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.currentUserReducer.userData.user_id);
  const clickClaimHandler = () => {
    axios.put(`${url}/api/task/help/${taskId}/${userId}`)
      .then((res) => console.log(res));
    dispatch({ type: 'SHOW_MAP', toggle: true });
  };

  const clickBackHandler = () => {
    dispatch({ type: 'SHOW_MAP', toggle: true });
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

InputOpenTask.propTypes = {
  taskId: PropTypes.number.isRequired,
};

export const InputActiveTask = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const category = useSelector((store) => store.taskCategoryReducer);

  const clickBackHandler = () => {
    dispatch({ type: 'SHOW_MAP', toggle: true });
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

export const InputPendingRequest = ({ taskId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const clickAcceptHandler = () => {
    axios.put(`${url}/api/task/change/Active/${taskId}`)
      .then((res) => console.log(res))
      .then(() => { history.push('/myactiverequest'); });
  };

  const clickDeclineHandler = () => {
    axios.put(`${url}/api/task/rmhelp/${taskId}`)
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

InputPendingRequest.propTypes = {
  taskId: PropTypes.number.isRequired,
};
