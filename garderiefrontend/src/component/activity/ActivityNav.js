import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./activityNav.css";


function ActivityNav() {
  return(
    <>

      <NavDiv className="container">
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid"> */}
        <LabelDiv>
          <Link className="navbar-brand" to="/Activities">
            Activity Info
          </Link>
          </LabelDiv>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <MyButton>

        <Link className="btn btn-outline-light" to="/activity/AddActivity">
          Add Activity
        </Link>
        </MyButton>

        {/* </div>
      </nav> */}
      </NavDiv>
    </>
  );
}

const NavDiv = styled.div`
display: flex;
width: 550px;
height: 50px;
align-items: center;
// margin-left: 410px;
/* background-color:black; */
background: rgba(0, 0, 22, 0.8);
align-items: center;
justify-content: center;
color: white;
box-shadow: 0 0 10px rgba(0, 0, 0, 1);
margin-bottom: -20px;
`;

const LabelDiv = styled.div`
color: white;
margin-left: 60px;
font-size: 20px;
font-weight: 300;
z-index: 100;
margin-top: 10px;

`;

const MyButton = styled.div`
display: flex;
color: white;
margin-left: 400px;
margin-top: -44px;
align-items: center;
justify-content: center;
`;
export default ActivityNav