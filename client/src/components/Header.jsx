import React from 'react';
import { Grid } from '@material-ui/core';

const Header = () => (
  <Grid
    container
    direction="row"
    justifyContent="space-between"
    alignItems="flex-start"
    style={{ fontStyle: 'Roboto', boxShadow: '0 2px 0 0 #BDC9D7' }}
  >
    <h1>nexdoor</h1>
    <h4>Profile image</h4>
  </Grid>
);

export default Header;
