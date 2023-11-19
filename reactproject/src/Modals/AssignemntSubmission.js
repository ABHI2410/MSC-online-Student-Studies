import React, { useState } from "react";
import ResponsiveAppBar from '../Components/header'
import ClippedDrawer from '../Components/cousenavbar';
import ListItemText from '@mui/material/ListItemText';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { FileUploader } from "react-drag-drop-files";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import EditIcon from '@mui/icons-material/Edit';
  export function DetailofAssignment(){
    const rectangle = <Box component="span">
        <Typography variant="h4" color="text">
                                80/100
                        </Typography>
    </Box>;
    const fileTypes = ["DOC", "DOCX", "PDF"];
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };
    return(
        <Box container sx={{padding: "20px"}}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', margin:"20px"}}>
                            <Button
                            variant="contained"
                            color="primary"
                            >
                                Modify
                            </Button>
                            
                          </Stack>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4" color="text" sx={{padding: "20px"}}>
                                Assignment Name
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Stack spacing={3} direction="row" sx={{ justifyContent: 'flex-end', margin:"20px"}}>
                            <Badge color ="secondary" badgeContent={<EditIcon sx={{padding:"5px"}}/>} sx={{padding:"2px"}}>
                                {rectangle}
                            </Badge>
                        </Stack>
                    </Grid>
                </Grid>
                

            </Box>
            
            <Typography variant="body2" color="text" sx={{paddingLeft: "20px"}}>
                        Due Date
            </Typography>
            <Box minHeight={'200px'}>
            <Typography variant='body' color="text" sx={{padding:"20px", minHeight:"200px"}}>
                    Assignment Details
            </Typography> 
            </Box>
              
            <Paper variant= "outlined" minHeight={'200px'} sx={{justifyContent: 'center', alignItems: 'center', display:"flex" }}>
                <Grid container spacing={2} minHeight={"200px"}>
                    <Grid item xs={12} sm={6}>
                    <ListItemText id={"FileName"} primary={"No File uploaded"} sx={{padding:"6px 16px"}}/>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{justifyContent: 'center', alignItems: 'center', display:"flex" }}>
                        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                    </Grid>
                </Grid>
            </Paper>
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', margin:"20px"}}>
                            <Button
                            variant="contained"
                            color="primary"
                            >
                                Submit
                            </Button>
                            
                          </Stack>
                
        </Box>
    )
  }
  function Courses() {
    return (
        <ClippedDrawer content ={[<DetailofAssignment key="content"/>]} course={"Web Data Mangement"} value = {"Assignment"}/>
      
    );
  }
  
  
function AssignmentDetails() {
  return (
    <ResponsiveAppBar content={<Courses />} />
    
  );
}

export default AssignmentDetails;