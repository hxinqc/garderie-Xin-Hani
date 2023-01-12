import React from 'react';
import styled from "styled-components";
import AdminHome from '../component/admin/AdminHome';
import AdminNavbar from '../component/admin/AdminNavbar';

function Admin() {
  return (
    <Div>
      <AdminNavbar/>
      <AdminHome/>
    </Div>
  )
}

const Div=styled.div`
position: relative;
top:50px;
`;

export default Admin