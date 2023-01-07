//A template in which fields and fetched data from the api in backEnd are embedded in this structure
// getActivity is coming from ShowActivities component and contains all the fields

import React from "react";
import styled, { StyledComponent } from "styled-components";

const ShowActivities = (getActivity) => {
  //console.log(getMeal.data)
  return (
    <div className="card">
      <img src={getActivity.data.picPath} />
      <div className="info">
        <h2>{getActivity.data.name}</h2>
        <h2>{getActivity.data.activityDate}Activity Date</h2>
      </div>
      <div className="recipe">
        <h2>Description</h2>
        <p>{getActivity.data.description}</p>
      </div>
    </div>
  );
};

export default ShowActivities;
