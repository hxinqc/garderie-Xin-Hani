
//A template in which fields and fetched data from the api in backEnd are embedded in this structure
// getTeacher is coming from ShowTeacher component and contains all the fields

import React from "react";
// import styled, { StyledComponent } from "styled-components";

const ShowTeachers = (getTeacher) => {
  return (
    <div className="card" key={getTeacher.data.id} >
      <div className="info" >
        <h2>firstName</h2>
        <p>{getTeacher.data.firstName}</p>
      
        <h2>lastName</h2>
        <p>{getTeacher.data.lastName}</p>

        <h2>IsActive</h2>
        <p>{getTeacher.data.isActive}</p>
      </div>
    </div>
  );
};

export default ShowTeachers