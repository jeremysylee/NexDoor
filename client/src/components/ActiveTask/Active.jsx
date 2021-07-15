import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { Button, Modal, Form } from 'react-bootstrap';
import Ratings from 'react-ratings-declarative';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '@material-ui/icons/Star';
import styled from 'styled-components';
import Header from '../Header';
import Sidebar from '../Sidebar';
import ActiveModal from './ActiveModal';
import YouAreHelping from './YouAreHelping';

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

const Active = () => {
  const word = 'hi';

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
          <YouAreHelping />
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
            hello
          </RequestDescription>
          <ChatContainer>
            Chat
          </ChatContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Active;