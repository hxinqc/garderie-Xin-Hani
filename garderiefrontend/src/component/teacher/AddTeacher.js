import React, { useState } from "react";
import styled from "styled-components";
// import { useNavigate } from 'react-router-dom';

export default function AddTeacher() {
  const[name, setName] = useState(null);
  const[openDate, setOpenDate] = useState(null);
  const[message, setMessage] = useState(null);
  var lastStatus;

  const btnConfirm = (ev) => {
    ev.preventDefault();
        
    fetch("http://localhost:8080/teacher", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            openDate: openDate
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
            // history('/confirmed');
            console.log(data.data);
            setMessage('New class added.');
            setName(null);
            setOpenDate(null);
        }        
    })
    .catch(err => {
        // console.log("we have a problem " + err.message);
        setMessage("we have a problem " + err.message);
      });
    }

  return (
    <Form onSubmit={(ev) =>{btnConfirm(ev)}}>
    <div style={{width:"600px", backgroundColor:"pink"}}>Classes
      <Label>
        <Input required placeholder="Name" type="text" value={name!=null?name:''} onChange={(e)=>setName(e.target.value)} />
      </Label>
      <br/>

      <Button type="submit">Submit</Button>
      <Label>Message: {message} </Label>
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