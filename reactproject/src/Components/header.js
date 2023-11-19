import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import MuiAppBar  from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';
import profile from '../images/man.svg';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import PositionedSnackbar from '../Components/snackbar';
import "../CSS/main.css"


const drawerWidth = 100;
const navItems = ['Services','Blog', 'About', 'Contact us'];

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}%`,
    display: 'flex',
    height: "100%", 
    flexDirection: 'column',
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      zIndex:"-1",
      height: "100%",
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}%)`,
    marginLeft: `${drawerWidth}%`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function ResponsiveAppBar({ sbOpen, sbStatus, sbMessage, content}) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [isVisible, setIsVisible] = React.useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Reset the snackbarOpen state to false
  };

  const drawer = (
    <Box sx={{ textAlign: 'center', display: { xs: isVisible ? 'block': 'none', sm: 'none' } }}>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const [snackbarOpen, setSnackbarOpen] = React.useState(sbOpen);
  const snackbarStatus = sbStatus;
  const snackbarMessage = sbMessage;
  return (
    <Box sx={{ display: 'flex', height: "100%" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MSC
          </Typography>
          <Box sx={{marginLeft: 'auto', display: 'flex'}}>
            <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0}} onClick={handleClick}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={profile} style={{border: "1px solid white" }}/>
              </IconButton>  
            </Box>
            <Typography variant="captions" sx={{paddingRight: '15px'}}>
              {sessionStorage.getItem('name')}
            </Typography>
          </Box>
          
        </Toolbar>
        {drawer}
        
      </AppBar>
    <Drawer
      sx={{
        width: "100%",
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: "100%",
          boxSizing: 'border-box',
          overflow: "auto"
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box sx={{background: "linear-gradient(to right, #1976d2, #1976d2 30%, #fff 30%, #fff 100%);", height:"100%"}}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
        <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '55%' }}>
            <ListItem key={'Profile'}>
                <ListItemText primary={'Profile'} primaryTypographyProps={{fontSize: "30px", textAlign: "center"}}/>
            </ListItem>
            <ListItem key={'Courses'}>
                <ListItemText primary={'Courses'} primaryTypographyProps={{fontSize: "30px", textAlign: "center"}}/>
            </ListItem>
            <ListItem key={'Inbox'}>
                <ListItemText primary={'Inbox'} primaryTypographyProps={{fontSize: "30px", textAlign: "center"}}/>
            </ListItem>
            <ListItem key={'Calander'}>
                <ListItemText primary={'Calander'} primaryTypographyProps={{fontSize: "30px", textAlign: "center"}}/>
            </ListItem>
        </List>
        <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '35%' }}>
            <ListItem key={'Privacy Policy'} >
                <ListItemText primary={'Privacy Policy'} primaryTypographyProps={{fontSize: "10px", textAlign: "center"}}/>
            </ListItem>
            <ListItem key={'Help'} >
              <ListItemText primary={'Help'} primaryTypographyProps={{fontSize: "10px", textAlign: "center"}}/>
            </ListItem>
            <ListItem key={'Logout'} >
                <ListItemText primary={'Logout'} primaryTypographyProps={{fontSize: "10px", textAlign: "center"}}/>
            </ListItem>
        </List>
      </Box>      
    </Drawer>
    <Main open={open} >
      <DrawerHeader />
      {content}
    </Main>
    </Box>
  );
}
export default ResponsiveAppBar;
