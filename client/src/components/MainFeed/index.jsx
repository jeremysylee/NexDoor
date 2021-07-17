import React from 'react';

import RequestInput from './RequestInput';
import Tasks from './Tasks';
import MyRequests from './MyRequests';
import MyTasks from './MyTasks';
import NewRequestModal from '../NewRequestModal';

const MainFeed = () => (
  <div style={{ margin: '1em', maxWidth: '33%' }}>
    <NewRequestModal />
    <RequestInput />
    <MyRequests />
    <MyTasks />
    <Tasks />
  </div>
);

export default MainFeed;
