import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

const Header = () => {
  const user = useSelector((store) => store.currentUserReducer.userData);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      style={{ boxShadow: '0 2px 0 0 #BDC9D7' }}
    >
      <h1>nexdoor</h1>
      <div>{`${user.firstname} ${user.user_id}`}</div>
    </Grid>
  );
};

export default Header;
