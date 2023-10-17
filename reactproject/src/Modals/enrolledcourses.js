import * as React from 'react';
import logo from '../images/MSC-logos_white.png';
import ImgMediaCard from '../Components/cardwithimg';
import ResponsiveAppBar from '../Components/header'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const coursesData = [
    {
      ImgUrl: logo,
      Name: 'Web Data Management',
      Detail1: 'Prof. John Doe',
      Detail2: 'TT 3:00pm to 4:20pm',
    },
    {
        ImgUrl: logo,
        Name: 'Discreet Mathematics',
        Detail1: 'Prof. Jane Doe',
        Detail2: 'TT 12:00pm to 1:20pm',
      },
  ];
  function Courses() {
    const courseCards = coursesData.map((course, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Link to="/course/dashboard">
        <ImgMediaCard
          ImgUrl={course.ImgUrl}
          Name={course.Name}
          Detail1={course.Detail1}
          Detail2={course.Detail2}
        />
        </Link>
      </Grid>
    ));
  
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center">
                       
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            sx={{ float: 'right' }} // Align button to the right
                            >
                                Enroll Course
                            </Button>
                    </Typography>
                </Grid>
                {courseCards}
            </Grid>
        </Box>
      
    );
  }
  
  
function EnrolledCourses() {
  return (
    <ResponsiveAppBar content={<Courses />} />
    
  );
}

export default EnrolledCourses;