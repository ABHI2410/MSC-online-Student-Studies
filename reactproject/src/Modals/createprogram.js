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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import Container from '@mui/material/Container';

import LoginManager from '../Services';
  function Programs() {
    const history = useHistory();
    const [SelectedType, setSelectedType] = React.useState('');
    const [SelectedDepartment, setSelectedDepartment] = React.useState('');
    const [Data, setData] = useState({
      name: null,
      description : null,
      startDate: null,
      duration: null,
      department: null,
      type: null,
      creditsRequired: null,
      overview: null,
      vision: null,
      mission: null,
      careerOpportunities: null,
      location: null,
      customer_id: localStorage.getItem('LoginManager.id')
    });
    const department = ['CSE', 'ASE', 'ME', 'CE', 'BME', 'DM'];
    const type = ['Bachelor', 'Master', 'Ph.D.'];
    const [startdate, setstartdate] = React.useState(null);

    const hadlefromDateChange = (date) => {
        setstartdate(date) 
      setData((prevData) => ({
          ...prevData, 
          startDate: date,
        }));
    };

    const handleDepartmentChange = (event) => {
      setSelectedDepartment(event.target.value);
      setData((prevData) => ({
        ...prevData,
        department: event.target.value,
      }));
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        setData((prevData) => ({
          ...prevData,
          type: event.target.value,
        }));
      };

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (event) => {
      console.log(Data);
      event.preventDefault();
      const loginManager = LoginManager.getLoginManager()

      const errorCallback = (error) => {
        console.error(error);
        // Handle the error, e.g., display an error message
      };

      const callback = (data) => {
        console.log("caught promise",data);
        // Handle the successful login, e.g., redirect to another page
        history.push("/courseList");
      };
      loginManager.post('http://127.0.0.1:8000/api/v1/program',Data, callback, errorCallback);

  };


  
    return (
      <Container  maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  name="name"
                  autoComplete="Course-name"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{padding:"0px"}}>
                <FormControl fullWidth sx={{margin:"0px"}}>
                    <InputLabel id="mode-label">Department *</InputLabel>
                    <Select
                        labelId="department-label"
                        id="department"
                        value={SelectedDepartment}
                        label="Select Mode"
                        onChange={handleDepartmentChange}
                    >
                        {department.map((role, index) => (
                        <MenuItem key={index} value={role}>
                            {role}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} sx={{padding:"0px"}}>
                <FormControl fullWidth sx={{margin:"0px"}}>
                    <InputLabel id="mode-label">Type *</InputLabel>
                    <Select
                        labelId="type-label"
                        id="type"
                        value={SelectedType}
                        label="Type"
                        onChange={handleTypeChange}
                    >
                        {type.map((role, index) => (
                        <MenuItem key={index} value={role}>
                            {role}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker label="Program Start Date *" id="startdate" name="startDate"
                        value={startdate} onChange={hadlefromDateChange} sx={{width : "100%"}}
                      />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm = {6}>
                <TextField
                  required
                  fullWidth
                  name="duration"
                  label="Duration in Years"
                  id="duration"
                  autoComplete="duration"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm = {6}>
                <TextField
                  required
                  fullWidth
                  name="creditsRequired"
                  label="Credit's Required"
                  id="creditsrequired"
                  autoComplete="creditsrequired"
                  onChange={handleInputChange}
                />
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

              <Grid item xs={12} sm = {12}>
                <TextField
                  multiline
                  required
                  fullWidth
                  rows={4}
                  name="description"
                  label="Description"
                  id="description"
                  autoComplete="description"
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={12} sm = {12}>
                <TextField
                  multiline
                  required
                  fullWidth
                  rows={4}
                  name="vision"
                  label="Vision"
                  id="vision"
                  autoComplete="vision"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm = {12}>
                <TextField
                  multiline
                  required
                  fullWidth
                  rows={4}
                  name="mission"
                  label="Mission"
                  id="mission"
                  autoComplete="mission"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm = {12}>
                <TextField
                  multiline
                  required
                  fullWidth
                  rows={4}
                  name="overview"
                  label="Overview"
                  id="overview"
                  autoComplete="overview"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm = {12}>
                <TextField
                  multiline
                  required
                  fullWidth
                  rows={4}
                  name="careerOpportunities"
                  label="Career Opportunities"
                  id="careeropportunities"
                  autoComplete="careeropportunities"
                  onChange={handleInputChange}
                />
              </Grid>   
              

              
              <Box ml={'auto'} mr={'auto'} paddingBottom={"25px "} paddingTop={"25px"}>   
              <Button
                type="submit"
                variant="contained"
                >
                    Create Program 
                </Button>
                </Box>
          </Grid>
      </Box>
      </Container>

      
    );
  }
  
  
function CreatePrograms() {
  return (
    <ResponsiveAppBar content={<Programs />} />
    
  );
}

export default CreatePrograms;

