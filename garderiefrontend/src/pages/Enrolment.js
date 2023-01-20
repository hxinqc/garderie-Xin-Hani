import DateSelect from "../component/DateSelect";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import {useHistory} from "react-router-dom"
import { useNavigate } from "react-router-dom";

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
  };

  const handleLastNameInput = (ev) => {
    setLastName(ev.target.value);
  };

  const handlePhoneInput = (ev) => {
    setPhone(ev.target.value);
  };

  const handleAddressInput = (ev) => {
    setAddress(ev.target.value);
  };

  const handleOpenPlaceInput = (ev) => {
    setopenPlace(ev.target.value);
  };

  const btnConfirm = (ev) => {
    ev.preventDefault();

    fetch("http://localhost:8080/inscription", {
      method: "POST",
      body: JSON.stringify({
        inscriptionDate: selectedDate,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: address,
        openPlace: openPlace
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          localStorage.setItem("data", JSON.stringify(data.data));
          history("/confirmed");
          console.log(data.data);
        }
      })
      .catch((err) => {
        console.log("we have a problem " + err.message);
      });
  };

  return (
    <Wrapper>
      <Form
        onSubmit={(ev) => {
          btnConfirm(ev);
        }}
      >
        <ContainerInput>
          <DateSelect
            selectedDate={selectedDate}
            setselectedDate={setselectedDate}
          />
        </ContainerInput>

        <ContainerInput>
          <Label>
            <Input
              required
              placeholder="First Name"
              type="text"
              onChange={(ev) => {
                handleFirstNameInput(ev);
              }}
            />
          </Label>
        </ContainerInput>

        <ContainerInput>
          <Label>
            <Input
              required
              placeholder="Last Name"
              type="text"
              onChange={(ev) => {
                handleLastNameInput(ev);
              }}
            />
          </Label>
        </ContainerInput>

        <ContainerInput>
          <Label>
            <Input
              required
              placeholder="Phone"
              type="phone"
              onChange={(ev) => {
                handlePhoneInput(ev);
              }}
            />
          </Label>
        </ContainerInput>

        <ContainerInput>
          <Label>
            <Input
              required
              placeholder="Address"
              type="address"
              onChange={(ev) => {
                handleAddressInput(ev);
              }}
            />
          </Label>
        </ContainerInput>

        <ContainerInput>
          <Label>
            <Input
              required
              placeholder="Open Place"
              type="text"
              onChange={(ev) => {
                handleOpenPlaceInput(ev);
              }}
            />
          </Label>
        </ContainerInput>

        <Footer>
          <Button type="submit">Confirm</Button>
        </Footer>
      </Form>
    </Wrapper>
  );
}

const Form = styled.form`
   height: 500px;
  width: 320px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 22, 0.8);
  padding: 60px;
  margin: 5px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  margin-top: 10px;
`;
const Label = styled.label`
  display: inline-block;
  text-align: right;
  margin-right: 20px;
  align-items: center;
  margin-top: 5px;
  font-weight: 300px;
  /* background-color: white; */
`;

const Button = styled.button`
  position: relative;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 1px;
  width: 80px;
  background-color: #f9c000;
  color: #333;
  border: none;
  cursor: pointer;
  align-items: center;
  padding: 3px;
  font-weight: 400;
  margin-top: 20px;
  font-size: 15px;
  border-radius: 5px;
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
  display: flex;
  justify-content: right;
  width: 230px;
  margin-right: -10px;
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

const ContainerInput = styled.div`
  /* width: 100%;
  align-items: center;
  margin-top: 5px;
  background-color: white;
  display: flex;
  justify-content: right; */
`;

const Footer = styled.div``;

export default Enrolment;
