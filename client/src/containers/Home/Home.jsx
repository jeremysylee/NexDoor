import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import RequestFeed from '../../features/Request/RequestFeed';
import Sidebar from '../../components/Sidebar';
import SelectedRequest from '../../features/Request/SelectedRequestCard';
// import Map from './Map';

import {
  SelectedTaskContainer,
} from '../../features/Request/RequestFeed.styles';

import {
  Body,
} from '../../components/App.styles';

const MapContainer = styled.div`
  position: sticky;
  top: 20;
  min-width: 300px;
  max-width: 520px;
  height: 500px;
  border-radius: 20px;
  box-shadow: 0 8px 16px 0 #BDC9D7;
  // margin: 2em 1em;
  margin-top: 2em;
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
          <RequestFeed />
          {selectedTaskId ? (
            <SelectedTaskContainer>
              <SelectedRequest />
            </SelectedTaskContainer>
          ) : <MapContainer />}
        </Grid>
      </Grid>
    </Body>
  );
};

export default Home;