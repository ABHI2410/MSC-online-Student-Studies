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
import DrawerAppBar from '../Components/plainnavbar';
import PositionedSnackbar from '../Components/snackbar';
import { Select, MenuItem, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


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
    const roles = ['Student', 'Instrutor', 'QA', 'Program Coordinator'];
    const [date, setDate] = React.useState(null);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarStatus, setSnackbarStatus] = React.useState('success');
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
        setUserData((prevUserData) => ({
          ...prevUserData,
          Role: event.target.value,
        }));

    };
    const handleSnackbarClose = () => {
      setSnackbarOpen(false); // Reset the snackbarOpen state to false
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
          const response = await fetch('http://localhost/index.php/user/create', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
          },
            body: JSON.stringify(userData), // body data type must match "Content-Type" header
          });
          const statusCode = response.status;
          if (statusCode === 200) {
            setSnackbarStatus('success');
            setSnackbarMessage('User registration successful');
            setSnackbarOpen(true);
            history.push('/login');
          } else if (statusCode === 400) {
            setSnackbarStatus('error');
            setSnackbarMessage('Invalid Data Provided');
            setSnackbarOpen(true);
          }else if (statusCode === 404) {
            setSnackbarStatus('info');
            setSnackbarMessage('No Data Provided');
            setSnackbarOpen(true);
          }else if (statusCode === 422) {
            setSnackbarStatus('error');
            setSnackbarMessage('Cant Process the requet');
            setSnackbarOpen(true);
          }else if (statusCode === 500) {
            setSnackbarStatus('error');
            setSnackbarMessage('Internal server Error');
            setSnackbarOpen(true);
          }else {
            // Handle other statuses or errors
            setSnackbarStatus('error');
            setSnackbarMessage('An error occurred during registration');
            setSnackbarOpen(true);
          }
        } catch (error) {
          setSnackbarStatus('error');
          setSnackbarMessage('An error occurred during registration');
          setSnackbarOpen(true);
      }
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <DrawerAppBar />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
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
      <PositionedSnackbar
        open={snackbarOpen}
        status={snackbarStatus}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </ThemeProvider>

  );
}

export default Register;