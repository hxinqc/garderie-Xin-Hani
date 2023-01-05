import DateSelect from '../component/DateSelect'
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import {useHistory} from "react-router-dom"
import { useNavigate } from 'react-router-dom';



function Enrolment() {

  const history = useNavigate();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [openPlace, setopenPlace] = useState(null);
  const [selectedDate, setselectedDate] = useState(null);


  const handleFirstNameInput = (ev) => {
    setFirstName(ev.target.value);
}

const handleLastNameInput = (ev) => {
    setLastName(ev.target.value);
}

const handlePhoneInput = (ev) => {
    setPhone(ev.target.value);
}

const handleAddressInput = (ev) => {
  setAddress(ev.target.value);
}

const handleOpenPlaceInput = (ev) => {
  setopenPlace(ev.target.value);
}


const btnConfirm = (ev) => {
  ev.preventDefault();
      
  fetch("http://localhost:8080/inscription", {
      method: "POST",
      body: JSON.stringify({
         
          inscriptionDate:selectedDate,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          address: address,
          openPlace:openPlace,
      }),
      headers: {
          "Content-Type": "application/json",
      },
  })
  .then((res) => res.json())
  .then((data) => {
      //console.log(data);
      if(data.status === 200){
          localStorage.setItem('data', JSON.stringify(data.data));
          history('/confirmed');
      }        
  })
  .catch(err => {
      console.log("we have a problem " + err.message)});

}

  return (

    <Form onSubmit={(ev) =>{btnConfirm(ev)}}>

            <DateSelect selectedDate={selectedDate} setselectedDate={setselectedDate}/>

            <Label>
                <Input required placeholder="First Name" type="text" onChange = {(ev) => {handleFirstNameInput(ev)}}/>
            </Label>

            <Label>
                <Input required placeholder="Last Name" type="text" onChange = {(ev) => {handleLastNameInput(ev)}}/>
            </Label>

            <Label>
                <Input required placeholder="Phone" type="phone" onChange = {(ev) => {handlePhoneInput(ev)}}/>
            </Label>

            <Label>
                <Input required placeholder="Address" type="address" onChange = {(ev) => {handleAddressInput(ev)}}/>
            </Label>

            <Label>
                <Input required placeholder="Open Place" type="text" onChange = {(ev) => {handleOpenPlaceInput(ev)}}/>
            </Label>

            <Button type="submit">Confirm</Button>
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

export default Enrolment