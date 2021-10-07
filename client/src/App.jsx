import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { url } from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';

import PrivateRoute from './components/PrivateRoute';
import GlobalStyle from './components/Global.styles';
import Home from './containers/Home/Home';
import TopHelpers from './containers/TopHelpers/TopHelpers';
import Dashboard from './containers/Dashboard';
import Login from './features/Accounts/Login';
import Signup from './features/Accounts/Signup';

const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.currentUserReducer.userData.user_id);

  const getTasks = () => {
    if (userId) {
      axios.get(`${url}/api/tasks/?userId=${userId}&range=50&quantity=30&offset=0`)
        .then(({ data }) => {
          dispatch({ type: 'SET_TASKS', tasks: data.allothers });
          dispatch({ type: 'SET_REQUESTS', myRequests: data.requested });
          dispatch({ type: 'SET_MY_TASKS', myTasks: data.helper });
        });
    }
  };

  useEffect(() => {
    // getTasks();
    const interval = setInterval(() => getTasks(), 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route exact path="/Signup" component={Signup} />
        <Route exact path="/Login" component={Login} />
        <PrivateRoute exact path="/top">
          <TopHelpers />
        </PrivateRoute>
        <PrivateRoute exact path="/request">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </>
  );
};

export default App;
