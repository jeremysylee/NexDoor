import React, { useState } from 'react';
import { Container, Grid, Avatar } from '@material-ui/core';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Ratings from 'react-ratings-declarative';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '@material-ui/icons/Star';
import styled from 'styled-components';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import MarkFinishModal from './MarkFinishModal';
import YouAreHelping from './YouAreHelping';
import Chat from '../Chat/Chat';

const Active = () => {
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
          // alignItems="flex-start"
          style={{ fontStyle: 'Roboto' }}
        >
            <Chat />
        </Grid>
        <Grid
          direction="column"
          justifyContent="flex-end"
          // alignItems="flex-start"
          style={{ fontStyle: 'Roboto', height: '100%' }}
        >
          <YouAreHelping />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Active;