import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Enrolment from "../pages/Enrolment";
import Classes from "../pages/Classes";
import Children from "../pages/Children";
import Teachers from "../pages/Teachers";
import Admins from "../pages/Admins";
import Activities from "../pages/Activities";
import Foods from "../pages/Foods";

import Topbar from "./Topbar";
import Confirmation from "../pages/Confirmation";
import News from "../pages/News";
import Search from "../pages/Search";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AddTeacher from "./teacher/AddTeacher";
import EditTeacher from "./teacher/EditTeacher";
import ViewTeacher from "./teacher/ViewTeacher";

import AddAdmin from "./admin/AddAdmin";
import EditAdmin from "./admin/EditAdmin";
import ViewAdmin from "./admin/ViewAdmin";

import AddChild from "./child/AddChild";
import EditChild from "./child/EditChild";
import ViewChild from "./child/ViewChild";

import AddActivity from "./activity/AddActivity";
import EditActivity from "./activity/EditActivity";
import ViewActivity from "./activity/ViewActivity";

import AddFood from "./food/AddFood";
import EditFood from "./food/EditFood";
import ViewFood from "./food/ViewFood";

import DisplayNews from "./news/DisplayNews";
import EnrolmentHome from "./enrolment/EnrolmentHome";

import AddClass from "./classCRUD/AddClass";
import EditClass from "./classCRUD/EditClass";
import ViewClass from "./classCRUD/ViewClass";
import ClassTeachers from "./class/ClassTeachers";
import ClassActivities from "./class/ClassActivities";

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Enrolment" element={<Enrolment />} />
        <Route path="/Enrolled" element={<EnrolmentHome />} />

        <Route path="/Classes" element={<Classes />} />
        <Route path="/Classes/addClass" element={<AddClass />} />
        <Route path="/Classes/editClass/:id" element={<EditClass />} />
        <Route path="/Classes/viewClass/:id" element={<ViewClass />} />
        <Route path="/Classes/teachers/:id" element={<ClassTeachers />} />
        <Route path="/Classes/activities/:id" element={<ClassActivities />} />

        <Route path="/Children" element={<Children />} />
        <Route path="/Child/addChild/:inscriptionId" element={<AddChild />} />
        <Route path="/Child/addChild/" element={<AddChild />} />
        <Route path="/Child/editChild/:id" element={<EditChild />} />
        <Route path="/Child/viewChild/:id" element={<ViewChild />} />

        <Route path="/Teachers" element={<Teachers />} />
        <Route path="/Teachers/addTeacher" element={<AddTeacher />} />
        <Route path="/Teachers/editTeacher/:teacherId" element={<EditTeacher />}/>
        <Route path="/Teachers/viewTeacher/:teacherId" element={<ViewTeacher />}/>

        <Route path="/Activities" element={<Activities />} />
        <Route path="/activity/AddActivity" element={<AddActivity />} />
        <Route path="/activity/EditActivity/:id" element={<EditActivity />} />
        <Route path="/activity/viewActivity/:id" element={<ViewActivity />} />

        <Route path="/Foods" element={<Foods />} />
        <Route path="/food/AddFood" element={<AddFood />} />
        <Route path="/food/EditFood/:id" element={<EditFood />} />
        <Route path="/food/ViewFood/:id" element={<ViewFood />} />

        <Route path="/Admins" element={<Admins />} />
        <Route path="/Admins/addAdmin" element={<AddAdmin />} />
        <Route path="/Admins/editAdmin/:adminId" element={<EditAdmin />} />
        <Route path="/Admins/viewAdmin/:adminId" element={<ViewAdmin />} />

        <Route path="/confirmed" element={<Confirmation />} />
        <Route path="/News" element={<News />} />
        <Route path="/DisplayNews" element={<DisplayNews />} />

        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
