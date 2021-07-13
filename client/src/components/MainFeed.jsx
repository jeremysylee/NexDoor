import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import NewRequestModal from './NewRequestModal'
import Feed from './MainFeed/index';

const MainFeed = () => {

  return (
    <div>
      <NewRequestModal />
      <Feed />
    </div>
  )
}

export default MainFeed;
