import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Header from '../Header';
import Sidebar from '../Sidebar';
import User from './User';

const HelpfulFeed = () => {
  const [topReviews, setTopReviews] = useState([]);

  const url = 'http://localhost:3500';

  useEffect(() => {
    axios.get(`${url}/api/users/rating/10`)
      .then(({ data }) => {
        setTopReviews(data);
      })
      .catch((err) => { console.error(err); });
  }, []);

  const bestReviews = topReviews.sort((a, b) => b.avg_rating - a.avg_rating);

  const topThree = bestReviews.slice(0, 4);
  console.log('review list', bestReviews);
  console.log('TOP 3', topThree);

  const placeholder = "NexDoor's Most Helpful";

  return (
    <div style={{ fontStyle: 'Roboto', backgroundColor: "rgb(241, 242, 245)" }}>
      <Header />
      <Grid
        container
        direction="row"
        spacing={5}
      >
        <Grid item xs={3} >
          <Sidebar />
        </Grid>
        <Grid
          item xs={5}
        >
          <h1>{placeholder}</h1>
          {bestReviews.map((task, index) => (<User user={task} key={index} />))}
        </Grid>
      </Grid>
    </div>
  );
};

export default HelpfulFeed;