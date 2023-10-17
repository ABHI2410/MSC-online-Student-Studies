import { BrowserRouter as Router, Switch, Route  } from "react-router-dom"
import Login from "./Components/login";
import Register from "./Components/register";
import ForgotPWD from "./Components/forgotpassword";
import EnrolledCourses from './Components/enrolledcourses'
import CourseDetails from "./Components/coursedashboard";

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/forgotPassword">
                    <ForgotPWD/>
                </Route>
                <Route path="/courseList">
                    <EnrolledCourses/>
                </Route>
                <Route path="/course">
                    <CourseDetails/>
                </Route>
            </Switch>
        </Router>
    );
}