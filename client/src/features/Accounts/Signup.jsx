/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Avatar, Button, CssBaseline, TextField,
  Link, Grid, Box, Typography, Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [info, setInfo] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipcode: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const classes = useStyles();

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    }, console.log(e.target.value));
  };

  const handleLogIn = () => {
    history.push('/');
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    const userInfo = {
      streetAddress: info.streetAddress,
      city: info.city,
      state: info.state,
      zipcode: info.zipcode,
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
      password: info.password,
      confirm_password: info.confirm_password,
      neighborhoood: null,
      imgUrl: null,
    };
    try {
      await axios.post(`${url}/api/users`, userInfo);
      const res = await axios.post(`${url}/api/users/login/`, userInfo, {
        headers: { 'content-type': 'application/json' },
        withCredentials: true,
      });
      dispatch({ type: 'SET_USER', userData: res.data });
      handleLogIn();
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
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={signupHandler} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="streetAddress"
                label="Street Address"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="city"
                label="City"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="state"
                label="State"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="zipcode"
                label="Zip Code"
                type="number"
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={() => history.push('/login')} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;
