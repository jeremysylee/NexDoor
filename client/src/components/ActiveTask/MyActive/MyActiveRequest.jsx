import React, { useState } from 'react';
import { Container, Grid, Avatar } from '@material-ui/core';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Ratings from 'react-ratings-declarative';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '@material-ui/icons/Star';
import styled from 'styled-components';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import ActiveModal from './ActiveModal';
import YourHelper from './YourHelper';

const RequestDescription = styled.div`
  width: 660px;
  height: 320px;
  background-color: #FFF2F2;
  margin-top: 2em;
  margin-left: 3em;
  border-radius: 10px;
  box-shadow: inset 2px 2px 4px #DEDEDE, inset -2px -2px 4px white;
  display: flex;
  justify-content: right;
  align-items: center;
  flex-direction: column;
  font-family: Roboto;
  padding: 1em;
`;

const ChatContainer = styled.div`
  width: 660px;
  height: 320px;
  background-color: #FBFBFB;
  margin-top: 2em;
  margin-left: 3em;
  border-radius: 10px;
  box-shadow: inset 2px 2px 4px #DEDEDE, inset -2px -2px 4px white;
  display: flex;
  justify-content: right;
  align-items: center;
  flex-direction: column;
  font-family: Roboto;
  padding: 1em;
`;

const CancelButton = styled.div`
margin-top: 1em;
display: flex;
justify-content: center;
`;

const RequesterPfp = styled.div`
margin-top: 2em;
margin-left: 2em;
`;

const RequesterName = styled.div`
margin-top: 2em;
margin-left: 1em;
font-family: Roboto;
font-weight: 400;
font-size: 16px;
`;

const RequesterDescription = styled.div`
margin-top: 2em;
margin-left: 2em;
`;


const MyActiveRequest = () => {
  const selectTask = useSelector((store) => store.selectedTaskReducer.task);
  console.log('SELECTED TASK', selectTask);

  return (
    <Container>
      <Header />
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{ fontStyle: 'Roboto' }}
      >
        <Sidebar />
        <Grid
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          style={{ fontStyle: 'Roboto' }}
        >
          <YourHelper />
          <ActiveModal />
          <CancelButton>
            <Button style={{ backgroundColor: '#EEEEEE', borderRadius: '24px', height: '50px', width: '200px', borderColor: '#EEEEEE', color: '#6C6C6C' }} >Cancel Request</Button>
          </CancelButton>
        </Grid>
        <Grid
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          style={{ fontStyle: 'Roboto' }}
        >
          <RequestDescription>
            <Grid container direction="column">
              <Grid container spacing={1} direction="row">
                <RequesterPfp>
                  <Grid direction="column">
                    <Avatar src={selectTask.requester.profile_picture_url} />
                  </Grid>
                </RequesterPfp>
                &nbsp;
                <RequesterName>
                  <Grid direction="column">
                    {selectTask.requester.firstname}
                    &nbsp;
                    {selectTask.requester.lastname}
                  </Grid>
                </RequesterName>
              </Grid>
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
            </Grid>
          </RequestDescription>
          <ChatContainer>
            Chat
          </ChatContainer>
        </Grid>
      </Grid>
    </Container>
  )

};

export default MyActiveRequest;
