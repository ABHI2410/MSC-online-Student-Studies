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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoginManager from '../Services';
import Autocomplete from '@mui/material/Autocomplete';

  function Courses() {
    const history = useHistory();
    const [selectedMode, setSelectedMode] = React.useState('');
    const [CourseData, setCourseData] = useState({
      name: null,
      customer_id: localStorage.getItem('LoginManager.id'),
      day: null,
      timeStart:null,
      timeEnd: null,
      startDate: null,
      endDate: null,
      location: null,
      mode: null,
      credit: null,
      domain: null,
      textbook: null,
      customer_id: localStorage.getItem('LoginManager.id')
    });
    const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [Name, setName] = React.useState([]);
    const [fromdate, setfromDate] = React.useState(null);
    const [file, setfile] = React.useState()
    const formData = new FormData();
    const handleFile =(event) =>{
        setfile(event.target.files[0]);

    };
    const hadlefromDateChange = (date) => {
      setfromDate(date) 
      setCourseData((prevCourseData) => ({
          ...prevCourseData, 
          startDate: date,
        }));
    };
    const [todate, settoDate] = React.useState(null);
    const hadletoDateChange = (date) => {
      settoDate(date) 
      setCourseData((prevCourseData) => ({
          ...prevCourseData, 
          endDate: date,
        }));
    };
    const [fromtime, setfromtime] = React.useState(null);
    const hadlefromtimeChange = (time) => {
      setfromtime(time) 
      setCourseData((prevCourseData) => ({
          ...prevCourseData, 
          timeStart: time,
        }));
    };
    const [totime, settotime] = React.useState(null);
    const hadletotimeChange = (time) => {
      settotime(time) 
      setCourseData((prevCourseData) => ({
          ...prevCourseData, 
          timeEnd: time,
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
      setCourseData((prevCourseData) => ({
        ...prevCourseData,
        day: value,
      }));
    };
    const mode = ['IN-PERSON', 'HYBRID', 'ONLINE'];
    const handleModeChange = (event) => {
      setSelectedMode(event.target.value);
      setCourseData((prevCourseData) => ({
        ...prevCourseData,
        mode: event.target.value,
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
      const loginManager = LoginManager.getLoginManager();
      
      const errorCallback = (error) => {
        console.error(error);
        // Handle the error, e.g., display an error message
      };

      const callback = (data) => {
        // Handle the successful login, e.g., redirect to another page
        history.push("/courseList");
      };
      
      let payload = JSON.stringify(CourseData);
      formData.append('payload',payload);
      formData.append('syllabus',file);
      console.log("trying to make a fetch request");
      loginManager.post('/v1/courses',formData, callback, errorCallback);

  };


  const [program,setProgram] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const loginManager = LoginManager.getLoginManager()
        const response = await loginManager.get('/v1/program',[]);
        // const extractedData = response.data.map(label: name,id:);
        const transformedData = response.data.map(({ id, name }) => ({ id, label: name }));
        setProgram(transformedData);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchData();
  }, []);
  
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
      <Box component="form"  sx={{ mt: 3 }}>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Name"
                  label="Course Name"
                  name="name"
                  autoComplete="Course-name"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm = {6}>
                <TextField
                  required
                  fullWidth
                  name="domain"
                  label="Domain"
                  id="domain"
                  autoComplete="domain"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm = {12}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={program}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setCourseData((prevCourseData) => ({
                      ...prevCourseData,
                      program_id: newValue.id,
                    }));
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Programs" name="program_id"/>}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
              <InputLabel id="mode-label">Class Start Time</InputLabel>
                  <StaticTimePicker label="From" id="timestart" name="timeStart"
                    value={fromtime} onChange={hadlefromtimeChange} />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm ={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <InputLabel id="mode-label">Class End Time</InputLabel>
                      <StaticTimePicker label="To" id="timeend" name="timeEnd"
                          value={totime} onChange={hadletotimeChange} />
              </LocalizationProvider>
                
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker label="Course Start Date" id="startdate" name="startDate"
                        value={fromdate} onChange={hadlefromDateChange} sx={{width : "100%"}}
                      />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker label="Course End Date" id="enddate" name="endDate"
                        value={todate} onChange={hadletoDateChange} sx={{width : "100%"}}
                      />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm = {6}>
                <TextField
                  required
                  fullWidth
                  name="location"
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
                  name="credit"
                  label="Credit"
                  id="credit"
                  autoComplete="credit"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm = {6}>   
                <InputLabel id="mode-label">Syllabus</InputLabel>
                <Typography variant="captions" sx={{paddingRight: '15px'}}>
                    {file?.name}
                  </Typography>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload file
                    <VisuallyHiddenInput onChange={handleFile} type="file" />
                  </Button>
              </Grid>
              <Grid item xs={12} sm = {12}>
                <TextField
                  multiline
                  required
                  fullWidth
                  rows={4}
                  name="textbook"
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
                  {day.map((name) => (
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
                onClick={handleSubmit}
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

