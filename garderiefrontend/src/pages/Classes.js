import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import ClassHome from '../component/classCRUD/ClassHome';
import ClassNavbar from '../component/classCRUD/ClassNavbar';

const  Classes=()=> {
  return (
    <Div>

    <ClassNavbar/>
    <ClassHome/> 
    </Div>
    
     )
}

const Div=styled.div`
position: relative;
top:50px;
`;
export default Classes