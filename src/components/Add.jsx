import React, { useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Button, TextField, Container, Typography, TextareaAutosize, Grid, Stack, InputLabel, FormControl } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import UserEducationModal from '../modals/UserEducationModal';
import moment from 'moment';
import UserExperience from '../modals/UserExperience';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [open, setOpen] = React.useState(false);
  const [openExperience, setOpenExperience] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { control,reset, handleSubmit, register, formState: { errors } } = useForm();
  // Define the first array
  const { fields: userEducationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'userEducation',
  });

  // Define the second array
  const { fields: userExperienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'userExperience', // Use a different name for the second array
  });
  const navigate = useNavigate() 
  const [items, setItems] = React.useState([]);

    // Fetch items from localStorage on component mount
    useEffect(() => {
      const storedItems = JSON.parse(localStorage.getItem('user'));
      if (storedItems) {
        setItems(storedItems);
      }
    }, []);

  const updateItems = (newItems) => {
    // Merge newItems with the existing items
    const mergedItems = [...items, ...newItems];
    setItems(mergedItems);
    // Save mergedItems to localStorage
    localStorage.setItem('user', JSON.stringify(mergedItems));
    navigate('/')

  };

  const onSubmit = (data) => {
    console.log(data); // Handle your form data here
    if (!data.dob) {
      errors.dob = { message: 'Date of birth is required' };
    }
  
    if (!data.address) {
      errors.address = { message: 'Address is required' };
    }
    const dateDob = moment(data.dob.$d).format('DD/MM/YYYY');
    data.dob = dateDob
    updateItems([data])
    // localStorage.setItem("user", JSON.stringify([data]));
    reset()
  };
  // console.log(fields)
  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom mt={5}>
        Add user
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: 'First Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="FirstName"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: 'Last Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="lastName"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{ required: 'Phone is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="phone"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>

            <Controller
              name="dob"
              control={control}
              defaultValue={null}
              rules={{ required: 'DOB is required' }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    fullWidth
                    margin="normal"
                    label="DOB"
                    KeyboardButtonProps={{ 'aria-label': 'change date' }}
                    error={!!errors.dob}
                    helperText={errors.dob?.message}
                  />
                </LocalizationProvider>
              )}
            />
             {errors.dob && (
          <Typography variant="body2" color="error">
            {errors.dob.message}
          </Typography>
        )}
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{ required: 'Address is required' }}
              render={({ field }) => (
                <TextareaAutosize
                  {...field}
                  multiline
                  minRows={3}
                  variant="outlined"
                  placeholder='Address'
                  margin="normal"
                  error={!!errors.address}
                  helperText={errors.address && errors.address.message}
                />
              )}
            />
             {errors.address && (
          <Typography variant="body2" color="error">
            {errors.address.message}
          </Typography>
        )}
          </Grid>
          <Grid container item xs={12} mb={2} sx={{ display: 'block' }}>
            <Stack>
              <Button variant="outlined" onClick={handleOpen}>Add Eduction</Button>
            </Stack>
            <Stack>
              {userEducationFields.map((field, index) => (
                <Grid sx={{ display: 'flex' }} spacing={2}>

                  <Grid item md={3}>
                    <Controller
                      name={`userEducation.${index}.degree`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Degree'
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          margin="normal"
                          fullWidth
                        />
                      )} />
                  </Grid>

                  <Grid item md={3}>
                    <Controller
                      name={`userEducation.${index}.college`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                        label='Collage'
                          {...field}
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          margin="normal"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <Controller
                      name={`userEducation.${index}.startyear`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                        label='Start Year'
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          margin="normal"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <Controller
                      name={`userEducation.${index}.endyear`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                        label='End Year'
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          margin="normal"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              ))}
            </Stack>
          </Grid>
          <Grid container item xs={12} mb={2} sx={{ display: 'block' }}>
            <Stack>
              <Button variant="outlined" onClick={() => setOpenExperience(true)}>Add Experience</Button>
            </Stack>
            {userExperienceFields.map((field, index) => (
              <Grid sx={{display:'flex'}}>
                <Grid item md={3}>
                  <Controller
                    name={`userExperience.${index}.company`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Compaany'
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                      />
                    )} />
                </Grid>
                <Grid item md={3}>
                  <Controller
                    name={`userExperience.${index}.startyear`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Start Year'
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item md={3}>
                  <Controller
                    name={`userExperience.${index}.endyear`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='End Year'
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
          
          <Button type="submit" variant="contained" color="primary" sx={{marginLeft:2}}>
            Submit
          </Button>
        </Grid>
      </form>
      <UserEducationModal open={open} handleClose={handleClose} append={appendEducation} />
      <UserExperience openExperience={openExperience} setOpenExperience={setOpenExperience} append={appendExperience} />
    </Container >
  );
};

export default Add;
