import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, } from 'react-redux';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import Tasks from './Tasks';
import Sidebar from '../Sidebar';
import SelectedTask from './SelectedTask';
import MyRequests from './MyRequests';

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

<<<<<<< HEAD
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
    <SelectedTask />
    {/* <MapPlaceholder /> */}
  </Grid>
);
=======
const MainFeed = () => {
  const tasks = useSelector((store) => store.tasksReducer.tasks);
  // const dispatch = useDispatch();
  const placeholder = 'placeholder';

  // const getTasks = () => {
  //   axios.get('/api/tasks')
  //     .then(({ data }) => {
  //       console.log(data);
  //       dispatch({
  //         type: 'SET_TASKS',
  //         tasks: data,
  //       })
  //         .catch((err) => console.error(err));
  //     });
  // };

  // useEffect(() => {
  //   getTasks();
  // }, []);

  return (
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
};
>>>>>>> cda59c84e648212048b390348f13e10d4d6d7789

export default MainFeed;
