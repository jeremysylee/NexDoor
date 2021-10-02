import React from 'react';
import { Grid } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
// import styled from 'styled-components';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import RequestCardSmall from '../../features/Request/RequestCardSmall';
import Chat from '../../features/Chat/Chat';
import {
  Body,
} from '../../components/App.styles';

const Request = () => (
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
      >
        <Sidebar />
        <RequestCardSmall />
        <Chat />
      </Grid>
    </Grid>
  </Body>
);
export default Request;
