import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import HelpfulFeed from './Helpful/HelpfulFeed';
import LogIn from './LogIn';

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/helpfulfeed" component={HelpfulFeed} />
        <Route path="/login" component={LogIn} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
