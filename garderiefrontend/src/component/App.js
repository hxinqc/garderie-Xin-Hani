import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Enrolment from "../pages/Enrolment";
import Classes from "../pages/Classes";
import Children from "../pages/Children";
import Teachers from "../pages/Teachers";
import Admin from "../pages/Admin";
import Topbar from "./Topbar";
import Confirmation from "../pages/Confirmation";
import News from "../pages/News";
import Search from "../pages/Search";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AddTeacher from "./teacher/AddTeacher";
import EditTeacher from "./teacher/EditTeacher";

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Enrolment" element={<Enrolment />} />
        <Route path="/Classes" element={<Classes />} />
        <Route path="/Children" element={<Children />} />
        <Route path="/Teachers" element={<Teachers />} />

        <Route path="/Teachers/addTeacher" element={<AddTeacher />} />
        <Route path="/Teachers/EditTeacher" element={<EditTeacher />} />

        <Route path="/Admin" element={<Admin />} />
        <Route path="/confirmed" element={<Confirmation />} />
        <Route path="/News" element={<News />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
