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
import LinearProgress from "@mui/material/LinearProgress";

export function Detailofcontent(props) {
  const [isLoading, setIsLoading] = useState(true);
  var renderData = null;
  const courseId = props.id;
  var coursesData = props.data;

  const convertTo12HourFormat = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");

    let formattedHours = parseInt(hours, 10);
    let period = "AM";

    if (formattedHours === 0) {
      formattedHours = 12;
    } else if (formattedHours === 12) {
      period = "PM";
    } else if (formattedHours > 12) {
      formattedHours -= 12;
      period = "PM";
    }

    return `${formattedHours}:${minutes} ${period}`;
  };

  const mapToShortNames = (day) => {
    const daysMapping = {
      Sunday: "Sun",
      Monday: "Mon",
      Tuesday: "Tue",
      Wednesday: "Wed",
      Thursday: "Thur",
      Friday: "Fri",
      Saturday: "Sat",
    };

    return daysMapping[day] || day;
  };

  return (
    <Box sx={{ padding: "20px", marginTop: { lg: "30px" } }}>
      <Grid container rowSpacing={3} sx={{ marginBottom: "20px" }}>
        <Grid item xs={6}>
          <Typography variant="h6" color="text.secondary">
            Instructor Name:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" color="text.secondary">
            {coursesData.data.instructor.firstName}{" "}
            {coursesData.data.instructor.lastName}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" color="text.secondary">
            Class Timmings:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" color="text.secondary">
            {coursesData.data.day
              .split(",")
              .map((day) => mapToShortNames(day.trim()))
              .join(", ")}{" "}
            {convertTo12HourFormat(coursesData.data.timeStart)} -{" "}
            {convertTo12HourFormat(coursesData.data.timeEnd)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" color="text.secondary">
            Meeting Location:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" color="text.secondary">
            {coursesData.data.location}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" color="text.secondary">
            Mode of Delivery:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" color="text.secondary">
            {coursesData.data.mode}
          </Typography>
        </Grid>
      </Grid>

      <Divider />
      <Grid item xs={12} sx={{ padding: "10px" }}>
        <Typography variant="body2" color="text.secondary">
          Recommended Textboox: {coursesData.data.textbook}
        </Typography>
      </Grid>
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
        course={coursesData.data.name}
        value={"Home"}
        id={props.id}
      />
    );
  }

  return <div>{renderData}</div>;
}

function CourseDashboard() {
  const { courseId } = useParams();

  return <ResponsiveAppBar content={<Courses id={courseId} />} />;
}

export default CourseDashboard;
