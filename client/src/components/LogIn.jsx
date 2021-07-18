import React, { useState, useEffect } from 'react';
import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel,
  Checkbox, Link, Grid, Box, Typography, Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import currentUser from './AppReducers/currentUserReducer';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Nexdoor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
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
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const classes = useStyles();

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogIn = () => {
    history.push('/');
  };

  const getUserData = (userId) => {
    axios.get(`http://localhost:3500/api/user/info/${userId}`)
      .then((response) => {
        dispatch({ type: 'SET_USER', userData: response.data });
      })
      .then(() => {
        handleLogIn();
      });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    console.log('login: ', login);
    axios.post('http://localhost:3500/api/login/', login, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log('login successful: ', response.data);
          getUserData(Number(response.data.user_id));
          // redirect to home page
          //set response to redux state
        } else {
          console.log('error logging in');
        }
      })
      .catch((err) => console.error(err));
  };
// get user data from db.getUser



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
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                "Don't have an account? Sign Up"
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
