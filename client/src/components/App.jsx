import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import SignUp from './SignUp';
import Map from './Map';
import Chat from './Chat/Chat';
import HelpfulFeed from './HelpFul/HelpfulFeed';
import LogIn from './LogIn';
import LoginButton from './LoginButton';
import Active from './ActiveTask/Active';

const url = 'http://localhost:3500';

const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.currentUserReducer.userId);
  // const userId = 37;

  const getTasks = () => {
    axios.get(`${url}/api/tasks/15`)
      .then(({ data }) => dispatch({ type: 'SET_TASKS', tasks: data }));
  };

  const getRequests = () => {
    axios.get(`${url}/api/tasks/req/${userId}`)
      .then(({ data }) => dispatch({ type: 'SET_REQUESTS', requests: data }));
  };

  const getMyTasks = () => {
    axios.get(`${url}/api/tasks/help/${userId}`)
      .then(({ data }) => dispatch({ type: 'SET_MY_TASKS', myTasks: data }));
  };

  useEffect(() => {
    getTasks();
    getRequests();
    getMyTasks();
  });

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/helpfulfeed" component={HelpfulFeed} />
          <Route path="/active" component={Active} />
          <Route path="/login" component={LogIn} />
          {/* <Route path="/Auth" component={Auth} /> */}
        </Switch>
      </BrowserRouter>
      <Chat />
    </div>
  );
};

export default App;
