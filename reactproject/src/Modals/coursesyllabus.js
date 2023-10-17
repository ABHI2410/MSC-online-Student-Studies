import * as React from 'react';
import ResponsiveAppBar from '../Components/header'
import ClippedDrawer from '../Components/cousenavbar';
import Divider from '@mui/material/Divider';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Done from '@mui/icons-material/Done';
import Pending from '@mui/icons-material/Pending';
  export function Detailofcontent(){
    return(
        <Box container sx={{padding: "20px"}}>
            <Typography variant="h4" color="text" sx={{padding: "20px"}}>
                        Syllabus
            </Typography>
            <Grid container rowSpacing={3} sx={{marginBottom:"20px"}}>
                <Grid item xs={4} >
                    <Typography variant="h6" color="text.secondary">
                        Content Name
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" color="text.secondary">
                        Date
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" color="text.secondary">
                        Status
                    </Typography>
                </Grid>  

                <Grid item xs={4} >
                    <Typography variant="h6" color="text.secondary">
                        Chapter 1
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" color="text.secondary">
                        22nd August 2023
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" color="text.secondary">
                        <Done sx={{color:"#5cb85c", paddingTop:"10px"}}/>Completed
                    </Typography>
                </Grid> 

                <Grid item xs={4} >
                    <Typography variant="h6" color="text.secondary">
                        Chapter 2
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" color="text.secondary">
                        24th August 2023
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" color="text.secondary">
                        <Done sx={{color:"#5cb85c", paddingTop:"10px"}}/>Completed
                    </Typography>
                </Grid> 
                <Grid item xs={4} >
                    <Typography variant="h6" color="text.secondary">
                        Chapter 3
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" color="text.secondary">
                        29th August 2023
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" color="text.secondary">
                        <Done sx={{color:"#5cb85c", paddingTop:"10px"}}/>Completed
                    </Typography>
                </Grid>   

                <Grid item xs={4} >
                    <Typography variant="h6" color="text.secondary">
                        Chapter 4
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" color="text.secondary">
                        1st September 2023
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" color="text.secondary">
                        <Pending sx={{color:"#fa113d", paddingTop:"10px"}}/>Pending
                    </Typography>
                </Grid>  

                <Grid item xs={4} >
                    <Typography variant="h6" color="text.secondary">
                        Chapter 5
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" color="text.secondary">
                        6th September 2023
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" color="text.secondary">
                        <Pending sx={{color:"#fa113d", paddingTop:"10px"}}/>Pending
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
        <ClippedDrawer content ={[<Detailofcontent key="content"/>]} course={"Web Data Mangement"} value = {"Syllabus"}/>
      
    );
  }
  
  
function CourseSyllabus() {
  return (
    <ResponsiveAppBar content={<Courses />} />
    
  );
}

export default CourseSyllabus;