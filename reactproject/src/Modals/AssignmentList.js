import * as React from "react";
import ResponsiveAppBar from "../Components/header";
import ClippedDrawer from "../Components/cousenavbar";
import { Box, Paper, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import history from "../history";
import LoginManager from "../Services";
import { format, utcToZonedTime } from "date-fns-tz";

export function AssignmentList(props) {
  console.log(props.data);
  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "flex-end", margin: "20px" }}
      >
        <Link
          to={{
            pathname: `/course/${props.data[0].course.id}/createAssignment`,
          }}
          style={{ textDecoration: "none", color: "#000000" }}
        >
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Create Assignment
          </Button>
        </Link>
      </Stack>
      <Paper variant="outlined" sx={{ marginTop: "20px" }}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {props.data.map((assignment) => (
            <React.Fragment key={assignment.name}>
              <ListItem disablePadding>
                <Link
                  to={{
                    pathname: `/assignment/${assignment.id}`,
                  }}
                  style={{ textDecoration: "none", color: "#000000" }}
                >
                  <ListItemText
                    primary={assignment.name}
                    secondary={format(
                      utcToZonedTime(assignment.dueDate),
                      "yyyy-MM-dd HH:mm:ss a",
                      { timeZone: "America/Chicago" }
                    )}
                    sx={{ padding: "6px 16px" }}
                  />
                </Link>
                <Box sx={{ marginLeft: "auto" }}>
                  <Link
                    to={{
                      pathname: `/assignment/${assignment.id}`,
                    }}
                    style={{
                      textDecoration: "none",
                      color: "#000000",
                    }}
                  >
                    <IconButton
                      edge="end"
                      aria-label="View"
                      sx={{ marginRight: "20px" }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Link>
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

function Courses(props) {
  const [coursesData, setCoursesData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  var renderData = null;
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const loginManager = LoginManager.getLoginManager();
        // console.log(loginManager.constructor.loggedIn);
        if (loginManager.constructor.loggedIn) {
          var url = "/v1/assignment?course_id[eq]=" + props.id;

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
  } else if (!isLoading && coursesData.length !== 0) {
    console.log(coursesData[0].course.name);
    renderData = (
      <ClippedDrawer
        content={[<AssignmentList key="content" data={coursesData} />]}
        course={coursesData[0].course.name}
        value={"Assignment"}
        id={props.id}
      />
    );
  } else {
    renderData = (
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6">Couldnt fetch the content</Typography>
      </Box>
    );
  }

  return <div style={{ height: "100%" }}>{renderData}</div>;
}

function AssignmentPage() {
  const { courseId } = useParams();
  return <ResponsiveAppBar content={<Courses id={courseId} />} />;
}

export default AssignmentPage;
