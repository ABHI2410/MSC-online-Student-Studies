import * as React from "react";
import ResponsiveAppBar from "../Components/header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Select, MenuItem, InputLabel } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoginManager from "../Services";
import Autocomplete from "@mui/material/Autocomplete";
import LinearProgress from "@mui/material/LinearProgress";
import history from "../history";
import ClippedDrawer from "../Components/cousenavbar";
import { useParams } from "react-router-dom";

function AssignmentCreate(props) {
  const history = useHistory();
  const [CourseData, setCourseData] = useState({
    name: null,
    dueDate: null,
    availableFrom: null,
    availableUntill: null,
    description: null,
    course_id: props.id,
  });
  const [dueDate, setDueDate] = React.useState(null);
  const [availableFrom, setAvailableFrom] = React.useState(null);
  const [availableUntill, setAvailableUntill] = React.useState(null);
  const [file, setfile] = React.useState();

  const handleFile = (event) => {
    setfile(event.target.files[0]);
  };

  const hadleDueDateChange = (date) => {
    setDueDate(date);
    setCourseData((prevCourseData) => ({
      ...prevCourseData,
      dueDate: date,
    }));
  };
  const hadleAvailableFromDateChange = (date) => {
    setAvailableFrom(date);
    setCourseData((prevCourseData) => ({
      ...prevCourseData,
      availableFrom: date,
    }));
  };

  const hadleAvailableUntillDateChange = (date) => {
    setAvailableUntill(date);
    setCourseData((prevCourseData) => ({
      ...prevCourseData,
      availableUntill: date,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCourseData((prevCourseData) => ({
      ...prevCourseData,
      [name]: value,
    }));
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
    console.log(payload);
    formData.append("payload", payload);
    formData.append("files", file);
    console.log("trying to make a fetch request");
    let response = loginManager.post(
      "/v1/assignment",
      formData,
      callback,
      errorCallback
    );
    if (response) {
      history.push(`/course/${props.id}/assignment`);
    } else {
      throw new Error("AN error occured");
    }
  };

  const [program, setProgram] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const loginManager = LoginManager.getLoginManager();
        const response = await loginManager.get("/v1/program", []);
        // const extractedData = response.data.map(label: name,id:);
        const transformedData = response.data.map(({ id, name, type }) => ({
          id,
          label: name + "-" + type,
        }));
        setProgram(transformedData);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        padding: 0,
      },
    },
  };

  return (
    <Container maxWidth="md">
      <Box component="form" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="Name"
              label="Assignment Name"
              name="name"
              autoComplete="Course-name"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due Date"
                id="dueDate"
                name="dueDate"
                value={dueDate}
                onChange={hadleDueDateChange}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Available From"
                id="availableFrom"
                name="availableFrom"
                value={availableFrom}
                onChange={hadleAvailableFromDateChange}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Available Untill"
                id="availableUntill"
                name="availableUntill"
                value={availableUntill}
                onChange={hadleAvailableUntillDateChange}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
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

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="gradePoints"
              label="Points"
              id="gradePoints"
              autoComplete="gradePoints"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="mode-label">Syllabus</InputLabel>
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

          <Box
            ml={"auto"}
            mr={"auto"}
            paddingBottom={"25px"}
            marginTop={"20px"}
          >
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Create Course
            </Button>
          </Box>
        </Grid>
      </Box>
    </Container>
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
  console.log(coursesData);
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
        content={[
          <AssignmentCreate key="content" data={coursesData} id={props.id} />,
        ]}
        course={coursesData.data.name}
        value={"Assignment"}
        id={props.id}
      />
    );
  }

  return <div style={{ height: "100%" }}>{renderData}</div>;
}

function CreateAssignment() {
  const { courseId } = useParams();
  console.log(courseId);
  return <ResponsiveAppBar content={<Courses id={courseId} />} />;
}

export default CreateAssignment;
