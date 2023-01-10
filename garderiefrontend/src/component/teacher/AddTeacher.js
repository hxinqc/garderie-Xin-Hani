import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

export default function AddTeacher() {
  const[firstName, setFirstName] = useState(null);
  const[lastName, setLastName] = useState(null);
  const [message, setMessage] = useState(null);
  var lastStatus;

  function resetForm() {
    setFirstName(null);
    setLastName(null);
  };

  const btnConfirm = (ev) => {
    ev.preventDefault();
        
    fetch("http://localhost:8080/teacher", {
        method: "POST",
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            isActive: true
        }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res) => {
      lastStatus = res.status;
      return res.json();
    })
    .then((data) => {
        console.log(data);
        console.log(lastStatus);
        if(lastStatus === 201){
            localStorage.setItem('data', JSON.stringify(data.data));
            console.log(data.data);
            setMessage('New teacher added.');
            resetForm();
        }        
    })
    .catch(err => {
        // console.log("we have a problem " + err.message);
        setMessage("we have a problem " + err.message);
      });
    }

  return (
    <Form onSubmit={(ev) =>{btnConfirm(ev)}}>
    <div style={{width:"600px", backgroundColor:"pink"}}>Add Teacher:
      <Label>
        <Input required placeholder="firstName" type="text" value={firstName!=null?firstName:''} 
        onChange={(e)=>setFirstName(e.target.value)} />
      </Label>
      <br/>
      <Label>
        <Input required placeholder="lastName" type="text" value={lastName!=null?lastName:''} 
        onChange={(e)=>setLastName(e.target.value)} />
      </Label>
      <br/>

      <Button type="submit">Submit</Button>
      <Label>Message: {message} </Label>

      <Link className="btn btn-primary mx-2" to={"/Teachers"} >Back to teachers</Link>
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