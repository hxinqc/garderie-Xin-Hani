import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Select from 'react-select';
import { act } from "react-dom/test-utils";

export default function EditChild() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [message, setMessage] = useState(null);
  var lastStatus;
  const { id } = useParams();
  var options = [
    { value: true, label: 'true' },
    { value: false, label: 'false' }
  ];
  
  function resetForm() {
    setFirstName(null);
    setLastName(null);
  };

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

  const btnConfirm = (ev) => {
    ev.preventDefault();

    var request = JSON.stringify({
      id: id,
      firstName: firstName,
      lastName: lastName
    });
    console.log(request);
    fetch(`http://localhost:8080/roster/${id}`, {
        method: "PUT",
        body: request,
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res) => {
      lastStatus = res.status;
      return res;
    })
    .then((data) => {
        console.log(data);
        if(lastStatus === 200){
            setMessage('Roster edited.');
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
    <div style={{width:"600px", backgroundColor:"pink"}}>Edit Roster:
    <Label>
        <Input required placeholder="FirstName" type="text" value={firstName!=null?firstName:''} 
        onChange={(e)=>setFirstName(e.target.value)} />
      </Label>
      <br/>
      <Label>
        <Input required placeholder="LastName" type="text" value={lastName!=null?lastName:''} 
        onChange={(e)=>setLastName(e.target.value)} />
      </Label>
      <br/>

      <Button type="submit">Submit</Button>
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