import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


export default function ClippedDrawer(props) {
    
  return (
    <Box>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12} elevation = {3}>
            <Paper variant='outlined'align="center" sx={{padding: "15px"}}>
              <Typography variant="h6" noWrap component="div" align='center'>
                {props.course}
              </Typography>
            </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ height: '100%', display: 'flex' }}>
      <Grid item sx={{display: {xs: "none", md : "block"}, flex: 1, height: "100%"}} md={2}>
          <Paper variant='outlined' sx={{padding: "15px", display: "flex", marginTop:"10px", height : "100%", justifyContent: "space-evenly", alignItems: "center"}}>
            <List>
                <Link to="/course/dashboard" style={{textDecoration: "none",color: "#000000"}}>
                <ListItem key="Home" disablePadding sx={{margin: "5px"}}>
                  <ListItemButton sx={{ textAlign: "center" }} selected={props.value === 'Home'}>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
                <Divider/>
                </Link>
                <Link to="/course/syllabus" style={{textDecoration: "none",color: "#000000"}}>
                <ListItem key="Syllabus" disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }} selected={props.value === 'Syllabus'}>
                    <ListItemText primary="Syllabus" />
                  </ListItemButton>
                </ListItem>
                </Link>
                <Divider/>
                <Link to="/course/modules" style={{textDecoration: "none",color: "#000000"}}>
                <ListItem key="Modules" disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }} selected={props.value === 'Modules'}>
                    <ListItemText primary="Modules" />
                  </ListItemButton>
                </ListItem>
                </Link>
                <Divider/>
                <ListItem key="Assignments" disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }} selected={props.value === 'Assignments'}>
                    <ListItemText primary="Assignments" />
                  </ListItemButton>
                </ListItem>
                <Divider/>
                <ListItem key="Grades" disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }} selected={props.value === 'Grades'}>
                    <ListItemText primary="Grades" />
                  </ListItemButton>
                </ListItem>
                <Divider/>
                <ListItem key="Discussion" disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }} selected={props.value === 'Discussion'}>
                    <ListItemText primary="Discussion" />
                  </ListItemButton>
                </ListItem>
                <Divider/>
                <Link to="/course/people" style={{textDecoration: "none",color: "#000000"}}>
                <ListItem key="People" disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }} selected={props.value === 'People'}>
                    <ListItemText primary="People" />
                  </ListItemButton>
                </ListItem>
                </Link>
                <Divider/>
              </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={10}>
          {props.content}
        </Grid>
        
      </Grid>
      
    </Box>
  );
}
