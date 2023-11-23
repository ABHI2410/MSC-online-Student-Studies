import * as React from "react";
import ResponsiveAppBar from "../Components/header";
import ClippedDrawer from "../Components/cousenavbar";
import Divider from "@mui/material/Divider";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginManager from "../Services";
import history from "../history";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import IconButton from "@mui/material/IconButton";
import { PdfViewer } from "../Components/filehandling";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FileDownloadButton } from "../Components/filehandling";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export function Detailofcontent(props) {
  const coursesData = props.data.data[0];
  const [fileData, setFileData] = useState(null);
  const [blobFile, setBlobFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  var renderData = null;
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const loginManager = LoginManager.getLoginManager();
        // console.log(loginManager.constructor.loggedIn);
        if (loginManager.constructor.loggedIn) {
          var url =
            "http://127.0.0.1:8000/api/v1/files/" + coursesData.location;

          const response = await loginManager.get(url, []);
          setBlobFile(window.URL.createObjectURL(response));
          setFileData(<PdfViewer PdfUrl={url} />);
        } else {
          history.push("./login");
        }
      } catch (error) {
        console.error(error);
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coursesData.location]);
  const onDownloadClick = () => {
    // Setting various property values
    let alink = document.createElement("a");
    alink.href = blobFile;
    alink.download = coursesData.location.split("/").pop();
    alink.click();
  };

  if (isLoading) {
    renderData = (
      <Box sx={{ width: "100%", paddingTop: "20px" }}>
        <LinearProgress />
      </Box>
    );
  } else if (!isLoading && !fileData) {
    renderData = (
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6">Course Data Not Found</Typography>
      </Box>
    );
  } else {
    renderData = (
      <Box sx={{ padding: "20px", overflowY: "auto" }}>
        <Grid
          container
          item
          xs={12}
          sx={{ padding: "10px" }}
          alignItems="center"
        >
          <Grid item xs={8}>
            <Typography variant="h4" color="text">
              {coursesData.section}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body" color="text">
              {coursesData.description}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <FileDownloadButton
              fileName={coursesData.location.split("/").pop()}
              file={blobFile}
            />
          </Grid>
        </Grid>
        {fileData}
        <Divider />
        <Grid item xs={12} sx={{ padding: "10px" }}>
          <Typography variant="body2" color="text.secondary">
            Section:{coursesData.section}
          </Typography>
        </Grid>
      </Box>
    );
  }
  return <div>{renderData}</div>;
}
function Courses(props) {
  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  var renderData = null;
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const loginManager = LoginManager.getLoginManager();
        // console.log(loginManager.constructor.loggedIn);
        if (loginManager.constructor.loggedIn) {
          var url = "/v1/modules?id[eq]=" + props.id;

          const response = await loginManager.get(url, []);

          setCoursesData(response);
        } else {
          history.push("./login");
        }
      } catch (error) {
        console.error(error);
        // Handle error
      } finally {
        setIsLoading(false);
        // console.log(coursesData);
      }
    };

    fetchData();
  }, []);
  if (isLoading) {
    renderData = (
      <Box sx={{ width: "100%", paddingTop: "20px" }}>
        <LinearProgress />
      </Box>
    );
  } else if (!isLoading && coursesData.length === 0) {
    renderData = (
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6">Course Data Not Found</Typography>
      </Box>
    );
  } else {
    renderData = (
      <ClippedDrawer
        content={[<Detailofcontent key="content" data={coursesData} />]}
        course={"Web Data Mangement"}
        value={"Modules"}
        id={props.id}
      />
    );
  }

  return <div style={{ height: "100%" }}>{renderData}</div>;
}

function CourseModuleView() {
  const { moduleId } = useParams();
  console.log(moduleId);
  return <ResponsiveAppBar content={<Courses id={moduleId} />} />;
}

export default CourseModuleView;
