import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from '../pages/Home';
import Enrolment from '../pages/Enrolment';
import Classes from '../pages/Classes';
import Children from '../pages/Children';
import Teachers from '../pages/Teachers';
import Admin from '../pages/Admin';
import Topbar from "./Topbar";
import Confirmation from "../pages/Confirmation"



function App() {
  return (
    <Router>
        <Topbar/>
       <Routes>
       
       <Route  path="/" element={<Home />}/>
       <Route  path="/Enrolment" element={<Enrolment />}/>
       <Route  path="/Classes" element={<Classes />}/>
       <Route  path="/Children" element={<Children />}/>
       <Route  path="/Teachers" element={<Teachers />}/>
       <Route  path="/Admin" element={<Admin />}/>
       <Route  path="/confirmed" element={<Confirmation />}/>
       

 </Routes>
      </Router>
  )
}

export default App