import React from 'react';
import { Grid } from '@material-ui/core';
// import styled from 'styled-components';

import NewRequestModal from './NewRequestModal';
import MainFeed from './MainFeed/index';
import Header from './Header';
import Sidebar from './Sidebar';
import SelectedTask from './SelectedTask';
import Map from './Map';

// const MapPlaceholder = styled.div`
//   width: 500px;
//   height: 500px;
//   margin: 1em;
//   border-radius: 20px;
//   box-shadow: 0 8px 16px 0 #BDC9D7;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const Home = () => (
  <div style={{ backgroundColor: '#f1f2f5' }}>
    <Header />
    <NewRequestModal />
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      style={{ fontStyle: 'Roboto' }}
    >
      <Sidebar />
      <MainFeed />
      {/* <SelectedTask /> */}
      <Map />
    </Grid>
  </div>
);

export default Home;
