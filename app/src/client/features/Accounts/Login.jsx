/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel,
  Checkbox, Link, Grid, Box, Typography, Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { url } from '../../../../config';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://www.google.com">
        Nexdoor
      </Link>
      &nbsp;2021.
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LogIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogIn = () => {
    history.push('/');
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/users/login/`, login, {
        headers: { 'content-type': 'application/json' },
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch({ type: 'SET_USER', userData: response.data });
        handleLogIn();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* TODO */}
              <Link href="http://www.google.com" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={() => history.push('/signup')} variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default LogIn;
