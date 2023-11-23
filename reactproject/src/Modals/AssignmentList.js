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
export function AssignmentList(props) {
  return (
    <diV>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "flex-end", margin: "20px" }}
      >
        <Link
          to={{
            pathname: `/course/${props.id}/assignmentcreate`,
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
          <ListItem
            secondaryAction={
              <Box container>
                <IconButton edge="end" aria-label="Download">
                  <DownloadIcon sx={{ margin: "5px" }} />
                </IconButton>
                <IconButton edge="end" aria-label="View">
                  <VisibilityIcon sx={{ margin: "5px" }} />
                </IconButton>
              </Box>
            }
            disablePadding
          >
            <ListItemText
              id={"Assignment 1"}
              primary={"Assignment 1"}
              sx={{ padding: "6px 16px" }}
            />
            <ListItemText
              id={"Due:11/28/2023 10pm"}
              primary={"Due:11/28/2023 10pm"}
            />
            <Divider variant="inset" component="li" />
          </ListItem>
          <Divider />

          <ListItem
            secondaryAction={
              <Box container>
                <IconButton edge="end" aria-label="Download">
                  <DownloadIcon sx={{ margin: "5px" }} />
                </IconButton>
                <IconButton edge="end" aria-label="View">
                  <VisibilityIcon sx={{ margin: "5px" }} />
                </IconButton>
              </Box>
            }
            disablePadding
          >
            <ListItemText
              id={"Assignment 2"}
              primary={"Assignment 2"}
              sx={{ padding: "6px 16px" }}
            />
            <ListItemText
              id={"Due:11/28/2023 10pm"}
              primary={"Due:11/28/2023 10pm"}
            />
            <Divider variant="inset" component="li" />
          </ListItem>
          <Divider />

          <ListItem
            secondaryAction={
              <Box container>
                <IconButton edge="end" aria-label="Download">
                  <DownloadIcon sx={{ margin: "5px" }} />
                </IconButton>
                <IconButton edge="end" aria-label="View">
                  <VisibilityIcon sx={{ margin: "5px" }} />
                </IconButton>
              </Box>
            }
            disablePadding
          >
            <ListItemText
              id={"Assignment 3"}
              primary={"Assignment 3"}
              sx={{ padding: "6px 16px" }}
            />
            <ListItemText
              id={"Due:11/28/2023 10pm"}
              primary={"Due:11/28/2023 10pm"}
            />
            <Divider variant="inset" component="li" />
          </ListItem>
        </List>
      </Paper>
    </diV>
  );
}

function Courses(props) {
  return (
    <ClippedDrawer
      content={[<AssignmentList key="content" id={props.id} />]}
      course={"Web Data Mangement"}
      value={"Assignment"}
      id={props.id}
    />
  );
}

function AssignmentPage() {
  const { courseId } = useParams();
  return <ResponsiveAppBar content={<Courses id={courseId} />} />;
}

export default AssignmentPage;
