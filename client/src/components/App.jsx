import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import SignUp from './SignUp';
import Map from './Map';
import Chat from './Chat/Chat';
import HelpfulFeed from './HelpFul/HelpfulFeed';
import LogIn from './LogIn';
// import LoginButton from './LoginButton';
import Active from './ActiveTask/YouAreHelping/Active';
import MyActiveRequest from './ActiveTask/MyActive/MyActiveRequest';
import PrivateRoute from './PrivateRoute';


const url = 'http://localhost:3500';

const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.currentUserReducer.userData.user_id);

  const [currentInterval, setCurrentInterval] = useState();

  const getTasksByLocation = () => {
    // api/tasks/master/:userId/:range/:count/:offset
    axios.get(`${url}/api/tasks/master/${userId}/50/30/0`)
      .then(({ data }) => {
        // console.log(data);
        if (!data.allothers) { return; }
        dispatch({
          type: 'SET_TASKS', tasks: data.allothers,
        });
        if (!data.requested) { return; }
        dispatch({
          type: 'SET_REQUESTS', requests: data.requested,
        });
        if (!data.helper) { return; }
        dispatch({
          type: 'SET_MY_TASKS', myTasks: data.helper,
        });
      });
  };

  // Deprecated Requests BELOW: All tasks now pulled from master API call.

  // const getTasks = () => {
  //   setInterval(() => {
  //     axios.get(`${url}/api/tasks/all/30`)
  //       .then(({ data }) => dispatch({ type: 'SET_TASKS', tasks: data }));
  //   }, 500);
  // };

  // const getRequests = () => {
  //   setInterval(() => {
  //     axios.get(`${url}/api/tasks/req/${userId}`)
  //       .then(({ data }) => dispatch({ type: 'SET_REQUESTS', requests: data }));
  //   }, 500);
  // };

  // const getMyTasks = () => {
  //   axios.get(`${url}/api/tasks/help/${userId}`)
  //     .then(({ data }) => dispatch({ type: 'SET_MY_TASKS', myTasks: data }));

  //   setInterval(() => {
  //     axios.get(`${url}/api/tasks/help/${userId}`)
  //       .then(({ data }) => dispatch({ type: 'SET_MY_TASKS', myTasks: data }));
  //   }, 500);
  // };

  useEffect(() => {
    getTasksByLocation();
    if (currentInterval) {
      clearInterval(currentInterval);
    }

    const getTimer = setInterval(getTasksByLocation, 1000);
    setCurrentInterval(getTimer);
    // getTasks();
    // getRequests();
    // getMyTasks();
  }, [userId]);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
          <PrivateRoute path="/helpfulfeed">
            <HelpfulFeed />
          </PrivateRoute>
          <PrivateRoute path="/active">
            <Active />
          </PrivateRoute>
          <PrivateRoute path="/myactiverequest">
            <MyActiveRequest />
          </PrivateRoute>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
