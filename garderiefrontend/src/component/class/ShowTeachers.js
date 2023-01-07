
//A template in which fields and fetched data from the api in backEnd are embedded in this structure
// getTeacher is coming from ShowTeacher component and contains all the fields

import React from "react";
import styled, { StyledComponent } from "styled-components";

const ShowTeachers = (getTeacher) => {
  //console.log(getMeal.data)
  return (
    <div className="card">
      <img src={getTeacher.data.picPath} />
      <div className="info">
        <h2>{getTeacher.data.name}</h2>
        <h2>{getTeacher.data.offerDate}Offerd Date</h2>
      </div>
      <div className="recipe">
        <h2>Description</h2>
        <p>{getTeacher.data.description}</p>
      </div>
    </div>
  );
};

export default ShowTeachers