import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import Header from '../Header';
import Sidebar from '../Sidebar';
// import axios from 'axios';
import User from './User';

const SideMenu = styled.div`
 float: left;
`;

const HelpfulFeed = () => {
  const tasks = useSelector((store) => store.tasksReducer.tasks);



  const placeholder = 'NexDoors Most Helpful';

  return (
    <div>
      <Header />
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{ fontStyle: 'Roboto' }}
      >
        <Sidebar />
        <div>
          <h1>{placeholder}</h1>
          {tasks.map((task, index) => (<User user={task.user} key={index} />))}
        </div>
      </Grid>
    </div>
  );
};

export default HelpfulFeed;