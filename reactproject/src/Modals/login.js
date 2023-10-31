import * as React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DrawerAppBar from '../Components/plainnavbar'
import PositionedSnackbar from '../Components/snackbar';
import UserContext from '../UserContext';
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

function Login() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarStatus, setSnackbarStatus] = React.useState('success');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const [userData, setUserData] = useState({
    EmailID: '',
    Password: '',
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
      const response = await fetch('http://localhost/index.php/api', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
      },
        body: JSON.stringify(userData), // body data type must match "Content-Type" header
      });
      const statusCode = response.status;
      const { access_token, refresh_token, role } = response.json();
      console.log(statusCode);
      if (statusCode === 200) {
        setSnackbarStatus('success');
        setSnackbarMessage('User registration successful');
        setSnackbarOpen(true);
        const updatedUser = { ...user, role: role };
        // Set the updated user object using setUser
        setUser(updatedUser);
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        history.push('/courseList');
      } else if (statusCode === 400) {
        console.log("entred 400");
        setSnackbarStatus('error');
        setSnackbarMessage('Invalid Credentials');
        setSnackbarOpen(true);
      }else if (statusCode === 404) {
        setSnackbarStatus('info');
        setSnackbarMessage('No Data Provided');
        setSnackbarOpen(true);
      }else if (statusCode === 422) {
        console.log("entred 422");
        setSnackbarStatus('error');
        setSnackbarMessage('Cant Process the requet');
        setSnackbarOpen(true);
      }else if (statusCode === 500) {
        console.log("entred 500");
        setSnackbarStatus('error');
        setSnackbarMessage('Internal server Error');
        setSnackbarOpen(true);
      }else {
        // Handle other statuses or errors
        console.log("entred else");
        setSnackbarStatus('error');
        setSnackbarMessage('An error occurred during registration');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.log(error);
      setSnackbarStatus('error');
      setSnackbarMessage('An error occurred during registration');
      setSnackbarOpen(true);
  }
  }


    
  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Reset the snackbarOpen state to false
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <DrawerAppBar/>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="EmailID"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
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

export default Login;