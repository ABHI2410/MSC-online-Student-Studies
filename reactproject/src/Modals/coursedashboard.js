import * as React from 'react';
import ResponsiveAppBar from '../Components/header'
import ClippedDrawer from '../Components/cousenavbar';
import Divider from '@mui/material/Divider';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

  export function Detailofcontent(){
    return(
        <Box container sx={{padding: "20px"}}>
            <Grid container rowSpacing={3} sx={{marginBottom:"20px"}}>
                <Grid item xs={6} >
                    <Typography variant="h6" color="text.secondary">
                        Instructor Name:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" color="text.secondary">
                        Dr. Jefferson
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" color="text.secondary">
                        Class Timmings:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" color="text.secondary">
                        TT 3:00pm to 4:20pm
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" color="text.secondary">
                        Meeting Location:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" color="text.secondary">
                        Building SIER, 301
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" color="text.secondary">
                        Mode of Delivery:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" color="text.secondary">
                        In-Person
                    </Typography>
                </Grid>
            </Grid>
                
                <Divider/>
                <Grid item xs={12} sx={{padding: "10px"}}>
                    <Typography variant="body2" color="text.secondary">
                        Recommended Textboox: Fundamentals of Web Development, 3rd Edition, Randy Connolly, Ricardo Hoar.
                    </Typography>
                </Grid>
        </Box>
    )
  }
  function Courses() {
    return (
        <ClippedDrawer content ={[<Detailofcontent key="content"/>]} course={"Web Data Mangement"} value = {"Home"}/>
      
    );
  }
  
  
function CourseDashboard() {
  return (
    <ResponsiveAppBar content={<Courses />} />
    
  );
}

export default CourseDashboard;