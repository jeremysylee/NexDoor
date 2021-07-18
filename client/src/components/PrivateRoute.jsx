import React, { useContext, createContext, useState, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import currentUser from './AppReducers/currentUserReducer';
import axios from 'axios';

export default function PrivateRoute({ children, ...rest }) {
  const [ isLoaded, setIsLoaded ] = useState(false);
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
        const userId = response.data.user_id;
        axios.get(`http://localhost:3500/api/user/info/${userId}`)
          .then((response2) => {
            console.log(response2);
            dispatch({ type: 'SET_USER', userData: response2.data });
            tellMeUser();
            setIsLoaded(true);
          });
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    checkForSession();
  }, []);

  return (
    isLoaded ? (
      <Route
        {...rest}
        render={({ location }) =>
        (userData.user_id !== 0) ? (
          children
          ) : (
            <Redirect to='/login' />
          )
        }
      />
    ) : (
      <div>Loading ... </div>
    )
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
