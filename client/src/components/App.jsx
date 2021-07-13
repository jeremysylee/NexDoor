import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainFeed from './MainFeed';
import SignUp from './SignUp';
<<<<<<< HEAD
import HelpfulFeed from './HelpFul/HelpfulFeed';
=======
import LogIn from './LogIn';
>>>>>>> 694ae93bdfbe399ea834e00313d166c8b1ef1947

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainFeed} />
        <Route path="/signup" component={SignUp} />
<<<<<<< HEAD
        <Route path="/helpfulfeed" component={HelpfulFeed} />
=======
        <Route path="/login" component={LogIn} />
>>>>>>> 694ae93bdfbe399ea834e00313d166c8b1ef1947
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
