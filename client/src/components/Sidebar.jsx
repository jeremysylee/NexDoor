import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
// import { ListItem } from '@material-ui/core';
import NavigationListItem from './NavigationListItem';
import {
  SidebarContainer,
} from './App.styles';

const MyListItemText = styled.div`
  font-size: 14px;
  color: black;
  font-weight: 400;
  margin 0.25em 0;
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cookie = new Cookies();

  const handleHome = () => {
    dispatch({ type: 'SET_PAGE', page: '/' });
    dispatch({ type: 'TOGGLE_REQUEST_MODAL', toggle: false });
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
      <NavigationListItem button onClick={handleHome}>
        <MyListItemText>Home</MyListItemText>
      </NavigationListItem>
      <NavigationListItem button onClick={handleMyRequests}>
        <MyListItemText>My Requests</MyListItemText>
      </NavigationListItem>
      <NavigationListItem button onClick={handleMyTasks}>
        <MyListItemText>My Tasks</MyListItemText>
      </NavigationListItem>
      <NavigationListItem button onClick={handleOpenTasks}>
        <MyListItemText>Open Tasks</MyListItemText>
      </NavigationListItem>
      <NavigationListItem button onClick={handleTopHelpers}>
        <MyListItemText>Top Helpers</MyListItemText>
      </NavigationListItem>
      <NavigationListItem button onClick={handleLogOut}>
        <MyListItemText>Log Out</MyListItemText>
      </NavigationListItem>
    </SidebarContainer>
  );
};
export default Sidebar;
