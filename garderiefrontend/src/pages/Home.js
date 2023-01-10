import React from 'react'
import HomeBackground from "../assets/HomeBackground.jpg"
import styled from "styled-components"


function Home() {
  return (
    <Homediv >
    
      Home

    </Homediv>
  )
}

const Homediv = styled.div`
height: calc(100vh - 50px);
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
background-image:  url(${HomeBackground});


`;

export default Home