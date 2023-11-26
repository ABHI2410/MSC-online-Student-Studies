import React, { useState } from "react";
import ResponsiveAppBar from "../Components/header";
import ClippedDrawer from "../Components/cousenavbar";
import ListItemText from "@mui/material/ListItemText";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import LoginManager from "../Services";
import { format, utcToZonedTime } from "date-fns-tz";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LinearProgress from "@mui/material/LinearProgress";
import history from "../history";
import { Select, MenuItem, InputLabel } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

export function DetailofAssignment(props) {
  console.log(props);
  const rectangle = (
    <Box component="span">
      <Typography variant="h4" color="text">
        -/100
      </Typography>
    </Box>
  );
  const fileTypes = ["DOC", "DOCX", "PDF"];
  const [blobfile, setBlobFile] = useState(null);
  const [file, setFile] = useState(null);
  const handleFile = (file) => {
    setFile(file);
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
  const handleSubmit = async () => {
    try {
        const loginManager = LoginManager.getLoginManager();
      // console.log(loginManager.constructor.loggedIn);
      if (loginManager.constructor.loggedIn) {
        var url = "http://127.0.0.1:8000/api/v1/files/" + props.data.files;

        const response = await loginManager.get(url, []);
        setBlobFile(window.URL.createObjectURL(response));
    }
  }
  const onDownloadClick = async () => {
    try {
      const loginManager = LoginManager.getLoginManager();
      // console.log(loginManager.constructor.loggedIn);
      if (loginManager.constructor.loggedIn) {
        var url = "http://127.0.0.1:8000/api/v1/files/" + props.data.files;

        const response = await loginManager.get(url, []);
        setBlobFile(window.URL.createObjectURL(response));
      } else {
        history.push("./login");
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
    let alink = document.createElement("a");
    alink.href = blobfile;
    alink.download = props.data.files.split("/").pop();
    alink.click();
  };
  return (
    <Box sx={{ padding: "20px" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "flex-end", margin: "20px" }}
      >
        <Button variant="contained" color="primary">
          Modify
        </Button>
      </Stack>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" color="text" sx={{ padding: "20px" }}>
              {props.data.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack
              spacing={3}
              direction="row"
              sx={{ justifyContent: "flex-end", margin: "20px" }}
            >
              <Badge
                color="secondary"
                badgeContent={<EditIcon sx={{ padding: "5px" }} />}
                sx={{ padding: "2px" }}
              >
                {rectangle}
              </Badge>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="body2" color="text" sx={{ paddingLeft: "20px" }}>
        Due Date:{" "}
        {format(utcToZonedTime(props.data.dueDate), "yyyy-MM-dd HH:mm:ss a", {
          timeZone: "America/Chicago",
        })}
      </Typography>
      <Box minHeight={"200px"}>
        <Typography
          variant="body"
          color="text"
          sx={{ padding: "20px", minHeight: "200px" }}
        >
          {props.data.description}
        </Typography>
        <Grid xs={6} md={4} lg={3} sx={{ marginTop: "16px" }}>
          <Paper variant="outlined">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AttachFileIcon sx={{ margin: "10px" }} />
              <Divider orientation="vertical" flexItem />
              <Typography sx={{ margin: "0px 10px" }}>
                {props.data.files.split("/")[2]}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <DownloadIcon
                sx={{ margin: "10px" }}
                onClick={() => onDownloadClick()}
              />
            </Box>
          </Paper>
        </Grid>
      </Box>

      <Paper
        variant="outlined"
        minHeight={"200px"}
        sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}
      >
        <Grid container spacing={2} minHeight={"200px"}>
          <Grid item xs={12} sm={6}>
            <ListItemText
              id={"FileName"}
              primary={file?.name}
              sx={{ padding: "6px 16px" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Grid item xs={12} sm={6}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput onChange={handleFile} type="file" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "flex-end", margin: "20px" }}
      >
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
function Courses(props) {
  const [model, setModel] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  var renderData = null;
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const loginManager = LoginManager.getLoginManager();
        var url = "/v1/assignment?id[eq]=" + props.id;

        const response = await loginManager.get(url, []);
        // console.log(response);
        setModel(response);
      } catch (error) {
        console.error(error);
        // Handle error
      } finally {
        setIsLoading(false);
        // console.log(coursesData);
      }
    };

    fetchData();
  }, [props.id]);
  if (isLoading) {
    renderData = (
      <Box sx={{ width: "100%", paddingTop: "20px" }}>
        <LinearProgress />
      </Box>
    );
  } else if (!isLoading && model.length === 0) {
    renderData = (
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6">Course Data Not Found</Typography>
      </Box>
    );
  } else if (!isLoading && model.length !== 0) {
    // console.log(model[0].course.name);
    renderData = (
      <ClippedDrawer
        content={[<DetailofAssignment key="content" data={model[0]} />]}
        course={model[0].course.name}
        value={"Module"}
        id={props.id}
      />
    );
  } else {
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h6">Content Could Not be loaded</Typography>
    </Box>;
  }
  return (
    // <ClippedDrawer
    //   content={[<DetailofAssignment key="content" data={model.data[0]} />]}
    //   course={"Web Data Mangement"}
    //   value={"Assignment"}
    //   id={model.data[0].course_id}
    // />
    <div>{renderData}</div>
  );
}

function AssignmentDetails() {
  const { assignId } = useParams();
  return <ResponsiveAppBar content={<Courses id={assignId} />} />;
}

export default AssignmentDetails;
