import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import "./teacherCRUDNav.css"


const TeacherNavbar=()=> {
  return (
    <> 
          {/* <LabelDiv>Teachers Info </LabelDiv> */}

    <NavDiv>
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid"> */}
        <MyButton>
          <Link className="navbar-brand" to="/Teachers">
            Teachers Information
          </Link>
          </MyButton>
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

          <Link className="btn btn-outline-light" to="/Teachers/addTeacher">
            Add Teacher
          </Link>
        {/* </div>
      </nav> */}
        

    </NavDiv>
    </>
  )
}

const LabelDiv=styled.div`
color:red;
margin-left: 400px;
font-size: 22px;
font-weight: 300;
z-index: 100;
`;



const MyButton = styled.div`
display: flex;
color: white;
margin-left: 300px;
margin-top: 30px;
align-items: center;
justify-content: center;

`;


const NavDiv = styled.div`
display: flex;
width: 550px;
height: 50px;
align-items:center;
margin-left: 410px;
/* background-color:black; */
background: rgba(0, 0, 22, 0.8);
align-items: center;
justify-content: center;
color:white;
box-shadow: 0 0 10px rgba(0, 0, 0, 1);
margin-bottom:-20px;
`;

export default TeacherNavbar