import React, { useState } from "react";
import DateSelect from "../component/DateSelect";
import styled from "styled-components";
import Class from "../assets/Class.jpg";

// import { useNavigate } from 'react-router-dom';

export default function Classes() {
  const [name, setName] = useState(null);
  const [openDate, setOpenDate] = useState(null);
  const [message, setMessage] = useState(null);
  var lastStatus;

  const btnConfirm = (ev) => {
    ev.preventDefault();

    fetch("http://localhost:8080/class", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        openDate: openDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        lastStatus = res.status;
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(lastStatus);
        if (lastStatus === 201) {
          localStorage.setItem("data", JSON.stringify(data.data));
          // history('/confirmed');
          console.log(data.data);
          setMessage("New class successfully added.");
          setName(null);
          setOpenDate(null);
        }
      })
      .catch((err) => {
        // console.log("we have a problem " + err.message);
        setMessage("we have a problem " + err.message);
      });
  };

  return (
    <Wrapper>
      <FormDiv>
        <Form
          onSubmit={(ev) => {
            btnConfirm(ev);
          }}
        >
          <div>
            <Label>
              <Input
                required
                placeholder="Enter Class Name"
                type="text"
                value={name != null ? name : ""}
                onChange={(e) => setName(e.target.value)}
              />
            </Label>
            <br />
            <DateSelect
              placeholder="open Dates"
              selectedDate={openDate}
              setselectedDate={setOpenDate}
              value={openDate != null ? openDate : ""}
            />

            <Button type="submit">Submit</Button>
            <MessageLabel>{message} </MessageLabel>
          </div>
        </Form>
      </FormDiv>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - 60px);
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-image:  linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,.8) 100%),url(${Class}); */
  background-image: url(${Class});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: hidden;
  overflow-x: hidden;
  top: 50%;
  left: 50%;
`;

const FormDiv = styled.div``;

const Form = styled.form`
  height: 310px;
  width: 320px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 22, 0.8);
  /* background: rgba(0, 153, 154, 0.5); */

  padding: 60px;
  margin: 15px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
`;
const Label = styled.label`
  align-items: center;
  color:white;
  display: block;
`;

const MessageLabel=styled.label`
align-items: center;
color:white;
margin-left: 2px;
display: block;
font-weight: 400;
color:white;
`;

const Button = styled.button`
  position: relative;
  align-items: center;
  margin-bottom: 20px;
  display: block;
  margin: 0 auto;
  width: 120px;
  background-color: #f9c000;
  color: #333;
  border: none;
  cursor: pointer;
  align-items: center;
  padding: 10px;
  font-weight: 500;
  margin-top: 30px;
  font-size: 15px;
  border-radius: 30px;
  box-shadow: 0 0 4px #f7dd00;
  transition: box-shadow 0.5s ease;
`;

const Input = styled.input`
margin: 0 auto;

padding: 5px 20px;
display: block;
width: 100%;
align-items: center;
margin-top: 5px;
background-color: white;
display: flex;
justify-content: right;
`;
