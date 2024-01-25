import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Modals/login";
import Register from "./Modals/register";
import ForgotPWD from "./Modals/forgotpassword";
import EnrolledCourses from "./Modals/enrolledcourses";
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
import AssignmentDetailsList from "./Modals/AssignemntSubmissionList.js";
import CourseModuleView from "./Modals/coursemoduleview.js";
import CreateAssignment from "./Modals/createassignment.js";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/forgotPassword">
          <ForgotPWD />
        </Route>
        <Route path="/courseList">
          <EnrolledCourses />
        </Route>
        <Route path="/course/:courseId/dashboard">
          <CourseDashboard />
        </Route>
        <Route path="/course/:courseId/syllabus">
          <CourseSyllabus />
        </Route>
        <Route path="/course/:courseId/modules">
          <CourseModules />
        </Route>
        <Route path="/modules/:moduleId">
          <CourseModuleView />
        </Route>
        <Route path="/course/:courseId/people">
          <CoursePeople />
        </Route>
        <Route path="/createcourse">
          <CreateCourses />
        </Route>
        <Route path="/createprogram">
          <CreateProgram />
        </Route>
        <Route path="/registrationcode">
          <RegistrationCode />
        </Route>
        <Route path="/course/:courseId/chatbox">
          <ChatBox />
        </Route>
        <Route path="/course/:courseId/grade">
          <GradePage />
        </Route>
        <Route path="/course/:courseId/assignment">
          <AssignmentPage />
        </Route>
        <Route path="/course/:courseId/createAssignment">
          <CreateAssignment />
        </Route>
        <Route path="/assignment/:assignId">
          <AssignmentDetails />
        </Route>
        <Route path="/assignmentlist/:assignId">
          <AssignmentDetailsList />
        </Route>
      </Switch>
    </Router>
  );
};
