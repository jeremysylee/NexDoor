import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../config';

import PrivateRoute from './components/PrivateRoute';
import Home from './containers/Home/Home';
import TopHelpers from './containers/TopHelpers/TopHelpers';
import Request from './containers/Request/YouAreHelping/Active';
import MyActiveRequest from './containers/Request/MyActive/MyActiveRequest';
import Login from './features/Accounts/Login';
import Signup from './features/Accounts/Signup';

const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.currentUserReducer.userData.user_id);

  const getTasksByLocation = () => {
    axios.get(`${url}/api/tasks/${userId}/50/30/0`)
      .then(({ data }) => {
        dispatch({ type: 'SET_TASKS', tasks: data.allothers });
        dispatch({ type: 'SET_REQUESTS', myRequests: data.requested });
        dispatch({ type: 'SET_MY_TASKS', myTasks: data.helper });
      });
  };

  useEffect(() => {
    getTasksByLocation();
    const interval = setInterval(() => getTasksByLocation(), 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/Signup" component={Signup} />
        <Route exact path="/Login" component={Login} />
        <PrivateRoute exact path="/TopHelpers">
          <TopHelpers />
        </PrivateRoute>
        <PrivateRoute exact path="/active">
          <Request />
        </PrivateRoute>
        <PrivateRoute exact path="/myactiverequest">
          <MyActiveRequest />
        </PrivateRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
