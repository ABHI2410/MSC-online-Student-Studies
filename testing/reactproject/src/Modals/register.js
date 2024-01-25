import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Select, MenuItem, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ResponsiveAppBar from '../Components/header'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/courseList">
        MSC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function Register() {
    const history = useHistory();
    const [selectedRole, setSelectedRole] = useState('');
    const roles = ['Student', 'Instructor', 'QA', 'Program Coordinator', 'Admin'];
    const [date, setDate] = React.useState(null);

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
        setUserData((prevUserData) => ({
          ...prevUserData,
          Role: event.target.value,
        }));

    };
    const hadleDateChange = (date) => {
      setDate(date) 
      setUserData((prevUserData) => ({
          ...prevUserData, 
          DateOfBirth: date,
        }));
    };
    const [userData, setUserData] = useState({
      EmailID: '',
      Password: '',
      FirstName: '',
      LastName: '',
      PhoneNo: '',
      Role: selectedRole,
      RegistrationCode: '',
      DateOfBirth: '',
    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    };
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarStatus, setSnackbarStatus] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const updateSnackbar = (open, status, message) => {
      setSnackbarOpen(open);
      setSnackbarStatus(status);
      setSnackbarMessage(message);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
          const response = await fetch('http://127.0.0.1:8000/api/v1/customer', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
          },
            body: JSON.stringify(userData), // body data type must match "Content-Type" header
          });
          const statusCode = response.status;
          if (statusCode === 201) {
            updateSnackbar(true, 'success', 'Registration Sucessfull.');
            history.push('/login');
          }else {
            updateSnackbar(true, 'error', 'Error occurred during registration.');
          }
        } catch (error) {
          updateSnackbar(true, 'error', 'Error occurred during registration.');
      }
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <ResponsiveAppBar 
          snackbarOpen={snackbarOpen}
          snackbarStatus={snackbarStatus}
          snackbarMessage={snackbarMessage}
          updateSnackbar={updateSnackbar}
        />
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="FirstName"
                  required
                  fullWidth
                  id="FirstName"
                  label="First Name"
                  autoFocus
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="LastName"
                  autoComplete="family-name"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="EmailID"
                  name="EmailID"
                  autoComplete="email"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id="role-label">Select Your Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        value={selectedRole}
                        label="Select Your Role"
                        onChange={handleRoleChange}
                    >
                        {roles.map((role, index) => (
                        <MenuItem key={index} value={role}>
                            {role}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="registration code"
                  label="Registration Code"
                  name="RegistrationCode"
                  autoComplete="registration-code"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phoneno"
                  label="Phone No"
                  name="PhoneNo"
                  autoComplete="phone-no"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker label="Date of Birth" id="dateofbirth" name="DateOfBirth"
                        value={date} onChange={hadleDateChange} sx={{width : "100%"}}
                      />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* <PositionedSnackbar
        open={snackbarOpen}
        status={snackbarStatus}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      /> */}
    </ThemeProvider>

  );
}

export default Register;