import * as React from 'react';
import ResponsiveAppBar from '../Components/header'
import ClippedDrawer from '../Components/cousenavbar';
import { Box, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
export function CheckboxList() {

    return (
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem
              secondaryAction={
                <Box container>
                <IconButton edge="end" aria-label="Download">
                  <DownloadIcon sx={{margin: "5px"}} />
                </IconButton>
                <IconButton edge="end" aria-label="View">
                  <VisibilityIcon sx={{margin: "5px"}} />
                </IconButton>
                </Box>
              }
              disablePadding
            >
              <ListItemButton role={undefined}>
                <ListItemText id={"ChapterPresentation.ppt"} primary={"ChapterPresentation.ppt"} />
              </ListItemButton>
              <Divider variant="inset" component="li" />
            </ListItem>
            <Divider/>

            <ListItem
              secondaryAction={
                <Box container>
                <IconButton edge="end" aria-label="Download">
                  <DownloadIcon sx={{margin: "5px"}}/>
                </IconButton>
                <IconButton edge="end" aria-label="View">
                  <VisibilityIcon sx={{margin: "5px"}} />
                </IconButton>
                </Box>
              }
              disablePadding
            >
              <ListItemButton role={undefined}>
                <ListItemText id={"ChapterVideo.mp4"} primary={"ChapterVideo.mp4"} />
              </ListItemButton>
              <Divider variant="inset" component="li" />
            </ListItem>
            <Divider/>

            <ListItem
              secondaryAction={
                <Box container>
                <IconButton edge="end" aria-label="Download">
                  <DownloadIcon sx={{margin: "5px"}}/>
                </IconButton>
                <IconButton edge="end" aria-label="View">
                  <VisibilityIcon sx={{margin: "5px"}} />
                </IconButton>
                </Box>
              }
              disablePadding
            >
              <ListItemButton role={undefined}>
                <ListItemText id={"ChapterLectureNotes.pdf"} primary={"ChapterLectureNotes.pdf"} />
              </ListItemButton>
              <Divider variant="inset" component="li" />
            </ListItem>
            <Divider/>
      </List>
    );
  }
  export function Detailofcontent(){
    return(
        <Box container sx={{padding: "20px"}}>
            <Accordion defaultExpanded>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                  <Typography sx={{padding:"6px 16px"}}>Chapter 1</Typography>
                  <Button variant="Text" sx={{marginLeft:"auto"}}>Add Chapter</Button>
                </AccordionSummary>
                <AccordionDetails>
                    <CheckboxList/>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>Chapter 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CheckboxList/>
                </AccordionDetails>
            </Accordion>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <Link to='/'>
                <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                >
                    Add Section
                </Button>
            </Link>
            </div>
        </Box>
    )
  }
  function Courses() {
    return (
        <ClippedDrawer content ={[<Detailofcontent key="content"/>]} course={"Web Data Mangement"} value = {"Modules"}/>
      
    );
  }
  
  
function CourseModules() {
  return (
    <ResponsiveAppBar content={<Courses />} />
    
  );
}

export default CourseModules;