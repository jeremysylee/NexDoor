import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../config';

import PrivateRoute from './components/PrivateRoute';
import GlobalStyle from './components/Global.styles';
import Home from './containers/Home/Home';
import TopHelpers from './containers/TopHelpers/TopHelpers';
import Request from './containers/Request';
import Login from './features/Accounts/Login';
import Signup from './features/Accounts/Signup';

const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.currentUserReducer.userData.user_id);

  const getTasks = () => {
    axios.get(`${url}/api/tasks/?userId=${userId}&range=50&quantity=30&offset=0`)
      .then(({ data }) => {
        dispatch({ type: 'SET_TASKS', tasks: data.allothers });
        dispatch({ type: 'SET_REQUESTS', myRequests: data.requested });
        dispatch({ type: 'SET_MY_TASKS', myTasks: data.helper });
      });
  };

  useEffect(() => {
    getTasks();
    const interval = setInterval(() => getTasks(), 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route exact path="/Signup" component={Signup} />
        <Route exact path="/Login" component={Login} />
        <PrivateRoute exact path="/TopHelpers">
          <TopHelpers />
        </PrivateRoute>
        <PrivateRoute exact path="/request">
          <Request />
        </PrivateRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
