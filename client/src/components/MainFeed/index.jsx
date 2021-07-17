import React from 'react';

import RequestInput from './RequestInput';
import Tasks from './Tasks';
import MyRequests from './MyRequests';
import MyTasks from './MyTasks';

const MainFeed = () => (
  <div style={{ margin: '1em', maxWidth: '33%' }}>
    <RequestInput />
    <MyRequests />
    <MyTasks />
    <Tasks />
  </div>
);

export default MainFeed;
