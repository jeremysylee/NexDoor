import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MainFeed = () => {

  const [ratingModal, setRatingModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);

  return (


    <div>
      <h1>Lemon</h1>
    <button>Rating</button>
    <button></button>
    </div>
  )
}

export default MainFeed;
