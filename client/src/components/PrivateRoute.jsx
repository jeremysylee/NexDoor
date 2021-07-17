import React, { useContext, createContext, useState } from "react";
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import currentUser from './AppReducers/currentUserReducer';

// const authContext = createContext();
// function useAuth() {
//   return useContext(authContext);
// }

export default function PrivateRoute({ component: Component, ...rest }) {
  const userData = useSelector((store) => store.currentUserReducer.userData);
  console.log(userData)
  // const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={props => {
        return userData ? <Component {...props} /> : <Redirect to="/" />
        // return userData ? <Redirect to="/" /> : <Component {...props} />

      }}
    >
    </Route>
  );
}

