import * as React from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function PositionedSnackbar(props) {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;


  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} action={action}>
        <Alert onClose={handleClose} severity= {props.status} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
        </Snackbar>
    </Box>
  );
}