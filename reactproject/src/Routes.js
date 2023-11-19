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
import CreateProgram from "./Modals/createprogram";
import RegistrationCode from "./Modals/registrationcode";
import ChatBox from "./Modals/chat.js";
import GradePage from "./Modals/grade.js";
import AssignmentPage from "./Modals/AssignmentList.js";
import AssignmentDetails from "./Modals/AssignemntSubmission.js";

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
                <Route path="/createprogram">
                    <CreateProgram/>
                </Route>
                <Route path="/registrationcode">
                    <RegistrationCode/>
                </Route>
                <Route path="/course/chatbox">
                    <ChatBox/>
                </Route>
                <Route path="/course/grade">
                    <GradePage/>
                </Route>
                <Route path="/course/assignment">
                    <AssignmentPage/>
                </Route>
                <Route path="/course/assignmentdetails">
                    <AssignmentDetails/>
                </Route>
            </Switch>
        </Router>
    );
}