import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserExperience({ openExperience, setOpenExperience, append }) {
  const { control, handleSubmit,reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const start = moment(data.startyear.$d).format('MM/YYYY');
    const end = moment(data.endyear.$d).format('MM/YYYY');
    data.startyear = start
    data.endyear = end
    append({'startyear': start, 'endyear': end, 'company': data.company });
    setOpenExperience(false)
    reset()
  };

  return (
    <div>
      <Modal
        open={openExperience}
        onClose={()=>setOpenExperience(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5" align="center" gutterBottom>
                Add Experience
              </Typography>
              <IconButton onClick={()=>setOpenExperience(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Select Company</InputLabel>
                    <Controller
                      name="company" // The name of your field in the form
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select labelId="select-label" {...field}>
                          <MenuItem value="wipro">Wipro</MenuItem>
                          <MenuItem value="kpmg">KPMG</MenuItem>
                          <MenuItem value="dell">DELL</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="startyear"
                    control={control}
                    defaultValue={null}
                    rules={{ required: 'Start year is required' }}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          {...field}
                          fullWidth
                          margin="normal"
                          label="Start Year"
                          views={['month', 'year']}
                          KeyboardButtonProps={{ 'aria-label': 'change date' }}
                          error={!!errors.startyear}
                          helperText={errors.startyear?.message}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="endyear"
                    control={control}
                    defaultValue={null}
                    rules={{ required: 'End year is required' }}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          {...field}
                          fullWidth
                          views={['month', 'year']}
                          margin="normal"
                          label="End year"
                          KeyboardButtonProps={{ 'aria-label': 'change date' }}
                          error={!!errors.endyear}
                          helperText={errors.endyear?.message}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Grid>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 5 }}>
                  Save
                </Button>
              </Grid>
            </form>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}