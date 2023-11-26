import * as React from "react";
import ResponsiveAppBar from "../Components/header";
import ClippedDrawer from "../Components/cousenavbar";
import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import { FocusTrap } from "@mui/base/FocusTrap";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { InputLabel } from "@mui/material";
import ModalUnstyled from "../Components/Model";
import { useState, useEffect } from "react";
import LoginManager from "../Services";
import history from "../history";

export function CheckboxList(props) {
  const [fileData, setFileData] = useState(null);
  const [blobFile, setBlobFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  var renderData = null;
  const onDeleteClick = async (id) => {
    try {
      const loginManager = LoginManager.getLoginManager();
      // console.log(loginManager.constructor.loggedIn);
      if (loginManager.constructor.loggedIn) {
        var url = "http://127.0.0.1:8000/api/v1/modules/id[eq]=" + id;

        const response = await loginManager.delete(url, []);
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
  const onDownloadClick = async (path) => {
    try {
      const loginManager = LoginManager.getLoginManager();
      // console.log(loginManager.constructor.loggedIn);
      if (loginManager.constructor.loggedIn) {
        var url = "http://127.0.0.1:8000/api/v1/files/" + path;

        const response = await loginManager.get(url, []);
        setBlobFile(window.URL.createObjectURL(response));
      } else {
        history.push("./login");
      }
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      setIsLoading(false);
    }

    // Setting various property values
    let alink = document.createElement("a");
    alink.href = blobFile;
    alink.download = path.split("/").pop();
    alink.click();
  };
  console.log(props.chapters);
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {props.chapters.map((chapter) => (
        <React.Fragment key={chapter.id}>
          <ListItem
            secondaryAction={
              <Box>
                <IconButton
                  edge="end"
                  aria-label="Download"
                  onClick={() => onDownloadClick(chapter.location)}
                >
                  <DownloadIcon sx={{ margin: "5px" }} />
                </IconButton>
                <Link
                  to={{
                    pathname: `/modules/${chapter.id}`,
                  }}
                  style={{ textDecoration: "none", color: "#000000" }}
                >
                  <IconButton edge="end" aria-label="View">
                    <VisibilityIcon sx={{ margin: "5px" }} />
                  </IconButton>
                </Link>
                <IconButton
                  edge="end"
                  aria-label="View"
                  onClick={() => onDeleteClick(chapter.id)}
                >
                  <DeleteIcon sx={{ margin: "5px" }} />
                </IconButton>
              </Box>
            }
            disablePadding
          >
            <ListItemButton role={undefined}>
              <ListItemText id={chapter.id} primary={chapter.name} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}

export function Detailofcontent(props) {
  const [open, setOpen] = React.useState(false);
  const [file, setfile] = React.useState();
  const handleFile = (event) => {
    setfile(event.target.files[0]);
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
  const [model, setModel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const loginManager = LoginManager.getLoginManager();
        var url = "/v1/modules?course_id[eq]=" + props.id;

        const response = await loginManager.get(url, []);
        var sectionDict = {};
        response.data.map((items) => {
          const { id, name, description, section, location } = items;

          if (sectionDict.hasOwnProperty(section)) {
            sectionDict[section].push(items);
          } else {
            sectionDict[section] = [items];
          }
        });
        setModel(sectionDict);
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

  return (
    <Box sx={{ padding: "20px" }}>
      {Object.entries(model).map(([sectionName, chapters]) => (
        <Accordion key={sectionName} expanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${sectionName}-content`}
            id={`panel-${sectionName}-header`}
          >
            <Typography sx={{ padding: "6px 16px" }}>{sectionName}</Typography>
            <ModalUnstyled
              name="Add Chapter"
              isprimary={false}
              id={props.id}
              section={sectionName}
            />
          </AccordionSummary>
          <AccordionDetails>
            <CheckboxList chapters={chapters} />
          </AccordionDetails>
        </Accordion>
      ))}
      <Box style={{ textAlign: "center", marginTop: "10px" }}>
        <ModalUnstyled name="Add Section" isprimary={true} id={props.id} />
      </Box>
    </Box>
  );
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
          var url = "/v1/courses/" + props.id;

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
  }, [props.id]);
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
        content={[<Detailofcontent key="content" id={props.id} />]}
        course={coursesData.data.name}
        value={"Module"}
        id={props.id}
      />
    );
  }
  return <div>{renderData}</div>;
}

function CourseModules() {
  const { courseId } = useParams();
  return <ResponsiveAppBar content={<Courses id={courseId} />} />;
}

export default CourseModules;
