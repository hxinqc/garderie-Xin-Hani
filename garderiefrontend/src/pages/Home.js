import React from 'react'
import HomeBackground from "../assets/HomeBackground.jpg"
import styled from "styled-components"


function Home() {
  return (
    <Homediv >
    
      News

    </Homediv>
  )
}

const Homediv = styled.div`
height: 120vh ;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
background-image:  url(${HomeBackground});
background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: hidden; 
  overflow-x: hidden; 

`;

export default Home