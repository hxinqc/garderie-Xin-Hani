import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
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
    { value: true, label: "True" },
    { value: false, label: "False" },
  ];

  function resetForm() {
    setName(null);
    setPassword(null);
    setDescription(null);
    setSelect();
  }

  const retrieveData = () => {
    fetch(`http://localhost:8080/admin/${adminId}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setName(data.name);
        setPassword(data.password);
        setDescription(data.description);

        if (data.isActive) {
          setSelect({ value: true, label: "True" });
        } else {
          setSelect({ value: false, label: "False" });
        }
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
    console.log(select.value);
    var request = JSON.stringify({
      id: adminId,
      name: name,
      password: password,
      description: description,
      isActive: select.value,
    });
    console.log(request);
    fetch(`http://localhost:8080/admin/${adminId}`, {
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
        if (lastStatus === 204) {
          setMessage("Admin Info successfully edited");
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
                placeholder="Name"
                type="text"
                value={name != null ? name : ""}
                onChange={(e) => setName(e.target.value)}
              />
            </Label>
            <br />
            <Label>
              <Input
                required
                placeholder="Password"
                type="password"
                value={password != null ? password : ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Label>
            <br />
            <Label>
              <Input
                placeholder="Description"
                type="text"
                value={description != null ? description : ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Label>
            <br />
            <SelectDiv>
              <Select
                className="basic-single"
                classNamePrefix="select"
                value={select}
                name="isActive"
                options={options}
                onChange={(ev) => {
                  setSelect({ value: ev.value, label: ev.label });
                }}
              />
            </SelectDiv>
            <Buttonsdiv>
              <Button type="submit">Submit</Button>

              <Link to={"/Admins"} style={{ textDecoration: "none" }}>
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
  padding: 5px 13px;
  margin-left: -5px;
  margin-right: 7px;
`;

const Title = styled.div`
  position: absolute;
  color: white;
  margin-top: -400px;
  margin-left: -100px;
  z-index: 5;
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
  height: 480px;
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
  margin-left: 5px;
  margin-top: 20px;
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
  margin-top: 25px;
  font-size: 15px;
  border-radius: 5px;
  box-shadow: 0 0 4px #f7dd00;
  transition: box-shadow 0.5s ease;
`;

const Input = styled.input`
  margin: 0 auto;
  color: black;
  padding: 6px 20px;
  display: block;
  width: 100%;
  align-items: center;
  margin-top: 5px;
  background-color: white;
  display: flex;
  justify-content: right;
  width: 230px;
  margin-right: 12px;
  border-radius: 5px;
`;
const Buttonsdiv = styled.div`
  display: flex;
  /* align-items:center; */
  margin-left: 20px;
  margin-right: 50px;
  margin-top: 10px;
`;
