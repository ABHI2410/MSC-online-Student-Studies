import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function PositionedSnackbar(props) {
  const [state, setState] = useState({
    open: props.open,
    vertical: 'bottom',
    horizontal: 'right',
  });
  useEffect(() => {
    setState({ ...state, open: props.open });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { vertical, horizontal } = state;
  console.log(props,state)
  const handleClose = () => {
    setState({ ...state, open: false });
    props.onClose();
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
    <Box sx={{ width: 500 }} id="snackbar">
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={props.open} autoHideDuration={6000} action={action}>
        <Alert onClose={handleClose} severity= {props.status} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
        </Snackbar>
    </Box>
  );
}