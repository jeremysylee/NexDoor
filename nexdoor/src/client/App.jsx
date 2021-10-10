import React, { lazy, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../config';
import 'bootstrap/dist/css/bootstrap.min.css';

import PrivateRoute from './components/PrivateRoute';
import GlobalStyle from './components/Global.styles';
import Home from './containers/Home/Home';
import Login from './features/Accounts/Login';

const TopHelpers = lazy(() => import('./containers/TopHelpers/TopHelpers'));
const Dashboard = lazy(() => import('./containers/Dashboard'));
const Signup = lazy(() => import('./features/Accounts/Signup'));

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
          <Suspense fallback={<div>loading...</div>}>
            <TopHelpers />
          </Suspense>
        </PrivateRoute>
        <PrivateRoute exact path="/request">
          <Suspense fallback={<div>loading</div>}>
            <Dashboard />
          </Suspense>
        </PrivateRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </>
  );
};

export default App;
