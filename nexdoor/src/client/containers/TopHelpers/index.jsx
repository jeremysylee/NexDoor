import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Avatar } from '@material-ui/core';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import User from './User';

const TopHelpers = () => {
  const [topReviews, setTopReviews] = useState([{profile_picture_url: ''}, {profile_picture_url: ''}, {profile_picture_url: ''}]);
  const currentUserId = useSelector((store) => store.currentUserReducer.userData.user_id);

  const url = 'http://localhost:3500';

  useEffect(() => {
    axios.get(`${url}/api/users/?sortBy=rating&userId=${currentUserId}&quantity=10&range=10`)
      .then(({ data }) => {
        setTopReviews(data);
      })
      .catch((err) => { console.error(err); });
  }, []);

  const bestReviews = topReviews.sort((a, b) => b.avg_rating - a.avg_rating);

  const topThree = bestReviews.slice(0, 2);
  console.log('review list', bestReviews);
  console.log('TOP 3', topThree[1].profile_picture_url);

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
          {/* <div>
            <div>

            </div>
            <div>
              <Avatar
                style={{ height: '60px', width: '60px' }}
                src={topThree[1].profile_picture_url} />
            </div>
            <div>

            </div>
          </div> */}
          {bestReviews.map((task, index) => (<User user={task} key={index} />))}
        </Grid>
      </Grid>
    </div>
  );
};

export default TopHelpers;
