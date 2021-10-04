import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import Header from '../../components/Header';
import RequestFeed from '../../features/Request/RequestFeed';
import Sidebar from '../../components/Sidebar';
import Map from '../../features/Map/Map';
import { Body } from '../../components/App.styles';

const MapContainer = styled.div`
  position: sticky;
  top: 20;
  min-width: 300px;
  max-width: 520px;
  height: 80vh;
  height: 95vh;
  border-radius: 20px;
  // box-shadow: 0 8px 16px 0 #BDC9D7;
  margin-top: 2em;
  position: sticky;
  flex-grow: 4;
  flex-shrink: 2;
`;

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
        <MapContainer>
          <Map />
        </MapContainer>
      </Grid>
    </Grid>
  </Body>
);

export default Home;
