import React, { useState } from "react";
import ResponsiveAppBar from "../Components/header";
import ClippedDrawer from "../Components/cousenavbar";
import ListItemText from "@mui/material/ListItemText";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
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
import { format, utcToZonedTime } from "date-fns-tz";

export function DetailofAssignment() {
  const rectangle = (
    <Box component="span">
      <Typography variant="h4" color="text">
        80/100
      </Typography>
    </Box>
  );
  const fileTypes = ["DOC", "DOCX", "PDF"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <Box container sx={{ padding: "20px" }}>
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
              Assignment Name
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="body2" color="text" sx={{ paddingLeft: "20px" }}>
        Due Date
      </Typography>
      <Box minHeight={"200px"}>
        <Typography
          variant="body"
          color="text"
          sx={{ padding: "20px", minHeight: "200px" }}
        >
          Assignment Details
        </Typography>
      </Box>

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
    </Box>
  );
}
function Courses() {
  return (
    <ClippedDrawer
      content={[<DetailofAssignment key="content" />]}
      course={"Web Data Mangement"}
      value={"Assignment"}
    />
  );
}

function AssignmentDetailsList() {
  return <ResponsiveAppBar content={<Courses />} />;
}

export default AssignmentDetailsList;
