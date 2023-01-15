import React, { useState } from "react";
import DateSelect from "../DateSelect";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

export default function AddActivity() {
  const [name, setName] = useState(null);
  const [activityDate, setActivityDate] = useState(null);
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
    setActivityDate(null);
    setDescription(null);
    setFileName();
    setOrgFileName();
  }

  const btnConfirm = (ev) => {
    ev.preventDefault();

    var isoDate = activityDate.toISOString();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("activityDate", isoDate.substr(0, isoDate.indexOf("T")));
    formData.append("fileName", fileName);
    formData.append("description", description);

    fetch("http://localhost:8080/activities", {
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
          setMessage("Activity added.");
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
      <FormDiv>
        <Form
          onSubmit={(ev) => {
            btnConfirm(ev);
          }}
        >
          <div>
            {/* Activity */}
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
            <div >
              {/* ActivityDate: */}
              <DateSelect
                selectedDate={activityDate}
                setselectedDate={(date) => {
                  setActivityDate(date);
                }}
                value={activityDate != null ? activityDate : ""}
              />
            </div>
            <br />
            <Button onClick={handleClick}>Select a file</Button>
            <Label>{orgFileName}</Label>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <br />
            <Label>
              <textarea
                required
                placeholder="Description"
                rows="10"
                cols="50"
                value={description != null ? description : ""}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </Label>
            <Buttonsdiv>
              <Button type="submit">Submit</Button>
              <Link to="/Activities" style={{ textDecoration: "none" }}>
                <Button type="button"> Back </Button>
              </Link>
            </Buttonsdiv>
            
            <Label>Message: {message} </Label>
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

const FormDiv = styled.div``;

const Form = styled.form`
  // height: 390px;
  width: 600px;
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
