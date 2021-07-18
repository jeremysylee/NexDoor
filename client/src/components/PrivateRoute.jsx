import React, { useContext, createContext, useState, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import currentUser from './AppReducers/currentUserReducer';
import axios from 'axios';

export default function PrivateRoute({ children, ...rest }) {
  const userData = useSelector((store) => store.currentUserReducer.userData);
  const dispatch = useDispatch();

  function tellMeUser() {
    console.log('tell me user: ', userData);
  }

  function checkForSession() {
    console.log(document.cookie);
    axios.get('http://localhost:3500/api/session', {
      headers: { 'content-type': 'application/json' },
      withCredentials: true,
    })
      .then((response) => {
        dispatch({ type: 'SET_USER', userData: response.data })
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    checkForSession();
    tellMeUser();
  }, []);

  return (
    <Route
      {...rest}
      render={({ location }) =>
      (userData.user_id !== 0) ? (
        children
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
}


// export default function PrivateRoute({ component: Component, ...rest }) {
//   const userData = useSelector((store) => store.currentUserReducer.userData);
//   console.log('userData: ', userData);
//   // const { currentUser } = useAuth();
//   return (
//     <Route
//       // {...rest}
//       render={props => {
//         return userData ? <Component {...props} /> : <Redirect to="/" />
//       }}
//     />
//   );
// }
