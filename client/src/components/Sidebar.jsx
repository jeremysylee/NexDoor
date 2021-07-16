import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import {
  Dashboard,
  People,
  BarChart,
  Layers,
  MarkunreadMailboxTwoTone,
} from '@material-ui/icons';

import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import LoginButton from './LoginButton';

const SidebarContainer = styled.div`
  padding-top: 1.5em;
  padding-right: 2em;
  height: 100vh;
`;

const Sidebar = () => {
  const history = useHistory();

  const handleHome = () => {
    history.push('/');
  };

  const handleHelpfulFeed = () => {
    history.push('/helpfulfeed');
  };

  const handleActive = () => {
    history.push('/active');
  };

  return (
    <SidebarContainer>
      <ListItem button onClick={handleHome}>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <MarkunreadMailboxTwoTone />
        </ListItemIcon>
        <ListItemText primary="My Requests" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChart />
        </ListItemIcon>
        <ListItemText primary="Open Tasks" />
      </ListItem>
      <ListItem button onClick={handleActive}>
        <ListItemIcon>
          <Layers />
        </ListItemIcon>
        <ListItemText primary="Active Tasks" />
      </ListItem>
      <ListItem button onClick={handleHelpfulFeed}>
        <ListItemText primary="NexDoor's Most Helpful" />
      </ListItem>
      <LoginButton />
    </SidebarContainer>
  );
};
export default Sidebar;
