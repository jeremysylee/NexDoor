import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import NewRequestModal from './NewRequestModal'

const MainFeed = () => {

  return (
    <div>
      <h1>Lemon</h1>
      <NewRequestModal />
    </div>
  )
}

export default MainFeed;
