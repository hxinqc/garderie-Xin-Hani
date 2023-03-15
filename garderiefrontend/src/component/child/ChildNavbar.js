import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ChildNavbar = () => {
  return (
    <NavDiv className="container">
      <MyButton>
        <Link className="navbar-brand" to="/Children">
          Children Info
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

      <Link className="btn btn-outline-light" to="/child/AddChild">
        Add Child
      </Link>
    </NavDiv>
  );
};
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
  color: red;
  margin-left: 400px;
  font-size: 22px;
  font-weight: 300;
  z-index: 100;
`;

const MyButton = styled.div`
  display: flex;
  color: white;
  margin-right: 150px;
  margin-left: 210px;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  font-size: 20px;

`;
export default ChildNavbar;
