import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { DateTime } from 'luxon';
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
import { url } from '../../../config';

function NewRequestModal() {
  const dispatch = useDispatch();
  const open = useSelector((store) => store.addRequestModalReducer.toggle);
  const mode = useSelector((store) => store.addRequestModalReducer.mode);
  const user = useSelector((store) => store.currentUserReducer.userData);
  const task = useSelector((store) => store.selectedTaskReducer.task);
  const [validationErrors, setValidationErrors] = useState({});

  const now = DateTime.local();
  const dateTodayFormatted = DateTime.fromISO(now).toFormat('yyyy-MM-dd');
  const timeNowFormatted = DateTime.fromISO(now).toFormat('HH:mm');
  const dateTimeRoundedToNextHour = DateTime.fromISO(now).plus({ hours: 1 }).toFormat('yyyy-MM-dd;HH:00').split(';');
  const autofillDate = dateTimeRoundedToNextHour[0];
  const autofillTime = dateTimeRoundedToNextHour[1];

  const [request, setRequest] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipcode: '',
    neighborhood: null,
    startDate: '',
    endDate: '',
    startTime: '',
    carRequired: false,
    category: '',
    description: '',
    laborRequired: false,
    duration: null,
  });

  // Autofill default data
  const presetData = () => {
    let data = user;
    if (mode === 'edit') {
      data = task;
      data.address = data.location;
    }
    setRequest({
      streetAddress: data.address.street_address,
      city: data.address.city,
      state: data.address.state,
      zipcode: data.address.zipcode,
      neighborhood: data.address.neighborhood,
      startDate: data.start_date || autofillDate,
      endDate: data.end_date || autofillDate,
      startTime: data.start_time || autofillTime,
      category: data.category || '',
      description: data.description || '',
      carRequired: data.car_required === 'true' || false,
      laborRequired: data.physical_labor_required === 'true' || false,
      duration: data.duration || null,
    });
  };

  useEffect(() => {
    presetData();
  }, [mode]);

  const handleClose = () => { dispatch({ type: 'TOGGLE_AR_MODAL', toggle: false }); };

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
      startDate: '',
      endDate: '',
      startTime: '',
      carRequired: false,
      category: '',
      description: '',
      neighborhood: null,
      laborRequired: false,
      duration: null,
    });
    setValidationErrors({});
  }

  // Validate all inputs
  function validate(values) {
    const errors = {};
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
    if ((values.startDate + values.startTime) < (dateTodayFormatted + timeNowFormatted)) {
      errors.dateValid = 'Date must be in the future';
    }
    if (!values.endDate) {
      errors.endDate = 'Required';
    } else if (values.startDate > values.endDate) {
      errors.endDate = 'End date must be after start date';
    }
    return (errors);
  }

  const cleanInputAndClose = () => {
    handleClose();
    resetReqAndErr();
  };

  const postNewRequest = () => {
    axios.post(`${url}/api/tasks/${user.user_id}`, request)
      .then((response) => {
        console.log(response.data);
        cleanInputAndClose();
      })
      .catch((err) => {
        console.log(err);
        cleanInputAndClose();
      });
  };

  const editRequest = () => {
    axios.put(`${url}/api/tasks/${task.task_id}`, request)
      .then((response) => {
        console.log(response.data);
        cleanInputAndClose();
      })
      .catch((err) => {
        console.log(err);
        cleanInputAndClose();
      });
  };

  // submit form info with validation check
  function handleSubmit(event) {
    event.preventDefault();
    const errors = validate(request);
    if (Object.keys(errors).length === 0) {
      console.log(request);
      resetReqAndErr();
      if (mode === 'new') {
        postNewRequest();
      } else {
        editRequest();
      }
    } else {
      setValidationErrors(errors);
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Request Help</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>

            <Grid
              container
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item xs={12}>
                <Typography>LOCATION OF TASK</Typography>
              </Grid>

              <Grid item xs={12}>
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
                  placeholder="CA"
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
                  label="Zipcode"
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

                <Grid item xs={12}>
                  <Typography>Select All That Apply</Typography>
                </Grid>

                <FormControl component="fieldset">
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
                    <MenuItem value="sitting">Sitting</MenuItem>
                    <MenuItem value="borrow">Borrow</MenuItem>
                    <MenuItem value="favor">Favor</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {(validationErrors.category) ? <div>{validationErrors.category}</div> : null}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography>DESCRIBE YOUR REQUEST</Typography>
              </Grid>

              <Grid item xs={12}>
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

              <Grid
                container
                spacing={3}
                direction="row"
                // justifyContent="space-around"
                alignItems="flex-start"
              >
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
                    error={validationErrors.dateValid && true}
                    helperText={(validationErrors.dateValid) ? validationErrors.dateValid : null}
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
                    value={request.startTime}
                    id="startTime"
                    name="startTime"
                    label="Time"
                    type="time"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    step="900"
                    error={validationErrors.dateValid && true}
                    helperText={(validationErrors.dateValid) ? validationErrors.dateValid : null}
                  />
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
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
