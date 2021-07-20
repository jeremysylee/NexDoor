import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import PrivateRoute from './PrivateRoute';
import Home from './Home';
import HelpfulFeed from './Helpful/HelpfulFeed';
import Active from './ActiveTask/YouAreHelping/Active';
import MyActiveRequest from './ActiveTask/MyActive/MyActiveRequest';
import { setTasks } from './MainFeed/tasksSlice';
import LogIn from './LogIn';
import SignUp from './SignUp';

const url = 'http://localhost:3500';

const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.currentUserReducer.userData.user_id);

  const [currentInterval, setCurrentInterval] = useState();

  const getTasksByLocation = () => {
    // api/tasks/master/:userId/:range/:count/:offset
    axios.get(`${url}/api/tasks/master/${userId}/50/30/0`)
      .then(({ data }) => {
        dispatch(setTasks({ payload: data.allothers }));
        dispatch({
          type: 'SET_TASKS', tasks: data.allothers,
        });
        dispatch({
          type: 'SET_REQUESTS', requests: data.requested,
        });
        dispatch({
          type: 'SET_MY_TASKS', myTasks: data.helper,
        });
      });
  };

  useEffect(() => {
    getTasksByLocation();
    if (currentInterval) {
      clearInterval(currentInterval);
    }

    const getTimer = setInterval(getTasksByLocation, 100);
    setCurrentInterval(getTimer);
  }, [userId]);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
          <PrivateRoute exact path="/helpfulfeed">
            <HelpfulFeed />
          </PrivateRoute>
          <PrivateRoute exact path="/active">
            <Active />
          </PrivateRoute>
          <PrivateRoute exact path="/myactiverequest">
            <MyActiveRequest />
          </PrivateRoute>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
