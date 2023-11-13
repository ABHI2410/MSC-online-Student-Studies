import * as React from 'react';
import ResponsiveAppBar from '../Components/header'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Select, MenuItem, InputLabel } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
  function Courses() {
    const history = useHistory();
    const [selectedMode, setSelectedMode] = React.useState('');
    const [CourseData, setCourseData] = useState({
      CourseID: null,
      Name: null,
      InstructorID: null,
      ProgramID: null,
      Day: null,
      TimeStart:null,
      TimeEnd: null,
      StartFrom: null,
      EndDate: null,
      Location: null,
      Mode: null,
      Credit: null,
      Domain: null,
      RecommendedTextbook: null,
      Syllabus: null,
    });
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const [Name, setName] = React.useState([]);
    const [fromdate, setfromDate] = React.useState(null);

    const hadlefromDateChange = (date) => {
      setfromDate(date) 
      setCourseData((prevCourseData) => ({
          ...prevCourseData, 
          StartFrom: date,
        }));
    };
    const [todate, settoDate] = React.useState(null);
    const hadletoDateChange = (date) => {
      settoDate(date) 
      setCourseData((prevCourseData) => ({
          ...prevCourseData, 
          EndDate: date,
        }));
    };
    const [fromtime, setfromtime] = React.useState(null);
    const hadlefromtimeChange = (time) => {
      setfromtime(time) 
      setCourseData((prevCourseData) => ({
          ...prevCourseData, 
          TimeStart: time,
        }));
    };
    const [totime, settotime] = React.useState(null);
    const hadletotimeChange = (time) => {
      settotime(time) 
      setCourseData((prevCourseData) => ({
          ...prevCourseData, 
          TimeEnd: time,
        }));
    };
    const handleDayChange = (event) => {
      const {
        target: { value },
      } = event;
      setName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    const mode = ['IN-PERSON', 'HYBRID', 'ONLINE'];
    const handleModeChange = (event) => {
      setSelectedMode(event.target.value);
      setCourseData((prevCourseData) => ({
        ...prevCourseData,
        Mode: event.target.value,
      }));

  };
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setCourseData((prevCourseData) => ({
        ...prevCourseData,
        [name]: value,
      }));
    };
    const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
    });
    const handleSubmit = async (event) => {
      event.preventDefault();
      
    //   try{
    //     const response = await fetch('http://localhost/index.php/course/create', {
    //       method: "POST", // *GET, POST, PUT, DELETE, etc.
    //       headers: {
    //         'Content-Type': 'application/json',
    //     },
    //       body: JSON.stringify(CourseData), // body data type must match "Content-Type" header
    //     });
    //     const statusCode = response.status;
    //     if (statusCode === 200) {
    //       setSnackbarStatus('success');
    //       setSnackbarMessage('User registration successful');
    //       setSnackbarOpen(true);
    //       history.push('/login');
    //     } else if (statusCode === 400) {
    //       setSnackbarStatus('error');
    //       setSnackbarMessage('Invalid Data Provided');
    //       setSnackbarOpen(true);
    //     }else if (statusCode === 404) {
    //       setSnackbarStatus('info');
    //       setSnackbarMessage('No Data Provided');
    //       setSnackbarOpen(true);
    //     }else if (statusCode === 422) {
    //       setSnackbarStatus('error');
    //       setSnackbarMessage('Cant Process the requet');
    //       setSnackbarOpen(true);
    //     }else if (statusCode === 500) {
    //       setSnackbarStatus('error');
    //       setSnackbarMessage('Internal server Error');
    //       setSnackbarOpen(true);
    //     }else {
    //       // Handle other statuses or errors
    //       setSnackbarStatus('error');
    //       setSnackbarMessage('An error occurred during registration');
    //       setSnackbarOpen(true);
    //     }
    //   } catch (error) {
    //     setSnackbarStatus('error');
    //     setSnackbarMessage('An error occurred during registration');
    //     setSnackbarOpen(true);
    // }
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        padding: 0,
      },
    },
  };
  
    return (
      <Container  maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="course-id"
                    name="CourseID"
                    required
                    fullWidth
                    id="CourseID"
                    label="Course Short Name"
                    autoFocus
                    onChange={handleInputChange}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Name"
                  label="Course Name"
                  name="Name"
                  autoComplete="Course-name"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
              <InputLabel id="mode-label">Class Start Time</InputLabel>
                  <StaticTimePicker label="From" id="timestart" name="TimeStart"
                    value={fromtime} onChange={hadlefromtimeChange} />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm ={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <InputLabel id="mode-label">Class End Time</InputLabel>
                      <StaticTimePicker label="To" id="timeend" name="TimeEnd"
                          value={totime} onChange={hadletotimeChange} />
              </LocalizationProvider>
                
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker label="Course Start Date" id="startdate" name="StartFrom"
                        value={fromdate} onChange={hadlefromDateChange} sx={{width : "100%"}}
                      />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker label="Course End Date" id="enddate" name="EndDate"
                        value={todate} onChange={hadletoDateChange} sx={{width : "100%"}}
                      />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm = {6}>
                <TextField
                  required
                  fullWidth
                  name="Location"
                  label="Location"
                  id="location"
                  autoComplete="location"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm = {6}>
                <TextField
                  required
                  fullWidth
                  name="Credit"
                  label="Credit"
                  id="credit"
                  autoComplete="credit"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm = {6}>
                <TextField
                  required
                  fullWidth
                  name="Domain"
                  label="Domain"
                  id="domain"
                  autoComplete="domain"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm = {6}>   
                <InputLabel id="mode-label">Syllabus</InputLabel>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload file
                    <VisuallyHiddenInput type="file" />
                  </Button>
              </Grid>
              <Grid item xs={12} sm = {12}>
                <TextField
                  multiline
                  required
                  fullWidth
                  rows={4}
                  name="RecommendedTextbook"
                  label="Textbook"
                  id="textbook"
                  autoComplete="textbook"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{padding:"0px"}}>
                <FormControl fullWidth sx={{margin:"0px"}}>
                    <InputLabel id="mode-label">Select Mode</InputLabel>
                    <Select
                        labelId="mode-label"
                        id="mode"
                        value={selectedMode}
                        label="Select Mode"
                        onChange={handleModeChange}
                    >
                        {mode.map((role, index) => (
                        <MenuItem key={index} value={role}>
                            {role}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} sx={{padding:"0px"}}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Day</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={Name}
                  onChange={handleDayChange}
                  input={<OutlinedInput label="Day" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {days.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={Name.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>
              <Box ml={'auto'} mr={'auto'} paddingBottom={"25px "}>   
              <Button
                type="submit"
                variant="contained"
                >
                    Create Course 
                </Button>
                </Box>
          </Grid>
      </Box>
      </Container>

      
    );
  }
  
  
function CreateCourses() {
  return (
    <ResponsiveAppBar content={<Courses />} />
    
  );
}

export default CreateCourses;

