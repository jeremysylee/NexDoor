import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import NewRequestModal from './NewRequestModal'

const MainFeed = () => {

  return (
    <div>
      <NewRequestModal />
    </div>
  )
}

export default MainFeed;
