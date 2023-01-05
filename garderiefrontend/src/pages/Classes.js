import React, { useState } from "react";
import DateSelect from '../component/DateSelect'
import styled from "styled-components";
// import { useNavigate } from 'react-router-dom';

export default function Classes() {
  const[name, setName] = useState('');
  const [openDate, setOpenDate] = useState(null);

  const btnConfirm = (ev) => {
    ev.preventDefault();
        
    fetch("http://localhost:8080/class", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            openDate: openDate
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if(data.status === 200){
            localStorage.setItem('data', JSON.stringify(data.data));
            // history('/confirmed');
            console.log(data.data);
            console.log("New class added")
        }        
    })
    .catch(err => {
        console.log("we have a problem " + err.message)});
    }
  return (
    <Form onSubmit={(ev) =>{btnConfirm(ev)}}>
    <div style={{width:"600px", backgroundColor:"pink"}}>Classes
      <Label>
        <Input required placeholder="Name" type="text" onChange={(e)=>setName(e.target.value)} />
      </Label>

      OpenDate:<DateSelect selectedDate={openDate} setselectedDate={setOpenDate} />

      <Button type="submit">Submit</Button>
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