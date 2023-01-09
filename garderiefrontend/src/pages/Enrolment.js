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
        openPlace: openPlace,
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
  display: flex;
  flex-direction: column;
  padding: 25px;
  margin: 15px;
  border: none;
  border-radius: 7px;
`;
const Label = styled.label`
  display: inline-block;
  text-align: right;
  margin-right: 20px;
  align-items: center;
  margin-top: 5px;
  font-weight: 300px;
  font-family: "Jost";
  background-color: white;
`;

const Button = styled.button`
  background-color: #04aa6d;
  color: white;
  padding: 5px 25px;
  margin-top: 100px;
  border: none;
  border-radius: 4px;
  font-weight: 600px;
  cursor: pointer;
  opacity: 0.9;
  align-items:center;
  position: absolute;
  top:420px;
  right:600px;
`;

const Input = styled.input`
  margin: 5px;
  padding: 5px 15px;
  background-color: white;
`;

const Wrapper = styled.div`
top:20px;
  justify-content: center;
  max-width: 475px;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
  border-radius: 16px;
  padding: 24px;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  font-family: "Jost";
  offset-position: 32px;
  margin: 0 auto;
`;

const ContainerInput = styled.div`
  width: 100%;
  align-items: center;
  margin-top: 5px;
  background-color: white;
  display: flex;
  justify-content: right;
`;

const Footer = styled.div``;

export default Enrolment;
