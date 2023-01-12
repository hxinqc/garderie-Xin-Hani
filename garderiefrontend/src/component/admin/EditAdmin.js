import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Select from 'react-select';
import { act } from "react-dom/test-utils";

export default function EditAdmin() {
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [description, setDescription] = useState(null);
  const [select, setSelect] = useState();
  const [message, setMessage] = useState(null);
  var lastStatus;
  const { adminId } = useParams();
  var options = [
    { value: true, label: 'true' },
    { value: false, label: 'false' }
  ];
  
  function resetForm() {
    setName(null);
    setPassword(null);
    setDescription(null);
    setSelect();
  };

  const retrieveData =() => {
    fetch(`http://localhost:8080/admin/${adminId}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setName(data.name);
        setPassword(data.password);
        setDescription(data.description);

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
      id: adminId,
      name: name,
      password: password,
      description: description,
      isActive: select.value
    });
    console.log(request);
    fetch(`http://localhost:8080/admin/${adminId}`, {
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
            setMessage('Admin edited.');
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
    <div style={{width:"600px", backgroundColor:"pink"}}>Edit Admin:
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
      <Select
        className="basic-single"
        classNamePrefix="select"
        value={select}
        name="isActive"
        options={options}
        onChange={(ev) => { setSelect({value: ev.value, label: ev.label}) }}
      />

      <Button type="submit">Submit</Button>
      <Label>Message: {message} </Label>

      <Link className="btn btn-primary mx-2" to={"/Admins"} >Back to admins</Link>
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