import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import SignUp from './SignUp';
import HelpfulFeed from './Helpful/HelpfulFeed';
import LogIn from './LogIn';
// import LoginButton from './LoginButton';
import Active from './ActiveTask/Active';

const url = 'http://localhost:3500';

const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.currentUserReducer.userData.user_id);

  const getTasksByLocation = () => {
    axios.get(`${url}/api/tasks/master/${userId}/5/30/0`)
      // .then(({ data }) => console.log(data.allothers));
      .then(({ data }) => {
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
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/helpfulfeed" component={HelpfulFeed} />
          <Route path="/active" component={Active} />
          <Route path="/login" component={LogIn} />
          {/* <Route path="/Auth" component={Auth} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
