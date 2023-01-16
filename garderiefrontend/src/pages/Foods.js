import React from 'react'
import styled from "styled-components";
import FoodHome from '../component/food/FoodHome'
import FoodNav from '../component/food/FoodNav'

function Foods() {
  return (
    <Div>
        <FoodNav/>
        <FoodHome/>
    </Div>
  )
}
const Div=styled.div`
position: relative;
top:50px;
`;

export default Foods