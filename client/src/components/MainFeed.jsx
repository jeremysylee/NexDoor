import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import NewRequestModal from './NewRequestModal';
import Feed from './MainFeed/index';
import Header from './Header';

const MainFeed = () => (
  <div>
    <Header />
    <NewRequestModal />
    <Feed />
  </div>
);

export default MainFeed;
