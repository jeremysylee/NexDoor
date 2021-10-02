import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {
  ListItem,
} from '@material-ui/core';

import {
  SidebarContainer,
} from './App.styles';

const MyListItemText = styled.div`
  font-size: 14px;
  color: black;
  font-weight: 500;
  margin 0.25em 0;
`;

const NavigationButton = styled(ListItem)`
  border-radius: 100px;
  background-color: blue;
  &: hover {
    border-radius: 100px;
  }
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cookie = new Cookies();

  const handleHome = () => {
    dispatch({ type: 'SET_PAGE', page: '/' });
    dispatch({ type: 'SHOW_MAP', toggle: true });
    dispatch({ type: 'SET_TASK', task: { task_id: 0 } });
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

  const handleTopHelpers = () => {
    history.push('/top');
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
      <NavigationButton button onClick={handleHome}>
        <MyListItemText>Home</MyListItemText>
      </NavigationButton>
      <NavigationButton button onClick={handleMyRequests}>
        <MyListItemText>My Requests</MyListItemText>
      </NavigationButton>
      <NavigationButton button onClick={handleMyTasks}>
        <MyListItemText>My Tasks</MyListItemText>
      </NavigationButton>
      <NavigationButton button onClick={handleOpenTasks}>
        <MyListItemText>Open Tasks</MyListItemText>
      </NavigationButton>
      <NavigationButton button onClick={handleTopHelpers}>
        <MyListItemText>Top Helpers</MyListItemText>
      </NavigationButton>
      <NavigationButton button onClick={handleLogOut}>
        <MyListItemText>Log Out</MyListItemText>
      </NavigationButton>
    </SidebarContainer>
  );
};
export default Sidebar;
