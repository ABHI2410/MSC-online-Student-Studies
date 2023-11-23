import * as React from "react";
import ResponsiveAppBar from "../Components/header";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import LoginManager from "../Services";
import history from "../history";
import CircularProgress from "@mui/material/CircularProgress";

const columns: GridColDef[] = [
  {
    field: "role",
    headerName: "Role",
    width: 150,
    editable: false,
  },
  {
    field: "code",
    headerName: "Code",
    width: 150,
    editable: false,
  },
  {
    field: "validUntill",
    headerName: "Valid Untill",
    width: 150,
    editable: false,
  },
  {
    field: "name",
    headerName: "Program Name",
    width: 250,
    editable: false,
  },
  {
    field: "type",
    headerName: "Program Type",
    width: 150,
    editable: false,
  },
];

export function CodeData() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const loginManager = LoginManager.getLoginManager();

  React.useEffect(() => {
    const fetchData = async () => {
      console.log("before try");
      try {
        console.log("sending post");
        const response = await loginManager.get("/v1/codes", []);

        setRows(response);
      } catch (error) {
        console.error(error);
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenerateCodes = async () => {
    setLoading(true);
    try {
      const response = await loginManager.post("/v1/codes", []);
      setRows(response); // Corrected typo: setRows instead of setrows
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box sx={{ width: "100%", marginTop: "20px" }}>
      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ marginBottom: "20px" }}
          onClick={handleGenerateCodes}
        >
          Create New Codes
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[15]}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
}

function RegistrationCode() {
  return <ResponsiveAppBar content={<CodeData />} />;
}

export default RegistrationCode;
