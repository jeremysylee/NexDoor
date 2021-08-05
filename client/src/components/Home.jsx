import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import MainFeed from './MainFeed/index';
import Header from './Header';
import Sidebar from './Sidebar';
// import Map from './Map';

import {
  Body,
} from './styles-App';

const MapContainer = styled.div`
  min-width: 300px;
  height: 500px;
  border-radius: 20px;
  box-shadow: 0 8px 16px 0 #BDC9D7;
  margin: 2em 1em;
  font-family: Roboto;
  position: sticky;
  flex-grow: 4;
  flex-shrink: 2;
  -webkit-transition: 200ms linear;
  -moz-transition: 200ms linear;
  -ms-transition: 200ms linear;
  -o-transition: 200ms linear;
  transition: 200ms linear;
`;

const Home = () => {
  const placeholder = 'placeholder';
  console.log(placeholder);
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
          style={{ width: '90%' }}
        >
          <Sidebar />
          <MainFeed />
          <MapContainer />
          {/* {!showSelected && <SelectedTask />} */}
          {/* {showSelected && <MapContainer><Map /></MapContainer>} */}
          {/* {showSelected && <MapContainer />} */}
        </Grid>
      </Grid>
    </Body>
  );
};

export default Home;
