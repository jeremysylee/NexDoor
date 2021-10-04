import React from 'react';
import { Grid } from '@material-ui/core';

import Header from '../../components/Header';
import RequestFeed from '../../features/Request/RequestFeed';
import Sidebar from '../../components/Sidebar';
import Map from '../../features/Map/Map';
import { Body } from '../../components/App.styles';

const Home = () => (
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
        <RequestFeed />
        <Map />
      </Grid>
    </Grid>
  </Body>
);

export default Home;
