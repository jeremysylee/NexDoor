import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core/';
import axios from 'axios';

function NewRequestModal() {
  const [open, setOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [request, setRequest] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipcode: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    time: '',
    carRequired: false,
    laborRequired: false,
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // updates state for all input changes
  const handleChange = (event) => {
    if (event.target.name === 'laborRequired' || event.target.name === 'carRequired') {
      setRequest({
        ...request,
        [event.target.name]: event.target.checked,
      });
    } else {
      setRequest({
        ...request,
        [event.target.name]: event.target.value,
      });
    }
  };

  // resets input values & validation errs when you successfully submit form
  function resetReqAndErr() {
    setRequest({
      streetAddress: '',
      city: '',
      state: '',
      zipcode: '',
      description: '',
      category: '',
      startDate: '',
      endDate: '',
      time: '',
      carRequired: false,
      laborRequired: false,
    });
    setValidationErrors({});
  }

  // validate all inputs
  function validate(values) {
    const errors = {};
    // format dates for comparison
    const d1Split = values.startDate.split('-');
    const d2Split = values.endDate.split('-');
    const d1 = new Date(`${d1Split[1]}-${d1Split[2]}-${d1Split[0]}`);
    const d2 = new Date(`${d2Split[1]}-${d2Split[2]}-${d2Split[0]}`);
    const currentDate = new Date();
    const yesterday = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    if (!values.streetAddress) {
      errors.streetAddress = 'Required';
    }
    if (!values.city) {
      errors.city = 'Required';
    } else if (!values.city.toLowerCase().includes('los angeles')) {
      errors.city = 'NexDoor is NOT available in your area';
    }
    if (!values.state) {
      errors.state = 'Required';
    }
    if (!values.zipcode) {
      errors.zipcode = 'Required';
    }
    if (!values.description) {
      errors.description = 'Required';
    }
    if (!values.category) {
      errors.category = 'Required';
    }
    if (!values.startDate) {
      errors.startDate = 'Required';
    } else if (d1 <= yesterday) {
      errors.startDate = 'Invalid Date';
    }
    if (!values.endDate) {
      errors.endDate = 'Required';
    } else if (d1 > d2) {
      errors.endDate = 'Invalid Date';
    }
    if (!values.time) {
      errors.time = 'Required';
    }
    return (errors);
  }

  // submit form info with validation check
  function handleSubmit(event) {
    event.preventDefault();
    const errors = validate(request);
    if (Object.keys(errors).length === 0) {
      console.log(request);
      resetReqAndErr();
      // axios.post(`api/task/${}`, request)
      //   .then(response => {
      //     console.log(response.data);
      //     setOpen(false);
      //     resetReqAndErr();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
    } else {
      setValidationErrors(errors);
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
          <form onSubmit={handleSubmit}>

            <Grid container justifyContent="center" alignItems="center" spacing={2}>

              <Grid item xs={12}>
                <Typography>LOCATION OF TASK</Typography>
                <TextField
                  id="outlined-helperText"
                  label="Address Line"
                  name="streetAddress"
                  placeholder="123 Sesame St."
                  value={request.streetAddress}
                  onChange={handleChange}
                  error={validationErrors.streetAddress && true}
                  helperText={validationErrors.streetAddress && validationErrors.streetAddress}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="outlined-helperText"
                  label="City"
                  name="city"
                  placeholder="Los Angeles"
                  value={request.city}
                  onChange={handleChange}
                  error={validationErrors.city && true}
                  helperText={validationErrors.city && validationErrors.city}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="outlined-helperText"
                  label="State"
                  name="state"
                  placeholder="California"
                  value={request.state}
                  onChange={handleChange}
                  error={validationErrors.state && true}
                  helperText={validationErrors.state && validationErrors.state}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  id="outlined-helperText"
                  label="Zipxode"
                  name="zipcode"
                  placeholder="90001"
                  value={request.zipcode}
                  onChange={handleChange}
                  error={validationErrors.zipcode && true}
                  helperText={validationErrors.zipcode && validationErrors.zipcode}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <Typography>Select All That Apply</Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={request.laborRequired} onChange={handleChange} name="laborRequired" />}
                      label="Labor Required"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={request.carRequired} onChange={handleChange} name="carRequired" />}
                      label="Car Required"
                    />
                  </FormGroup>
                </FormControl>
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
                  value={request.description}
                  onChange={handleChange}
                  placeholder="I need help carrying my groceries"
                  name="description"
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                  error={validationErrors.description && true}
                  helperText={(validationErrors.description) ? validationErrors.description : null}
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
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewRequestModal;
