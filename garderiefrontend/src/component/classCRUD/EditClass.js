import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { parse } from "date-fns";
import DateSelect from "../DateSelect";
import { act } from "react-dom/test-utils";

function EditClass() {
  const [name, setName] = useState(null);
  const [openDate, setOpenDate] = useState(null);
  const [message, setMessage] = useState(null);
  var lastStatus;
  const { id } = useParams();

  function resetForm() {
    setName(null);
    setOpenDate(null);
  }

  const retrieveData = () => {
    fetch(`http://localhost:8080/class/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("class date:", data);
        setName(data.name);

        var dateStr = data.openDate.split("-");
        var generateDate = new Date(dateStr[0], dateStr[1] - 1, dateStr[2]);
        console.log(generateDate);
        setOpenDate(generateDate);
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
      name: name,
      openDate: openDate,
    });

    console.log("Class request is:", request);
    fetch(`http://localhost:8080/class/${id}`, {
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
        // console.log(lastStatus);
        if (lastStatus === 200) {
          // localStorage.setItem('data', JSON.stringify(data.data));
          // console.log(data.data);
          setMessage("Class Information Edited");
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
      <Title> Modify Class Info</Title>

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
                placeholder="Class Name"
                type="text"
                value={name != null ? name : ""}
                onChange={(e) => setName(e.target.value)}
              />
            </Label>
            <br />
            <Label>
         
              <SelectDiv>
              <DateSelect
                selectedDate={openDate!=null?openDate:""}
                setselectedDate={(date) => {
                  setOpenDate(date);
                  console.log(date.toISOString());
                }}
                value={openDate != null ? openDate : ""}
              />

              </SelectDiv>
            </Label>
            <br />

            <Buttonsdiv>
              <Button type="submit">Submit</Button>

              <Link to="/Classes" style={{ textDecoration: "none" }}>
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
  margin-left: -8px;
  margin-right: 0px;
`;

const Title = styled.div`
  position: absolute;
  color: white;
  margin-top: -350px;
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
  height: 420px;
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
  margin-top: 30px;
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
  display: block;
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
  margin-right: 40px;
  border-radius: 5px;
`;
const Buttonsdiv = styled.div`
  display: flex;
  /* align-items:center; */
  margin-left: 20px;
  margin-right: 50px;
  margin-top: 10px;
`;

export default EditClass;
