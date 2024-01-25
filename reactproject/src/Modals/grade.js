import React from 'react';
import ResponsiveAppBar from '../Components/header'
import ClippedDrawer from '../Components/cousenavbar';
import { createTheme, ThemeProvider,useMediaQuery} from '@mui/material';
  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import Paper from '@mui/material/Paper';

const theme = createTheme();

function createData(name, due, grade, comment) {
  return { name, due, grade, comment };
}

const rows = [
  createData('Exam 1', '11/28/2023 10pm', '60/100', 'Better luck Next time'),
];
export function Grade() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper} sx={{ marginTop:"20px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Due Date</TableCell>
            <TableCell align="center">Grade</TableCell>
            <TableCell align="center">Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.due}</TableCell>
              <TableCell align="center">{row.grade}</TableCell>
              <TableCell align="center">{row.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider>
  );
}

function Courses() {
    return (
        <ClippedDrawer content ={[<Grade key="content"/>]} course={"Web Data Mangement"} value = {"Grade"}/>
      
    );
  }
  
  
function GradePage() {
  return (
    <ResponsiveAppBar content={<Courses />} />
    
  );
}

export default GradePage;