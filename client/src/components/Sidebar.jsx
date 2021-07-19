import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

import {
  Dashboard,
  People,
  BarChart,
  Layers,
  MarkunreadMailboxTwoTone,
  Star,
} from '@material-ui/icons';

import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

const SidebarContainer = styled.div`
  padding-top: 1.5em;
  padding-right: 2em;
  height: 100vh;
  position: sticky;
  top: 0;
  max-width: 230;
`;

const MyListItemText = styled(ListItemText)({
  color: 'black',
});

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cookie = new Cookies();

  const handleHome = () => {
    history.push('/');
  };

  const handleMyRequests = () => {
    dispatch({ type: 'SET_PAGE', page: '/myrequests' });
    history.push('/myrequests');
  };

  const handleMyTasks = () => {
    history.push('/mytasks');
  };

  const handleHelpfulFeed = () => {
    history.push('/helpfulfeed');
  };

  const handleActive = () => {
    history.push('/myactiverequest');
  };

  const handleLogOut = () => {
    logOut();
    history.push('/login');
  };

  const logOut = () => {
    cookie.remove('connect.sid', {
      path: '/',
      expires: 'Thu, 01-Jan-70 00:00:01 GMT;',
      secure: false,
    });
  };

  return (
    <SidebarContainer>
      <ListItem button onClick={handleHome}>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <MyListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={handleMyRequests}>
        <ListItemIcon>
          <MarkunreadMailboxTwoTone />
        </ListItemIcon>
        <ListItemText primary="My Requests" />
      </ListItem>
      <ListItem button onClick={handleMyTasks}>
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
        <ListItemIcon>
          <Star />
        </ListItemIcon>
        <ListItemText primary="Most Helpful" />
      </ListItem>
      <ListItem button onClick={handleLogOut}>
        <ListItemText primary="Log Out" />
      </ListItem>
    </SidebarContainer>
  );
};
export default Sidebar;
