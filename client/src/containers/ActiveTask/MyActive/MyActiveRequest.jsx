import React, { useState } from 'react';
import { Container, Grid, Avatar } from '@material-ui/core';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Ratings from 'react-ratings-declarative';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '@material-ui/icons/Star';
import styled from 'styled-components';
import Header from '../../../common/Header';
import Sidebar from '../../../common/Sidebar';
// import ActiveModal from './ActiveModal';
import YourHelper from './YourHelper';
import Chat from '../Chat/Chat';

const MyActiveRequest = () => {
  // const history = useHistory();
  const selectTask = useSelector((store) => store.selectedTaskReducer.task);
  // const url = 'http://localhost:3500';
  console.log('SELECTED TASK', selectTask);

  // const handleCancelMyTask = () => {
  //   axios.delete(`${url}/api/task/${selectTask.task_id}`)
  //     .then(() => { history.push('/'); })
  //     .catch((err) => { console.error(err); });
  // };

  return (
    <Container style={{ maxHeight: '100%' }}>
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
          style={{ fontStyle: 'Roboto', height: '100%' }}
        >
          <Chat />
        </Grid>
        <Grid
          direction="column"
          justifyContent="flex-end"
          // alignItems="flex-start"
          style={{ fontStyle: 'Roboto', height: '100%' }}
        >
          <YourHelper />
        </Grid>
      </Grid>
    </Container>
  )

};

export default MyActiveRequest;
