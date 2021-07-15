import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import Map from './Map';
import Chat from './Chat/Chat';
import HelpfulFeed from './HelpFul/HelpfulFeed';
import LogIn from './LogIn';
import Auth from './Auth';
import Active from './ActiveTask/Active';

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/helpfulfeed" component={HelpfulFeed} />
        <Route path="/active" component={Active} />
        <Route path="/login" component={LogIn} />
        <Route path="/Auth" component={Auth} />
      </Switch>
    </BrowserRouter>
    <Chat />
  </div>
);

export default App;
