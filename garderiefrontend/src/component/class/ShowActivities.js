//A template in which fields and fetched data from the api in backEnd are embedded in this structure
// getActivity is coming from ShowActivities component and contains all the fields

import React from "react";
import styled, { StyledComponent } from "styled-components";

const ShowActivities = (activity) => {
  console.log(activity.data);
  var BASE_URL = "http://localhost:8080";
  return (
    <div className="card" key={activity.data.id}>
      <img src={BASE_URL + activity.data.picPath} />
      <div className="info">
        <h2>{activity.data.name}</h2>
        <h2>{activity.data.activityDate}</h2>
        <p>{activity.data.description}</p>
      </div>
    </div>
  );
};

export default ShowActivities;
