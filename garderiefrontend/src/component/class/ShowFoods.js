//A template in which fields and fetched data from the api in backEnd are embedded in this structure
// getMeal is coming from ShowFood component and contains all the fields

import React from "react";
import styled, { StyledComponent } from "styled-components";

const ShowFoods = (getFood) => {
  //console.log(getMeal.data)
  return (
    <div className="card">
      <img src={getFood.data.picPath} />
      <div className="info">
        <h2>{getFood.data.name}</h2>
        <h2>{getFood.data.offerDate}Offerd Date</h2>
      </div>
      <div className="recipe">
        <h2>Description</h2>
        <p>{getFood.data.description}</p>
      </div>
    </div>
  );
};
export default ShowFoods;
