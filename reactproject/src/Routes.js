import { BrowserRouter as Router, Switch, Route  } from "react-router-dom"
import Login from "./Modals/login";
import Register from "./Modals/register";
import ForgotPWD from "./Modals/forgotpassword";
import EnrolledCourses from './Modals/enrolledcourses';
import CourseDashboard from "./Modals/coursedashboard";
import CourseSyllabus from "./Modals/coursesyllabus";
import CourseModules from "./Modals/coursemodules";
import CoursePeople from "./Modals/coursePeople";
import CreateCourses from "./Modals/createcourses";
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
                <Route path="/course/dashboard">
                    <CourseDashboard/>
                </Route>
                <Route path="/course/syllabus">
                    <CourseSyllabus/>
                </Route>
                <Route path="/course/modules">
                    <CourseModules/>
                </Route>
                <Route path="/course/people">
                    <CoursePeople/>
                </Route>
                <Route path="/createcourse">
                    <CreateCourses/>
                </Route>
            </Switch>
        </Router>
    );
}