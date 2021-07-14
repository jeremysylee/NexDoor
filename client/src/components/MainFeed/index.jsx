import React from 'react';
// import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
// import styled from 'styled-components';

import Tasks from './Tasks';
import MyRequests from './MyRequests';
import MyTasks from './MyTasks';

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

const MainFeed = () => (
  <div style={{ margin: '1em', maxWidth: '33%' }}>
    <MyRequests />
    <MyTasks />
    <Tasks />
  </div>
);

export default MainFeed;
