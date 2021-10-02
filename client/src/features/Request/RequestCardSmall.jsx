import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { UserInfo } from './components/UserInfo';

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

const HelperStatus = styled(RequestStatus)`
  margin-top: -0.5em;
  margin-bottom: -0.5em;
`;

const LineHorizontal = styled.hr`
  width: 100%;
`;

const RequestCardSmall = () => {
  const selectedTask = useSelector((store) => store.selectedTaskReducer.task);
  const user = useSelector((store) => store.currentUserReducer.userData);
  const relevantUser = user.user_id === selectedTask.requester.user_id
    ? selectedTask.helper : selectedTask.requester;

  return (
    <RequestCardSmallContainer>
      <RequestStatus>{selectedTask.requester.user_id !== user.user_id && 'You are helping'}</RequestStatus>
      <UserInfo user={relevantUser} />
      <LineHorizontal />
      {selectedTask.requester.user_id === user.user_id
      && (
        <>
          <HelperStatus>is helping you</HelperStatus>
          <LineHorizontal />
        </>
      )}
      <Grid container direction="row">
        <p style={{ fontWeight: '400', fontSize: '14px' }}>
          REQUEST DESCRIPTION:
        </p>
        <br />
        <p style={{
          fontSize: '13px',
          fontWeight: '300',
          lineHeight: '21.53px',
          width: '53vw',
          marginTop: '-9px',
        }}
        >
          {selectedTask.description}
        </p>
      </Grid>
      <Grid container direction="row" style={{ marginTop: '1px', fontStyle: 'Roboto' }}>
        <p style={{ fontWeight: '400', fontSize: '14px' }}>
          REQUEST TIMELINE:
        </p>
        <br />
        <p style={{
          fontSize: '13px',
          fontWeight: '300',
          lineHeight: '0.53px',
          width: '63vw',
        }}
        >
          {new Date(selectedTask.start_date).toString().slice(4, 16)}
        </p>
      </Grid>
    </RequestCardSmallContainer>
  );
};

export default RequestCardSmall;
