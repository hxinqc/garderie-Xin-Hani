import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Enrolment from "../pages/Enrolment";
import Classes from "../pages/Classes";
import Children from "../pages/Children";
import Teachers from "../pages/Teachers";
import Admins from "../pages/Admins";
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

import DisplayNews from "./news/DisplayNews";

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Enrolment" element={<Enrolment />} />
        <Route path="/Classes" element={<Classes />} />
        <Route path="/Children" element={<Children />} />
        <Route path="/Child/addChild" element={<AddChild />} />
        <Route path="/Child/editChild/:id" element={<EditChild />} />
        <Route path="/Child/viewChild/:id" element={<ViewChild />} />

        <Route path="/Teachers" element={<Teachers />} />
        <Route path="/Teachers/addTeacher" element={<AddTeacher />} />
        <Route path="/Teachers/editTeacher/:teacherId" element={<EditTeacher />} />
        <Route path="/Teachers/viewTeacher/:teacherId" element={<ViewTeacher />} />
        
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
