import React from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import axios from 'axios';
import User from './User';
import { StarIcon, DashboardIcon, PeopleIcon, ShoppingCartIcon, BarChartIcon, LayersIcon, AssignmentIcon, } from '@material-ui/icons';
import { ListItem, ListItemIcon, ListItemText, ListSubheader, Container, Avatar, } from '@material-ui/core';

const HelpfulFeed = () => {
  const tasks = useSelector((store) => store.tasksReducer.tasks);

  const placeholder = 'NexDoors Most Helpful';

  return (
    <div>
      <h1>{placeholder}</h1>
      {tasks.map((task) => (<User user={task.user} />))}
    </div>
  );
};

export default HelpfulFeed;