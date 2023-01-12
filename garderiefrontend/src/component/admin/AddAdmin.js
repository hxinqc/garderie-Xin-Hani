import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

export default function AddAdmin() {
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [description, setDescription] = useState(null);
  const [message, setMessage] = useState(null);
  var lastStatus;

  function resetForm() {
    setName(null);
    setPassword(null);
    setDescription(null);
  };

  const btnConfirm = (ev) => {
    ev.preventDefault();
        
    fetch("http://localhost:8080/admin", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            password: password,
            description: description,
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
            setMessage('New admin added.');
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
    <div style={{width:"600px", backgroundColor:"pink"}}>Add Admin:
      <Label>
        <Input required placeholder="name" type="text" value={name!=null?name:''} 
        onChange={(e)=>setName(e.target.value)} />
      </Label>
      <br/>
      <Label>
        <Input required placeholder="password" type="password" value={password!=null?password:''} 
        onChange={(e)=>setPassword(e.target.value)} />
      </Label>
      <br/>
      <Label>
        <Input placeholder="description" type="text" value={description!=null?description:''} 
        onChange={(e)=>setDescription(e.target.value)} />
      </Label>
      <br/>
      <Button type="submit">Submit</Button>
      <Label>Message: {message} </Label>

      <Link className="btn btn-primary mx-2" to={"/Admins"} >Back to Admins</Link>
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