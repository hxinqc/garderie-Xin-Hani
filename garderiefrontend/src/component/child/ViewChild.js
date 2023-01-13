import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

export default function ViewAdmin() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [message, setMessage] = useState(null);
  const { id } = useParams();
  
  const retrieveData =() => {
    fetch(`http://localhost:8080/roster/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);

      })
      .catch(err => {
        console.log("we have a problem " + err.message);
      });
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <Form>
    <div style={{width:"600px", backgroundColor:"pink"}}>View roster:
      <br />
      <Label>
        FirstName: {firstName!=null?firstName:''} 
      </Label>
      <br/>
      <Label>
        LastName: {lastName!=null?lastName:''} 
      </Label>
      <br/>
      <Label>Message: {message} </Label>

      <Link className="btn btn-primary mx-2" to={"/Children"} >Back to Children</Link>
    </div>
    </Form>
  )

}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 25px;
    margin: 15px;
    border: none;
    border-radius: 7px;
`;
const Label = styled.label`
`;

const Button = styled.button`
    width: 100px;
    background-color: #fa9000;
    color: #333;
    border: none;
    cursor: pointer;
    padding: 10px;
    font-size: 18px;
    font-weight: 600;
    margin-top: 10px;    
`;

const Input = styled.input`
    margin: 5px;
    padding: 5px 15px;
`;