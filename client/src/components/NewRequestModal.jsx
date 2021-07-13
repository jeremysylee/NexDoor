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
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
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
                  <TextField
                    placeholder="Location"
                    variant="outlined"
                    fullWidth
                  />
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

                <Grid item xs={4}>
                  <TextField
                    id="startDate"
                    name="startDate"
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    defaultValue="2021-08-24"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    id="endDate"
                    name="endDate"
                    label="End Date"
                    type="date"
                    variant="outlined"
                    defaultValue="2021-08-27"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    id="time"
                    name="time"
                    label="Time"
                    type="time"
                    variant="outlined"
                    defaultValue="07:30"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  // inputProps={{
                  //   step: 300, // 5 min
                  // }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                  Submit
                  </Button>
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