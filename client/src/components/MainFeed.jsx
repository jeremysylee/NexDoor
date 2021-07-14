import React from 'react';
import NewRequestModal from './NewRequestModal';
import Feed from './MainFeed/index';
import Header from './Header';

const MainFeed = () => (
  <div style={{ backgroundColor: '#f1f2f5' }}>
    <Header />
    <NewRequestModal />
    <Feed />
  </div>
);

export default MainFeed;
