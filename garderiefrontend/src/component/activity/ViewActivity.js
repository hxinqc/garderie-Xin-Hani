import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

export default function ViewActivity() {
  var BASE_URL = "http://localhost:8080";
  const [name, setName] = useState(null);
  const [activityDate, setActivityDate] = useState(null);
  const [description, setDescription] = useState(null);
  const [picPath, setPicPath] = useState();
  const { id } = useParams();

  const retrieveData = () => {
    fetch(`http://localhost:8080/activities/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setName(data.name);
        setActivityDate(data.activityDate);
        setPicPath(data.picPath);
        setDescription(data.description);
    })
    .catch((err) => {
      console.log("we have a problem " + err.message);
    });
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <Wrapper>
      <FormDiv>
        <Form>
          <Mydiv>Selected Activity Info </Mydiv>
          <br />
          <Label>Name: {name != null ? name : ""}</Label>
          <br />
          <Label>ActivityDate: {activityDate!= null ? activityDate : ""}</Label>
          <br />
          <img src={(BASE_URL + picPath)} width="300" height="200"/>
          <br />
          <Label>Description: {description != null ? description : ""}</Label>
          <br />

          <Link to={"/Activities"} style={{ textDecoration: "none" }}>
            <Button type="button"> Back </Button>
          </Link>
        </Form>
      </FormDiv>
    </Wrapper>
  );
}

const Mydiv = styled.div`
  color: white;
  display: flex;
  align-items: center;
  font-weight: 900px;
  margin-bottom: 30px;
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
  height: 600px;
  width: 800px;
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
  margin-left: 2px;
  display: block;
  font-weight: 400;
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
  font-weight: 300;
  margin-top: 5px;
  font-size: 15px;
  border-radius: 30px;
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
  margin-left: 10px;
  margin-right: 35px;
  margin-top: 10px;
`;
