import React from 'react';
import styled from "styled-components";
import ChildHome from '../component/child/ChildHome';
import ChildNavbar from '../component/child/ChildNavbar';

function Children() {
  return (
    <Div>
      <ChildNavbar />
      <ChildHome />
    </Div>
  )
}

const Div=styled.div`
position: relative;
top:50px;
`;

export default Children