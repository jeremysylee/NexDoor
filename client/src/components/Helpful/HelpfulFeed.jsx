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

// const MostHelpful = styled.div`
// margin-left: 3em;
// `;

const HelpfulFeed = () => {
  const tasks = useSelector((store) => store.tasksReducer.tasks);


  const placeholder = "NexDoor's Most Helpful";

  return (
    <div style={{ fontStyle: 'Roboto', backgroundColor: "rgb(241, 242, 245)" }}>
      <Header />
      <Grid
        container
        direction="row"
        spacing={5}
      >
        <Grid item xs={3} >
          <Sidebar />
        </Grid>
        <Grid
          item xs={5}
        >
          <h1>{placeholder}</h1>
          {tasks.map((task, index) => (<User user={task.requester} key={index} />))}
        </Grid>
      </Grid>
    </div>
  );
};

export default HelpfulFeed;