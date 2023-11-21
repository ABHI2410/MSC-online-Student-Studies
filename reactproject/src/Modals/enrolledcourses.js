import * as React from "react";
import logo from "../images/MSC-logos_white.png";
import ImgMediaCard from "../Components/cardwithimg";
import ResponsiveAppBar from "../Components/header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import LoginManager from "../Services";
import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";

function Courses() {
  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let enrollmentButton = null;
  let createCourseButton = null;
  let createProgramButton = null;
  var courseCards = "";
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const loginManager = LoginManager.getLoginManager();
        var url =
          "/v1/usercourse?customerId[eq]=" +
          localStorage.getItem("LoginManager.id");

        const response = await loginManager.get(url, []);

        setCoursesData(response);
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
    courseCards = (
      <Box sx={{ width: "100%", paddingTop: "20px" }}>
        <LinearProgress />
      </Box>
    );
  } else if (!isLoading && coursesData.length === 0) {
    courseCards = (
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6">Not enrolled in any course.</Typography>
      </Box>
    );
    if (localStorage.getItem("LoginManager.role") === "Student") {
      enrollmentButton = (
        <Link to="/">
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Enroll Course
          </Button>
        </Link>
      );
    }
    if (localStorage.getItem("LoginManager.role") === "Instructor") {
      createCourseButton = (
        <Link to="/createcourse">
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Create Course
          </Button>
        </Link>
      );
    }

    if (localStorage.getItem("LoginManager.role") === "Program Coordinator") {
      createProgramButton = (
        <Link to="/createprogram">
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Create Program
          </Button>
        </Link>
      );
    }
  } else if (!isLoading && coursesData.length !== 0) {
    courseCards = coursesData.map((coursesData, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Link
          to={{
            pathname: `/course/${coursesData.course.id}/dashboard`,
          }}
          style={{ textDecoration: "none", color: "#000000" }}
        >
          <ImgMediaCard
            ImgUrl={logo}
            Name={coursesData.course.name}
            Detail1={coursesData.course.day}
            Detail2={
              coursesData.course.timeStart + "-" + coursesData.course.timeEnd
            }
            Detail3={
              coursesData.customer.lastName +
              "," +
              coursesData.customer.firstName
            }
          />
        </Link>
      </Grid>
    ));
    if (localStorage.getItem("LoginManager.role") === "Student") {
      enrollmentButton = (
        <Link to="/">
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Enroll Course
          </Button>
        </Link>
      );
    }
    if (localStorage.getItem("LoginManager.role") === "Instructor") {
      createCourseButton = (
        <Link to="/createcourse">
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Create Course
          </Button>
        </Link>
      );
    }

    if (localStorage.getItem("LoginManager.role") === "Program Coordinator") {
      createProgramButton = (
        <Link to="/createprogram">
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Create Program
          </Button>
        </Link>
      );
    }
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "flex-end" }}
            >
              {enrollmentButton}
              {createCourseButton}
              {createProgramButton}
            </Stack>
          </Typography>
        </Grid>
        {courseCards}
      </Grid>
    </Box>
  );
}

function EnrolledCourses() {
  return <ResponsiveAppBar content={<Courses />} />;
}

export default EnrolledCourses;
