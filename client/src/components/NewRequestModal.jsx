import React, { useState } from 'react';
import {
  Button, TextField, Dialog, DialogContent, DialogTitle, Typography, Grid, Select, MenuItem, InputLabel, FormControl,
} from '@material-ui/core/';
import { Formik, Form } from 'formik';

function NewRequestModal() {
  const [open, setOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [request, setRequest] = useState({
    location: '',
    body: '',
    category: '',
    startDate: '',
    endDate: '',
    time: '',
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleChange = (event) => {
    setRequest({
      ...request,
      [event.target.name]: event.target.value,
    });
  };

  function validate(values) {
    const errors = {};
    const d1 = new Date(values.startDate);
    const d2 = new Date(values.endDate);
    // check if location has los angeles (search for full address validation package)
    if (!values.location) {
      errors.location = 'Required';
    } else if (!values.location.toLowerCase().includes('los angeles')) {
      errors.location = 'NexDoor is NOT available in your area';
    }
    // check that body isn't longer than x characters
    if (!values.body) {
      errors.body = 'Required';
    }
    // category is required
    if (!values.category) {
      errors.category = 'Required';
    }
    // start date is required & past today's date
    if (!values.startDate) {
      errors.startDate = 'Required';
    } else if (d1 < new Date()) {
      errors.startDate = 'Invalid Date';
    }
    // end date is required and is equal to or past the start date
    if (!values.endDate) {
      errors.endDate = 'Required';
    } else if (d1 > d2) {
      errors.endDate = 'Invalid Date';
    }
    // time is required
    if (!values.time) {
      errors.time = 'Required';
    }
    setValidationErrors(errors);
    return (errors);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validate(request);
    if (Object.keys(errors).length === 0) {
      console.log(request);
      setOpen(false);
    }
  }

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Submit A New Request
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Request Help</DialogTitle>
        <DialogContent>
          <Formik>
            <Form onSubmit={handleSubmit}>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>LOCATION OF TASK</Typography>
                  <TextField
                    placeholder="Location"
                    variant="outlined"
                    fullWidth
                    name="location"
                    value={request.location}
                    onChange={handleChange}
                    error={validationErrors.location && true}
                    helperText={(validationErrors.location) ? validationErrors.location : null}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      label="Category"
                      value={request.category}
                      onChange={handleChange}
                      error={validationErrors.category && true}
                    >

                      <MenuItem value="errand">Errand</MenuItem>
                      <MenuItem value="labor">Labor</MenuItem>
                      <MenuItem value="sitter">Sitter</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                    {(validationErrors.category) ? <div>{validationErrors.category}</div> : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography>DESCRIBE YOUR REQUEST</Typography>
                  <TextField
                    value={request.body}
                    onChange={handleChange}
                    placeholder="I need help carrying my groceries"
                    name="body"
                    variant="outlined"
                    multiline
                    rows={5}
                    fullWidth
                    error={validationErrors.body && true}
                    helperText={(validationErrors.body) ? validationErrors.body : null}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>WHEN DO YOU NEED HELP?</Typography>
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    onChange={handleChange}
                    value={request.startDate}
                    id="startDate"
                    name="startDate"
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={validationErrors.startDate && true}
                    helperText={(validationErrors.startDate) ? validationErrors.startDate : null}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    onChange={handleChange}
                    value={request.endDate}
                    id="endDate"
                    name="endDate"
                    label="End Date"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={validationErrors.endDate && true}
                    helperText={(validationErrors.endDate) ? validationErrors.endDate : null}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    onChange={handleChange}
                    value={request.time}
                    id="time"
                    name="time"
                    label="Time"
                    type="time"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // inputProps={{
                    //   step: 300, // 5 min
                    // }}
                    error={validationErrors.time && true}
                    helperText={(validationErrors.time) ? validationErrors.time : null}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
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
