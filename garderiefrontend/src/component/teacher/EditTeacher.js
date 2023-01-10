import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Select from 'react-select';
import { act } from "react-dom/test-utils";

export default function EditTeacher() {
  const[firstName, setFirstName] = useState(null);
  const[lastName, setLastName] = useState(null);
  const[select, setSelect] = useState();
  const [message, setMessage] = useState(null);
  var lastStatus;
  const { teacherId } = useParams();
  var options = [
    { value: true, label: 'true' },
    { value: false, label: 'false' }
  ];
  
  function resetForm() {
    setFirstName(null);
    setLastName(null);
  };

  const retrieveData =() => {
    fetch(`http://localhost:8080/teacher/${teacherId}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);

        if (data.isActive) {
          setSelect({ value: true, label: 'true' });
        } else {
          setSelect({ value: false, label: 'false' });
        }
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
    console.log(select.value);
    var request = JSON.stringify({
      id: teacherId,
      firstName: firstName,
      lastName: lastName,
      isActive: select.value
    });
    console.log(request);
    fetch(`http://localhost:8080/teacher/${teacherId}`, {
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
        // console.log(lastStatus);
        if(lastStatus === 200){
            // localStorage.setItem('data', JSON.stringify(data.data));
            // console.log(data.data);
            setMessage('Teacher edited.');
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
    <div style={{width:"600px", backgroundColor:"pink"}}>Edit Teacher:
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
      <Select
        className="basic-single"
        classNamePrefix="select"
        // defaultValue={{value: true, label: 'true'}}
        value={select}
        name="isActive"
        options={options}
        onChange={(ev) => { setSelect({value: ev.value, label: ev.label}) }}
        // ref={selectObj}
      />

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