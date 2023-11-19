import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';

const StyledCardMedia = styled(CardMedia)(
  ({ theme }) => ({
    position: 'relative',
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.9)', // Adjust the alpha (fourth) value to control opacity
    },
  })
);
function ImgMediaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <StyledCardMedia
        component="img"
        height="140"
        image={props.ImgUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.Detail1}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.Detail2}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.Detail3}
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent: 'flex-end'}}>
        <IconButton aria-label="assignments">
            <AssignmentIcon />
        </IconButton>
        <IconButton aria-label="discussion">
            <ChatIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ImgMediaCard;