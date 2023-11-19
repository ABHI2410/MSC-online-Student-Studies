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
import Stack from '@mui/material/Stack';
import LoginManager from '../Services';



  function Courses() {

    const [coursesData,setCoursesData] = React.useState([]);
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const loginManager = LoginManager.getLoginManager()
          var url = '/v1/courses?customer_id[eq]'+localStorage.getItem('LoginManager.id');
          const response = await loginManager.get(url,[]);
          // const extractedData = response.data.map(label: name,id:);
          const transformedData = response.data.map(({ id, name }) => ({ id, label: name }));
          setCoursesData(transformedData);
        } catch (error) {
          console.error(error);
          // Handle error
        }
      };

      fetchData();
    }, []);
    const courseCards = coursesData.map((course, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Link to="/course/dashboard">
        <ImgMediaCard
          ImgUrl={logo}
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
                    <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                          <Link to='/'>
                            <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            >
                                Enroll Course
                            </Button>
                            </Link>
                            <Link to='/createcourse'>
                              <Button
                              variant="contained"
                              color="primary"
                              startIcon={<AddIcon />}
                              >
                                  Create Course
                              </Button>
                            </Link>
                            <Link to='/createprogram'>
                              <Button
                              variant="contained"
                              color="primary"
                              startIcon={<AddIcon />}
                              >
                                  Create Program
                              </Button>
                            </Link>
                          </Stack>
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