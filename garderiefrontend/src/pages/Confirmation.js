import React, { useState } from "react";
import styled from "styled-components";


//const [reservation, setReservation] = useState(
 
const Confirmation = () => {

  const data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : null;

  return (
    <div>
      <Wrapper>
        <h1>Your flight is confirmed!</h1>
        <P>
          <Span>First Name:</Span> {data.firstName}
        </P>
        <P>
          <Span>Last Name:</Span> {data.lastName}
        </P>
        <P>
          <Span>Inscription Date: </Span> {data.selectedDate}
        </P>
        <P>
          <Span> Place:</Span> {data.openPlace}
        </P>
        <P>
          <Span>Phone:</Span> {data.phone}
        </P>
        <P>
          <Span>Address:</Span> {data.address}
        </P>
      </Wrapper>
    </div>
  );
};


const Wrapper = styled.div`
  border: 7px solid #aa003e;
  padding: 50px;
  width: 517px;
  height: 317px;
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
`;

const P = styled.p`
  margin-top: 10px;
`;
const Span = styled.span`
  color: black;
  font-weight: bolder;
`;

export default Confirmation;