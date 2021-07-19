import React, { useState } from 'react';
import { Container, Grid, Avatar } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '@material-ui/icons/Star';
import styled from 'styled-components';
import ActiveModal from './ActiveModal';


const YouAreHelpingContainer = styled.div`
width: 250px;
height: 100%;
padding: 10px;
background-color: #F2F1F7;
margin-top: 2em;
border-radius: 10px;
flex-direction: row;
font-family: Roboto;
`;

const RequestUser = styled.div`
font-weight: 400;
font-size: 18px;
margin-top: 5px;
display: flex;
justify-content: center;
`;

const RequestUserInfo = styled.div`
font-weight: 400;
font-size: 14px;
margin-top: 5px;
display: flex;
justify-content: center;
`;

const RequestUserStatus = styled.div`
font-weight: 200;
margin-top: 5px;
display: flex;
justify-content: center;
`;

const CancelButton = styled.div`
margin-top: 1em;
display: flex;
justify-content: center;
`;

const YourHelper = () => {
  const history = useHistory();
  const selectTask = useSelector((store) => store.selectedTaskReducer.task);
  const url = 'http://localhost:3500';

  const handleCancelMyTask = () => {
    axios.delete(`${url}/api/task/${selectTask.task_id}`)
      .then(() => { history.push('/'); })
      .catch((err) => { console.error(err); });
  };

  // margin-left: 83px;
  return (
    <YouAreHelpingContainer>
      <p style={{ display: 'flex', justifyContent: 'center' }}>Your helper</p>
      <Avatar
        style={{ height: '60px', width: '60px', marginLeft: '83px' }}
        justifyContent="center"
        src={selectTask.helper.profile_picture_url} />
      <RequestUser>
        {selectTask.helper.firstname}
        &nbsp;
        {selectTask.helper.lastname}
      </RequestUser>
      <RequestUserInfo>
        <span>
          {selectTask.helper.task_count > 0 ? (
            <span>
              <StarIcon style={{ fill: "red" }} />
              {selectTask.helper.avg_rating}
              &nbsp;
              ({selectTask.helper.task_count})
            </span>
          ) : (
            <StarIcon style={{ fill: "red" }} />
          )}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>1.2 miles away</span>
      </RequestUserInfo>
      <RequestUserStatus>
        is completing your task
      </RequestUserStatus>
      <hr />
      <Grid container direction="row" style={{ marginTop: '2em', marginLeft: '2em', fontStyle: 'Roboto' }}>
        <p style={{ fontWeight: '400', fontSize: '14px' }}>
          REQUEST DESCRIPTION:
        </p>
        <br />
        <p style={{ fontSize: '13px', fontWeight: '300', lineHeight: '21.53px', width: '53vw', paddingRight: '5em', marginTop: '-9px' }}>
          {selectTask.description}
        </p>
      </Grid>
      <Grid container direction="row" style={{ marginTop: '1px', marginLeft: '2em', fontStyle: 'Roboto' }}>
        <p style={{ fontWeight: '400', fontSize: '14px' }}>
          REQUEST TIMELINE:
        </p>
        <br />
        <p style={{ fontSize: '13px', fontWeight: '300', lineHeight: '0.53px', width: '63vw' }}>
          {new Date(selectTask.start_date).toString().slice(4, 16)}
        </p>
      </Grid>
      <hr />
      <ActiveModal />
      <CancelButton>
        <Button
          onClick={handleCancelMyTask}
          style={{ backgroundColor: '#EEEEEE', borderRadius: '24px', height: '50px', width: '200px', borderColor: '#EEEEEE', color: '#6C6C6C' }} >Cancel Request</Button>
      </CancelButton>
    </YouAreHelpingContainer>
  );
};

export default YourHelper;
