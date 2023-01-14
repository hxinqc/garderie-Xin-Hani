import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

export default function AddTeacher() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [message, setMessage] = useState(null);
  var lastStatus;

  function resetForm() {
    setFirstName(null);
    setLastName(null);
  }

  const btnConfirm = (ev) => {
    ev.preventDefault();

    fetch("http://localhost:8080/teacher", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        isActive: true,
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
          console.log(data.data);
          setMessage("New Teacher Added");
          resetForm();
        }
      })
      .catch((err) => {
        // console.log("we have a problem " + err.message);
        setMessage("we have a problem " + err.message);
      });
  };

  return (
    <Wrapper>
            <Title> Modify Admin Info</Title>

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
                placeholder="FirstName"
                type="text"
                value={firstName != null ? firstName : ""}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Label>
            <br />
            <Label>
              <Input
                required
                placeholder="LastName"
                type="text"
                value={lastName != null ? lastName : ""}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Label>
            <br />
            <Buttonsdiv>
              <Button type="submit">Submit</Button>

              <Link to="/Teachers" style={{ textDecoration: "none" }}>
                <Button type="button"> Back </Button>
              </Link>
            </Buttonsdiv>
            <MessageLabel> {message} </MessageLabel>
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
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: hidden;
  overflow-x: hidden;
  top: 50%;
  left: 50%;
`;

const Title = styled.div`
  position: absolute;
  color: white;
  margin-top: -250px;
  margin-left: -100px;
  z-index: 5;
`;

const FormDiv = styled.div``;

const Form = styled.form`
  height: 320px;
  width: 320px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 22, 0.8);
  padding: 60px;
  margin: 15px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
`;
const Label = styled.label`
  align-items: center;
  color: white;
  display: block;
`;

const MessageLabel = styled.label`
  align-items: center;
  color: white;
  margin-left: 45px;
  margin-top: 10px;
  display: block;
  font-weight: 300;
  color: white;
`;

const Button = styled.button`
  position: relative;
  align-items: center;
  margin-bottom: 20px;
  display: block;
  margin: 0 auto;
  width: 80px;
  background-color: #f9c000;
  color: #333;
  border: none;
  cursor: pointer;
  align-items: center;
  padding: 3px;
  font-weight: 400;
  margin-top: 5px;
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
  background-color: white;
  display: flex;
  justify-content: right;
  width: 230px;
  margin-right: 12px;
`;
const Buttonsdiv = styled.div`
  display: flex;
  /* align-items:center; */
  margin-left: 20px;
  margin-right: 50px;
  margin-top: 10px;
`;
