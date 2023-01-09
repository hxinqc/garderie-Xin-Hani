import React, { useState } from 'react';
import GetTeachers from '../component/class/GetTeachers';
import GetActivities from '../component/class/GetActivities';
import GetFoods from '../component/class/GetFoods';
import "../component/searchStyles.css";

const Search = () => {

  const [displayA, setDisplayA] = useState(false);
  const [displayB, setDisplayB] = useState(false);
  const [displayC, setDisplayC] = useState(false);

  const showA = () => {
    setDisplayA(true);
    setDisplayB(false);
    setDisplayC(false);
  }
  const showB = () => {
    setDisplayA(false);
    setDisplayB(true);
    setDisplayC(false);
  };
  const showC = () => {
    setDisplayA(false);
    setDisplayB(false);
    setDisplayC(true);
  };

  return (
    <div>
        <div className="heading">
          <h1>Search Your Class Information</h1>

        </div>

        <div className="radioDiv">
          <ul className="RadioUl">
            <li>
              <input type="radio" value={true} name="option" onClick={showA} /><label htmlFor="first">{"  "}</label>
              <span>Teachers</span>
            </li>

            <li>
              <input type="radio" value={false} name="option" onClick={showB} /><label htmlFor="second">{"  "}</label>
              <span>Activities</span>
            </li>

            <li>
              <input type="radio" value={false} name="option" onClick={showC} /> <label htmlFor="third">{ }</label>
              <span>Foods</span>
            </li>

          </ul>
        </div>

        {/* to have conditional rendering, based on selected radio button */}

        {displayA && <div><GetTeachers /></div>}
        {displayB && <div><GetActivities /></div>}
        {displayC && <div><GetFoods /></div>}

    </div>




  )
}


export default Search
