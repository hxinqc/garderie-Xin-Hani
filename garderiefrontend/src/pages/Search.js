import React from 'react'
import ShowTeachers from '../component/class/ShowTeachers'
import ShowActivities from '../component/class/ShowActivities'
import ShowFoods from '../component/class/ShowFoods'
import "../searchStyles.css"
import { useState } from 'react'


const Search=()=> {

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
        <>
         <div className="heading">
                 <h1>Search Your Class Information</h1>
                    
         </div>

                 
      <div className="radioDiv">
        <ul className="RadioUl">
        <li>
        <input type="radio" value={true} name="option" onClick={showA} /><label for="first">{"  "}</label>
        <span>Teachers</span>
        </li>

        <li>
        <input  type="radio" value={false} name="option"  onClick={showB} /><label for="second">{"  "}</label> 
        <span>Activities</span>
        </li>

        <li>
        <input  type="radio" value={false} name="option"  onClick={showC} /> <label for="third">{}</label>
        <span>Foods</span>
        </li>

        </ul>
      </div>

      {/* to have conditional rendering, based on selected radio button */}

          {displayA && <div><ShowTeachers/></div>}
          {displayB && <div><ShowActivities/></div>}
          {displayC && <div><ShowFoods/></div>}
          
      </>
    </div>
      

      
     
    )
}


export default Search
