import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainFeed from './MainFeed';
import SignUp from './SignUp';
import HelpfulFeed from './HelpFul/HelpfulFeed';

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainFeed} />
        <Route path="/signup" component={SignUp} />
        <Route path="/helpfulfeed" component={HelpfulFeed} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
// import React from 'react';

// const test = () => (
//   <h1>Hello</h1>
// );

// export default test;
