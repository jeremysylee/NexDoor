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

const MyListItemText = styled.div`
  font-size: 14px;
  color: black;
  font-weight: 500;
`;

const MyListItemIcon = styled(ListItemIcon)`
  color: white;
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cookie = new Cookies();

  const handleHome = () => {
    dispatch({ type: 'SET_PAGE', page: '/' });
    dispatch({ type: 'SHOW_MAP', toggle: true });
    history.push('/');
  };

  const handleMyRequests = () => {
    dispatch({ type: 'SET_PAGE', page: '/myrequests' });
    dispatch({ type: 'SHOW_MAP', toggle: true });
    history.push('/myrequests');
  };

  const handleMyTasks = () => {
    dispatch({ type: 'SET_PAGE', page: '/mytasks' });
    dispatch({ type: 'SHOW_MAP', toggle: true });
    history.push('/mytasks');
  };

  const handleOpenTasks = () => {
    dispatch({ type: 'SET_PAGE', page: '/tasks' });
    dispatch({ type: 'SHOW_MAP', toggle: true });
    history.push('/opentasks');
  };

  const handleHelpfulFeed = () => {
    history.push('/helpfulfeed');
  };

  const logOut = () => {
    cookie.remove('connect.sid', {
      path: '/',
      expires: 'Thu, 01-Jan-70 00:00:01 GMT;',
      secure: false,
    });
  };

  const handleLogOut = () => {
    logOut();
    history.push('/login');
  };

  return (
    <SidebarContainer>
      <ListItem button onClick={handleHome}>
        <MyListItemIcon>
          <Dashboard />
        </MyListItemIcon>
        <MyListItemText>Home</MyListItemText>
      </ListItem>
      <ListItem button onClick={handleMyRequests}>
        <ListItemIcon>
          <MarkunreadMailboxTwoTone />
        </ListItemIcon>
        <MyListItemText>My Requests</MyListItemText>
      </ListItem>
      <ListItem button onClick={handleMyTasks}>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <MyListItemText>My Tasks</MyListItemText>
      </ListItem>
      <ListItem button onClick={handleOpenTasks}>
        <ListItemIcon>
          <BarChart />
        </ListItemIcon>
        <MyListItemText>Open Tasks</MyListItemText>
      </ListItem>
      <ListItem button onClick={handleHelpfulFeed}>
        <ListItemIcon>
          <Star />
        </ListItemIcon>
        <MyListItemText>Most Helpful</MyListItemText>
      </ListItem>
      <ListItem button onClick={handleLogOut}>
        <MyListItemText>Log Out</MyListItemText>
      </ListItem>
    </SidebarContainer>
  );
};
export default Sidebar;
