import * as React from "react";
import ResponsiveAppBar from "../Components/header";
import ClippedDrawer from "../Components/cousenavbar";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import LoginManager from "../Services";
import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import history from "../history";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: false,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: false,
  },
  {
    field: "erolled_type",
    headerName: "Role",
    width: 160,
    editable: false,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: false,
    width: 160,
  },
];

const rows = [];

export function PeopleData(props) {
  console.log(props);
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const loginManager = LoginManager.getLoginManager();
        var url = "/v1/usercourse?courseId[eq]=" + props.id;

        const response = await loginManager.get(url, []);

        setRows(response);
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
  const transformedData = rows.map((item) => ({
    ...item,
    firstName: item.customer.firstName,
    lastName: item.customer.lastName,
    email: item.customer.emailID,
  }));
  return (
    <Box sx={{ width: "100%", marginTop: "20px" }}>
      <DataGrid
        rows={transformedData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
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
        content={[<PeopleData key="content" id={props.id} />]}
        course={coursesData.data.name}
        value={"People"}
        id={props.id}
      />
    );
  }
  return <div>{renderData}</div>;
}

function CoursePeople() {
  const { courseId } = useParams();
  return <ResponsiveAppBar content={<Courses id={courseId} />} />;
}

export default CoursePeople;
