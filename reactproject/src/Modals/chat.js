import React from 'react';
import ResponsiveAppBar from '../Components/header'
import ClippedDrawer from '../Components/cousenavbar';
import { Box, CssBaseline, createTheme, ThemeProvider, Link, Typography, IconButton, Drawer,
  List, ListItem, ListItemText, useMediaQuery, Avatar, TextField, Button } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



const theme = createTheme();

export function SenderMessage(){
    return (
        <div style={{display: 'flex',marginBottom: '10px',textAlign: 'right', padding:"10px 0px"}}>
                        <div style={{flex: '1'}}>
                            <Typography variant="subtitle1">User</Typography>
                            <Typography variant="body1">Hello! How can I help you today?</Typography>
                        </div>
                        <div style={{width: '40px',height: '40px',borderRadius: '50%',marginLeft: '10px'}}>
                            <Avatar/>
                        </div>
                    </div>

    );
}

export function DividerMessage(){
    return (
        <Typography variant="body2" style={{ textAlign: 'center' }}>1 hour ago</Typography>
    );
}
export function RecivedMessage(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <div style={{display: 'flex',marginBottom: '10px', padding:"10px"}}>
                        <div style={{width: '40px',height: '40px',borderRadius: '50%',marginRight: '10px'}}>
                        <Avatar
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        />

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Send Private Message</MenuItem>
                        </Menu>
                        </div>
                        <div style={{flex: '1'}}>
                        <Typography variant="subtitle1">User 2</Typography>
                        <Typography variant="body1">Some message</Typography>
                        
                        </div>
                    </div>

    );
}
export function Chat() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" height="100%" sx={{padding:"0px"}}>


        <Box display="flex" flexDirection="row" flexGrow={1} sx={{padding:"0px"}} >
          
          <Box flexGrow={1} p={2} sx={{padding:"0px"}}>
            {/* Your existing content here */}

            <div className="row" style={{height:"100%", padding:"0px"}}>
              {/* Forum design here */}
              <div style={{backgroundColor: '#f2f2f200',borderRadius: '5px',marginTop: '20px',width: '100%'}}>
                {/* Message List */}
                <div style={{overflowY: 'auto'}}>
                  {/* Individual Messages */}
                    <RecivedMessage/>
                    <DividerMessage/>
                    <SenderMessage/>
                    <SenderMessage/>
                    <SenderMessage/>
                    <RecivedMessage/>
                    <DividerMessage/>
                    <RecivedMessage/>

                    
                  {/* Add more messages as needed */}
                    

                    <Box
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', border:"1px solid grey", borderRadius:"5px" }}
                        >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="New Message"
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SendIcon />
                        </IconButton>
                        </Box>
                </div>

                
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function Courses() {
    return (
        <ClippedDrawer content ={[<Chat key="content"/>]} course={"Web Data Mangement"} value = {"Discussion"}/>
      
    );
  }
  
  
function ChatBox() {
  return (
    <ResponsiveAppBar content={<Courses />} />
    
  );
}

export default ChatBox;