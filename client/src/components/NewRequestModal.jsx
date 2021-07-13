import React, { useEffect, useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Grid } from '@material-ui/core/';
import { Formik, Form } from 'formik';

const initial_form_state = {

}

function NewRequestModal() {
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Submit A New Request
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Request Help</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ ...initial_form_state }}
          >
            <Form>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>YOUR TASK LOCATION</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography>DESCRIBE YOUR REQUEST</Typography>
                  <TextField
                    placeholder="I need help carrying my groceries"
                    name="request"
                    variant="outlined"
                    multiline
                    rows={5}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>WHEN DO YOU NEED HELP?</Typography>
                </Grid>

              </Grid>

            </Form>
          </Formik>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

export default NewRequestModal;