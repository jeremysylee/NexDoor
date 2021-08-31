import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { url } from '../../../../config';

export default function PrivateRoute({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const userData = useSelector((store) => store.currentUserReducer.userData);
  const dispatch = useDispatch();

  function checkForSession() {
    console.log(document.cookie);
    axios.get(`${url}/api/users/${userData.user_id}/session`, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true,
    })
      .then((response) => {
        dispatch({ type: 'SET_USER', userData: response.data });
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoaded(true);
      });
  }

  useEffect(() => {
    checkForSession();
  }, []);

  return (
    isLoaded ? (
      <Route>
        {userData.user_id !== 0 ? (
          children
        ) : (
          <Redirect to="/login" />
        )}

      </Route>
    ) : (
      <div>Loading ... </div>
    )
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
