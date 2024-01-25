import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { InputLabel } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import history from "../history";
import LoginManager from "../Services";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function ModalUnstyled(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [CourseData, setCourseData] = useState({
    course_id: props.id,
    name: null,
    section: props.section,
    description: null,
  });
  const [file, setfile] = React.useState();
  const handleFile = (event) => {
    setfile(event.target.files[0]);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCourseData((prevCourseData) => ({
      ...prevCourseData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const loginManager = LoginManager.getLoginManager();

    const errorCallback = (error) => {
      console.error(error);
      // Handle the error, e.g., display an error message
    };

    const callback = (data) => {
      // Handle the successful login, e.g., redirect to another page
      history.push("/courseList");
    };

    let payload = JSON.stringify(CourseData);
    formData.append("payload", payload);
    formData.append("location", file);
    console.log("trying to make a fetch request");

    try {
      // Use await to wait for the response
      let response = await loginManager.post(
        "/v1/modules",
        formData,
        callback,
        errorCallback
      );

      // Check if the response indicates success
      if (response) {
        history.push(`/course/${props.id}/modules`);
        handleClose();
      } else {
        throw new Error("An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <div>
      {props.isprimary ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          {props.name}
        </Button>
      ) : (
        <Button variant="Text" sx={{ marginLeft: "auto" }} onClick={handleOpen}>
          {props.name}
        </Button>
      )}
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={style}>
          <Box component="form" sx={{ mt: 3 }}>
            <IconButton
              aria-label="close"
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={handleClose} // Add your close modal function here
            >
              <CloseIcon />
            </IconButton>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="section"
                  label="Section Name"
                  name="section"
                  autoComplete="Section"
                  onChange={handleInputChange}
                  value={props.section}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Chapter Name"
                  name="name"
                  autoComplete="Chapter"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="mode-label">File</InputLabel>
                <Typography variant="captions" sx={{ paddingRight: "15px" }}>
                  {file?.name}
                </Typography>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput onChange={handleFile} type="file" />
                </Button>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  required
                  fullWidth
                  rows={4}
                  name="description"
                  label="Description"
                  id="description"
                  autoComplete="description"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleSubmit}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </ModalContent>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
};

const ModalContent = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#FFF"};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 4px 12px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.20)"
  };
  padding: 1rem;
  color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;


  & .modal-title {
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
  }
  `
);

const TriggerButton = styled("button")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }
`
);
