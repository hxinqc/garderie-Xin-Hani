import React from 'react';
import styled from "styled-components";
import ActivityHome from '../component/activity/ActivityHome';
import ActivityNav from '../component/activity/ActivityNav';


function Activities() {
  return (
    <Div>
        <ActivityNav/>
        <ActivityHome/>

    </Div>
  )
}


const Div=styled.div`
position: relative;
top:50px;
`;

export default Activities