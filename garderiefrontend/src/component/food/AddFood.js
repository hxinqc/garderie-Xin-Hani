import React, { useState } from "react";
import DateSelect from "../DateSelect";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

export default function AddFood() {
  const [name, setName] = useState(null);
  const [offerDate, setOfferDate] = useState(null);
  const [description, setDescription] = useState(null);
  const [fileName, setFileName] = useState();
  const [message, setMessage] = useState(null);
  var lastStatus;
  const [orgFileName, setOrgFileName] = useState(null);
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setFileName(fileUploaded);
    setOrgFileName(fileUploaded.name);
    console.log(fileUploaded);
  };

  function resetForm() {
    setName(null);
    setOfferDate(null);
    setDescription(null);
    setFileName();
    setOrgFileName();
  }

  const btnConfirm = (ev) => {
    ev.preventDefault();

    var isoDate = offerDate.toISOString();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("offerDate", isoDate.substr(0, isoDate.indexOf("T")));
    formData.append("fileName", fileName);
    formData.append("description", description);

    fetch("http://localhost:8080/food", {
      method: "POST",
      body: formData,
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
          setMessage("Food Successfully Added");
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
      <Title> Insert Food Info</Title>
      <FormDiv>
        <Form
          onSubmit={(ev) => {
            btnConfirm(ev);
          }}
        >
          <div>
            {/* Food */}
            <Label>
              <Input
                required
                placeholder="Name"
                type="text"
                // style={{ width: 200 }}
                value={name != null ? name : ""}
                onChange={(e) => setName(e.target.value)}
              />
            </Label>
            <br />
            <DateDiv >
              {/* offerDate: */}
              <DateSelect
                selectedDate={offerDate}
                setselectedDate={(date) => {
                  setOfferDate(date);
                }}
                value={offerDate != null ? offerDate : ""}
              />
            </DateDiv>
            <br />
            <FileButton onClick={handleClick}>Select File</FileButton>
            <FileLabel>{orgFileName}</FileLabel>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <br />
            <Label>
              <Textarea
                required
                placeholder="Description"
                rows="10"
                cols="50"
                value={description != null ? description : ""}
                onChange={(e) => setDescription(e.target.value)}
              ></Textarea>
            </Label>
            <Buttonsdiv>
              <Button type="submit">Submit</Button>
              <Link to="/Foods" style={{ textDecoration: "none" }}>
                <Button type="button"> Back </Button>
              </Link>
            </Buttonsdiv>
            
            <MessageLabel>{message} </MessageLabel>
          </div>
        </Form>
      </FormDiv>
    </Wrapper>
  );
}

const FileLabel = styled.label`
margin-left: 40px;
z-index: 5;
color:white;
margin-bottom:-20px;

`;

const DateDiv = styled.div`
  margin-right: 15px;
  margin-top: -25px;
`;
const Textarea = styled.textarea`
  height: 100px;
  width: 224px;
  border-radius: 1px;
  border: 1px solid #ccc;
  font-weight: 200;
  font-size: 15px;
  font-family: Verdana;
  box-shadow: 1px 1px 5px #ccc;
  margin-top: 10px;
  margin-left: 20px;
  /* &.hover {
    width: 200px;
    height: 29px;
    border-radius: 3px;
    border: 1px solid #ccc;
    font-weight: 200;
    font-size: 15px;
    font-family: Verdana;
    box-shadow: 1px 1px 5px #ccc;
  } */
`;

const Title = styled.div`
  position: absolute;
  color: white;
  margin-top: -420px;
  margin-left: -120px;
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
  margin-top: 20px;
  margin-left: 14px;
`;
const Button = styled.button`
  position: relative;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 16px;
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

const FileButton = styled.button`
  position: relative;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 25px;
  width: 80px;
  background-color: #f9c000;
  color: #333;
  border: none;
  cursor: pointer;
  align-items: center;
  height: 40px;
  width: 90px;
  font-weight: 400;
  margin-top: 15px;
  font-size: 15px;
  border-radius: 2px;
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
  margin-right: 40px;
`;

const Buttonsdiv = styled.div`
  display: flex;
  /* align-items:center; */
  margin-left: 40px;
  margin-right: 30px;
  margin-top: 40px;
`;
