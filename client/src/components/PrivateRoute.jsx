import React, { useContext, createContext, useState, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import currentUser from './AppReducers/currentUserReducer';


export default function PrivateRoute({ children, ...rest }) {
  const userData = useSelector((store) => store.currentUserReducer.userData);

  function tellMeUser() {
    console.log(userData);
  }

  function checkForSession() {
    console.log(document.cookie);
    // if (document.cookie) {

    // }
  };

  useEffect(() => {
    checkForSession();
    tellMeUser();
  });

  return (
    <Route
      {...rest}
      render={({ location }) =>
      (userData.user_id !== 0) ? (
          children
        ) : (
          <Redirect
            to='/'
          />
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
