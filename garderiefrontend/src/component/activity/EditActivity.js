import React, { useState, useEffect } from "react";
import DateSelect from "../DateSelect";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

export default function EditActivity() {
  const [name, setName] = useState(null);
  const [activityDate, setActivityDate] = useState(null);
  const [description, setDescription] = useState(null);
  const [fileName, setFileName] = useState();
  const [message, setMessage] = useState(null);
  const [orgFileName, setOrgFileName] = useState(null);
  const { id } = useParams();
  var lastStatus;
  const hiddenFileInput = React.useRef(null);

  function resetForm() {
    setName(null);
    setActivityDate(null);
    setDescription(null);
    setFileName();
    setOrgFileName();
  }

  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setFileName(fileUploaded);
    setOrgFileName(fileUploaded.name);
    console.log(fileUploaded);
  };

  const retrieveData = () => {
    fetch(`http://localhost:8080/activities/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setName(data.name);
        var dateStr = data.activityDate.split("-");
        var generateDate = new Date(dateStr[0], dateStr[1] - 1, dateStr[2]);
        // generateDate.setFullYear(dateStr[0]);
        // generateDate.setMonth(dateStr[1] - 1);
        // generateDate.setDate(dateStr[2]);
        console.log(generateDate);
        setActivityDate(generateDate);

        setFileName(data.picPath);
        setDescription(data.description);
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

    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    var isoDate = activityDate.toISOString();
    console.log(isoDate);
    formData.append('activityDate', isoDate.substr(0, isoDate.indexOf('T')));
    formData.append('description', description);
    formData.append('fileName', fileName);

    console.log(formData);
    fetch(`http://localhost:8080/activities/${id}`, {
      method: "PUT",
      body: formData
    })
      .then((res) => {
        lastStatus = res.status;
        return res;
      })
      .then((data) => {
        console.log(data);
        if (lastStatus === 200) {
          setMessage("Activity edited.");
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
      <Title> Edit Activity Info</Title>

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
            <div style={{ width: "300px" }}>
              <DateSelect
                selectedDate={activityDate!=null?activityDate:""}
                setselectedDate={(date) => {
                  setActivityDate(date);
                  console.log(date.toISOString());
                }}
                value={activityDate != null ? activityDate : ""}
              />
            </div>
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
              <Input
                placeholder="Description"
                type="text"
                value={description != null ? description : ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Label>
            <br />

            <Buttonsdiv>
              <Button type="submit">Submit</Button>

              <Link to={"/Activities"} style={{ textDecoration: "none" }}>
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

 
const FileLabel = styled.label`
margin-left: 40px;
z-index: 5;
color:white;
margin-bottom:-20px;

`;

const Title = styled.div`
  position: absolute;
  color: white;
  margin-top: -410px;
  margin-left: -100px;
  z-index: 5;
  font-size: 20px;

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
  border-radius: 2px;
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
  margin-right: 22spx;
  border-radius: 2px;
`;
const Buttonsdiv = styled.div`
  display: flex;
  /* align-items:center; */
  margin-left: 20px;
  margin-right: 50px;
  margin-top: 10px;
`;
const FileButton = styled.button`
  position: relative;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 35px;
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
