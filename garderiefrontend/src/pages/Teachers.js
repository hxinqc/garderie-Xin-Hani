import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import TeacherHome from '../component/teacher/TeacherHome';
import TeacherNavbar from '../component/teacher/TeacherNavbar';

 const Teachers = ()=> {
 

  return (
    <Div >

      <TeacherNavbar/>
      <TeacherHome/>
    
  </Div>
  );
}

const Div=styled.div`
position: relative;
top:50px;
`;

export default Teachers

