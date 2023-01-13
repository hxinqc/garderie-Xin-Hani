
// Fetching teachers for class based on "ClassID" for search page
//this component is one of the options of radio buttons
// Tha other options will be activities and foods for each class

import React from "react";
import { useState } from "react";
import styled, { StyledComponent } from "styled-components";
import ShowTeachers from "./ShowTeachers";

// search = classId  we will get from user in main search page

function GetTeachers() {
  const [search, setSearch] = useState("");
  const [MyTeacher, setTeacher] = useState([]);

  const searchTeacher = (evt) => {
    if (evt.key === "Enter") {
      // console.log(`http://localhost:8080/class/teachers/${search}`);
      fetch(`http://localhost:8080/class/teachers/${search}`)
        .then((res) => res.json())
        .then((data) => {
          //console.log(data.meals)
          console.log(data);
          setTeacher(data);
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
          onKeyPress={searchTeacher}
        ></input>
      </div>

      <div className="container">
        {
          //  MyTeacher is all the fetched Teachers from the api in BackEnd
          // by map, I'm sending each of these in to ShowTeachers component that
          //will show differnt feilds of Food like photo, Name,... in predefined structure

          MyTeacher == null ? (
            <p>Not Found</p>
          ) : (
            MyTeacher.map((res) => {
              console.log('myteacher here.')
              return <ShowTeachers data={res} classId={search} />;
            })
          )
        }
      </div>
    </div>
  );
}


export default GetTeachers