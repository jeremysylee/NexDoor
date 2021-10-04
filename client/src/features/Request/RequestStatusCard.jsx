import React from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { UserInfo } from './components/UserInfo';
import { ButtonGoToRequest } from './components/TaskCard.styles';

const RequestCardSmallContainer = styled.div`
  max-width: 300px;
  height: 100%;
  margin-top: 2em;
  flex-direction: column;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: #FFFFFF;
  padding: 1em 2.5em;
  box-shadow: 2px 2px 3px #cccccc, -1px -1px 27px #f1f2f5;
`;

const RequestStatus = styled.div`
  font-weight: 400;
  justify-content: center;
  font-size: 16px;
  margin-top: 0.75em;
  margin-bottom: 1.3em;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1em 0;
  width: 110%;
`;

const RequestStatusCard = () => {
  const selectedTask = useSelector((store) => store.selectedTaskReducer.task);
  const user = useSelector((store) => store.currentUserReducer.userData);
  const relevantUser = user.user_id === selectedTask.requester.user_id
    ? selectedTask.helper : selectedTask.requester;

  return (
    <RequestCardSmallContainer>
      <RequestStatus>{selectedTask.requester.user_id !== user.user_id && 'You are helping'}</RequestStatus>
      <UserInfo user={relevantUser} />
      <ButtonContainer>
        <ButtonGoToRequest style={{ width: '100%' }}>Complete task</ButtonGoToRequest>
      </ButtonContainer>
    </RequestCardSmallContainer>
  );
};

export default RequestStatusCard;
