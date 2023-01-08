// Fetching foods for class based on "ClassID" for search page
//this component is one of the options of radio buttons
// Tha other options will be activities for each class and teachers for each class

import React from "react";
import { useState } from "react";
import styled, { StyledComponent } from "styled-components";
import ShowActivities from "./ShowActivities";

// search = classId  we will get from user in main search page

function GetActivities() {
  const [search, setSearch] = useState("");
  const [MyActivity, setActivity] = useState([]);

  const searchActivity = (evt) => {
    if (evt.key === "Enter") {
      fetch(`http://localhost:8080//class/activities/${search}`)
        .then((res) => res.json())
        .then((data) => {
          //console.log(data.meals)
          setActivity(data.Activities);
        });
    }
  };

  return (
    <div className="main">
      <div className="heading"></div>

      <div className="searchBox">
        <i class="fas fa-search"></i>
        <input
          type="search"
          className="search-bar"
          placeholder="Enter Your Class ID"
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

          MyActivity == null ? (
            <p>Not Found</p>
          ) : (
            MyActivity.map((res) => {
              return <ShowActivities data={res} />;
            })
          )
        }
      </div>
    </div>
  );
}

export default GetActivities;
