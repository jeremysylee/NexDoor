import React, { useState } from 'react';
import { Container, Grid, Avatar } from '@material-ui/core';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Ratings from 'react-ratings-declarative';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '@material-ui/icons/Star';
import styled from 'styled-components';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MarkFinishModal from './YouAreHelping/MarkFinishModal';
import YouAreHelping from './YouAreHelping/YouAreHelping';
import Chat from './Chat/Chat';

import RequestFeed from '../../features/Request/RequestFeed';
import SelectedRequest from '../../features/Request/SelectedRequestCard';
import Map from '../../features/Map/Map';

import {
  SelectedTaskContainer,
} from '../../features/Request/RequestFeed.styles';

import {
  Body,
} from '../../components/App.styles';

const Request = () => {
  const selectTask = useSelector((store) => store.selectedTaskReducer.task);
  const selectedTaskId = useSelector((store) => store.selectedTaskReducer.task.task_id);

  return (
    <Body>
      <Header />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid
          container
          justifyContent="center"
          style={{ width: '90%' }}
        >
          <Sidebar />
          <YouAreHelping />
          <SelectedTaskContainer />
        </Grid>
      </Grid>
    </Body>


    // <Container>
    //   <Header />
    //   <Grid
    //     container
    //     direction="row"
    //     justifyContent="flex-start"
    //     alignItems="flex-start"
    //     style={{ fontStyle: 'Roboto' }}
    //   >
    //     <Sidebar />
    //     <Grid
    //       container
    //       direction="column"
    //       justifyContent="center"
    //       // alignItems="flex-start"
    //       style={{ fontStyle: 'Roboto' }}
    //     >
    //       <Chat />
    //     </Grid>
    //     <Grid
    //       container
    //       direction="column"
    //       justifyContent="flex-end"
    //       // alignItems="flex-start"
    //       style={{ fontStyle: 'Roboto', height: '100%' }}
    //     >
    //       <YouAreHelping />
    //     </Grid>
    //   </Grid>
    // </Container>
  );
};

export default Request;
