import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import { act } from "react-dom/test-utils";

export default function EditChild() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [message, setMessage] = useState(null);
  var lastStatus;
  const { id } = useParams();
  var options = [
    { value: true, label: "true" },
    { value: false, label: "false" },
  ];

  function resetForm() {
    setFirstName(null);
    setLastName(null);
  }

  const retrieveData = () => {
    fetch(`http://localhost:8080/roster/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      })
      .catch((err) => {
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
      lastName: lastName,
    });
    console.log(request);
    fetch(`http://localhost:8080/roster/${id}`, {
      method: "PUT",
      body: request,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        lastStatus = res.status;
        return res;
      })
      .then((data) => {
        console.log(data);
        if (lastStatus === 200) {
          setMessage("Child info successfully edited");
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
      <Title> Modify Child Info</Title>

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

              <Link to="/Children" style={{ textDecoration: "none" }}>
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

const SelectDiv = styled.div`
  padding: 5px 11px;
  margin-left: 5px;
  margin-right: 0px;
`;

const Title = styled.div`
  position: absolute;
  color: white;
  margin-top: -300px;
  margin-left: -100px;
  z-index: 5;
  font-size: 22px;
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

const FormDiv = styled.div``;

const Form = styled.form`
  height: 360px;
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
  margin-left: 15px;
  margin-top: 25px;
  display: block;
  font-weight: 400;
  color: white;
  justify-content: center;
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
  margin-top: 25px;
  font-size: 15px;
  border-radius: 5px;
  box-shadow: 0 0 4px #f7dd00;
  transition: box-shadow 0.5s ease;
`;

const Input = styled.input`
  margin: 0 auto;
  display: block;
  color: black;
  padding: 6px 26px;
  display: block;
  width: 100%;
  align-items: center;
  margin-top: 5px;
  background-color: white;
  display: flex;
  justify-content: right;
  width: 230px;
  margin-right: 15px;
  border-radius: 2px;
`;
const Buttonsdiv = styled.div`
  display: flex;
  /* align-items:center; */
  margin-left: 20px;
  margin-right: 50px;
  margin-top: -20px;
`;
