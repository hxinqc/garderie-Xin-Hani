import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';


const AdminNavbar=()=> {
  return (
    <NavDiv>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/Admins">
            Admins Information
          </Link>
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

          <Link className="btn btn-outline-light" to="/Admins/AddAdmin">
            Add Admin
          </Link>
        </div>
      </nav>
        

    </NavDiv>
  )
}
const NavDiv = styled.div`
width: 600px;
align-items:center;
margin-left: 400px;
`;

export default AdminNavbar