// Fetching foods for class based on "ClassID" for search page
//this component is one of the options of radio buttons
// Tha other options will be activities for each class and teachers for each class

import React from "react";
import { useState } from "react";
// import styled, { StyledComponent } from "styled-components";
import ShowActivities from "./ShowActivities";

// search = classId  we will get from user in main search page

function GetActivities() {
  const [search, setSearch] = useState("");
  const [activity, setActivity] = useState([]);

  const searchActivity = (evt) => {
    if (evt.key === "Enter") {
      fetch(`http://localhost:8080/activity/class/${search}`)
        .then((res) => res.json())
        .then((data) => {
          setActivity(data);
        });
    }
  };

  return (
    <div className="main">
      <div className="heading"></div>

      <div className="searchBox">
        <i className="fas fa-search"></i>
        <input
          type="search"
          className="search-bar"
          placeholder="Enter Your Class Number"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyPress={searchActivity}
        ></input>
      </div>

      <div className="container">
        {
          //  MyFood is all the fetched Foods from the api in BackEnd
          // by map, I'm sending each of these in to ShowFood component that
          //will show differnt feilds of Food like photo, Name,... in predefined structure

          (activity == null || activity.length === 0) ? (
            <p>Not Found</p>
          ) : (
            activity.map((res) => {
              return <ShowActivities data={res} />;
            })
          )
        }
      </div>
    </div>
  );
}

export default GetActivities;
