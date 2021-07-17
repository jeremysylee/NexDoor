import React, { useState } from 'react';
import { Container, Grid, Avatar } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '@material-ui/icons/Star';
import styled from 'styled-components';

const YouAreHelpingContainer = styled.div`
width: 250px;
height: 320px;
background-color: #FBFBFB;
margin-top: 2em;
border-radius: 10px;
box-shadow: inset 2px 2px 4px #DEDEDE, inset -2px -2px 4px white;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
font-family: Roboto;
`;

const RequestUser = styled.div`
font-weight: 400;
font-size: 18px;
`;

const RequestUserInfo = styled.div`
font-weight: 400;
font-size: 14px;
margin-top: 0.5em;
`;

const RequestUserStatus = styled.div`
margin-top: 1em;
font-weight: 200;
`;

const YouAreHelping = () => {
  const selectTask = useSelector((store) => store.selectedTaskReducer.task);

  return (
    <YouAreHelpingContainer>
      <p>You are helping</p>
      <Avatar src={selectTask.requester.profile_picture_url} />
      <RequestUser>
        {selectTask.requester.firstname}
        &nbsp;
        {selectTask.requester.lastname}
      </RequestUser>
      <RequestUserInfo>
        <span>
          <StarIcon style={{ fill: "red" }} />
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>1.2 miles away</span>
      </RequestUserInfo>
      <RequestUserStatus>
        is waiting for you
      </RequestUserStatus>
    </YouAreHelpingContainer>
  );
};

export default YouAreHelping;
