import React from 'react'
import TextField from '@mui/material/TextField';
import { styled,Theme } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';



const useStyles = styled((theme: Theme) =>
  ({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "95%",
    },
    wrapText  : {
        width: "100%"
    },
    button: {
        //margin: theme.spacing(1),
    },
  })
);


export default function TextInput() {
    const classes = useStyles();
    return (
        <>
            <form className={classes.wrapForm}  noValidate autoComplete="off">
            <TextField
                id="standard-text"
                label="メッセージを入力"
                className={classes.wrapText}
                //margin="normal"
            />
            <Button variant="contained" color="primary" className={classes.button}>
                <SendIcon />
            </Button>
            </form>
        </>
    )
}



