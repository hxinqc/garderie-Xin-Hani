import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

export default function ViewTeacher() {
  const[firstName, setFirstName] = useState(null);
  const[lastName, setLastName] = useState(null);
  const[isActive, setIsActive] = useState();
  const [message, setMessage] = useState(null);
  var lastStatus;
  const { teacherId } = useParams();
  
  const retrieveData =() => {
    fetch(`http://localhost:8080/teacher/${teacherId}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);

        if (data.isActive) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      })
      .catch(err => {
        console.log("we have a problem " + err.message);
      });
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <Wrapper>
      <FormDiv>
    <Form>
    <Mydiv >Selected Teacher Info </Mydiv>
     
      <Label>
        First Name: {firstName!=null?firstName:''} 
        
      </Label>
      <br/>
      <Label>
        Last Name: {lastName!=null?lastName:''} 
      </Label>
      <br/>
      <Label>
        Active: {isActive?'Yes':'No'}
      </Label>
      <br/>
      <MessageLabel> {message} </MessageLabel>


     <Link to="/Teachers" style={{ textDecoration: 'none' }}>
     <Button type="button"> Back </Button>
 </Link>

   
    </Form>
    </FormDiv>

    </Wrapper>
  )

}

const Mydiv=styled.div`
color:white;
display: flex;
align-items: center;
font-weight:900px;
margin-bottom:30px;
`;

const Wrapper = styled.div`
  height: calc(100vh - 60px);
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: hidden;
  overflow-x: hidden;
  top: 50%;
  left: 50%;
`;

const FormDiv = styled.div``;

const Form = styled.form`
  height: 380px;
  width: 320px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 22, 0.8);
  padding: 60px;
  margin: 15px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
`;
const Label = styled.label`
  align-items: center;
  color:white;
  display: block;
`;

const MessageLabel=styled.label`
align-items: center;
color:white;
margin-left: 2px;
display: block;
font-weight: 400;
color:white;
`;

const Button = styled.button`
  position: relative;
  align-items: center;
  margin-bottom: 20px;
  display: block;
  margin: 0 auto;
  width: 80px;
  background-color: #f9c000;
  color: #333;
  border: none;
  cursor: pointer;
  align-items: center;
  padding: 3px;
  font-weight: 300;
  margin-top: 5px;
  font-size: 15px;
  border-radius: 30px;
  box-shadow: 0 0 4px #f7dd00;
  transition: box-shadow 0.5s ease;
`;

const Input = styled.input`
margin: 0 auto;
  color: black;
  padding: 5px 20px;
  display: block;
  width: 100%;
  align-items: center;
  margin-top: 5px;
  background-color: white;
  display: flex;
  justify-content: right;
  width: 230px;
  margin-right: 12px;

`;
const Buttonsdiv = styled.div`
display:flex;
/* align-items:center; */
margin-left: 10px;
margin-right: 35px;
margin-top: 10px;
`;