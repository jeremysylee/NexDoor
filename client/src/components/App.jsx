import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import SignUp from './SignUp';
import HelpfulFeed from './Helpful/HelpfulFeed';
import LogIn from './LogIn';
// import LoginButton from './LoginButton';
import Active from './ActiveTask/YouAreHelping/Active';
import MyActiveRequest from './ActiveTask/MyActive/MyActiveRequest';
import PrivateRoute from './PrivateRoute';

const url = 'http://localhost:3500';

const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.currentUserReducer.userData.user_id);

  const getTasksByLocation = () => {
    axios.get(`${url}/api/tasks/master/${userId}/5/30/0`)
      .then(({ data }) => {
        if (!data.user_id) { return; }
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
    // getTasks();
    // getRequests();
    // getMyTasks();
  });

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/helpfulfeed" component={HelpfulFeed} />
          <Route path="/active" component={Active} />
          <Route path="/myactiverequest" component={MyActiveRequest} />
          {/* <PrivateRoute> */}
          <Route path="/home" component={Home} />
          {/* </PrivateRoute> */}
          {/* <Route path="/Auth" component={Auth} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
