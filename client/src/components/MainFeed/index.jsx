import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import Tasks from './Tasks';
import Sidebar from '../Sidebar';

const MapPlaceholder = styled.div`
  width: 500px;
  height: 500px;
  margin: 1em;
  border-radius: 20px;
  box-shadow: 0 8px 16px 0 #BDC9D7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainFeed = () => (
  <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="flex-start"
    style={{ fontStyle: 'Roboto' }}
  >
    <Sidebar />
    <Tasks />
    <MapPlaceholder />
  </Grid>
);

export default MainFeed;
