import React, { useState } from "react";
import DateSelect from '../component/DateSelect'
import styled from "styled-components";
// import { useNavigate } from 'react-router-dom';

export default function News() {
  const [name, setName] = useState(null);
  const [issueDate, setIssueDate] = useState(null);
  const [content, setContent] = useState(null);
  const [fileName, setFileName] = useState()
  const [message, setMessage] = useState(null);
  var lastStatus;
  const [orgFileName, setOrgFileName] = useState(null);
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
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

  function resetForm() {
    setName(null);
    setIssueDate(null);
    setContent(null);
    setFileName();
    setOrgFileName();
  }

  const btnConfirm = (ev) => {
    ev.preventDefault();

    var isoDate = issueDate.toISOString();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('issueDate', isoDate.substr(0, isoDate.indexOf('T')));
    formData.append('content', content);
    formData.append('fileName', fileName);

    fetch("http://localhost:8080/news", {
      method: "POST",
      body: formData
    })
      .then((res) => {
        lastStatus = res.status;
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(lastStatus);
        if (lastStatus === 201) {
          localStorage.setItem('data', JSON.stringify(data.data));
          console.log(data.data);
          setMessage('News added.');
          resetForm();
        } else {
          setMessage(data.message);
        }
      })
      .catch(err => {
        // console.log("we have a problem " + err.message);
        setMessage("we have a problem " + err.message);
      });
  }

  return (
    <Form onSubmit={(ev) => { btnConfirm(ev) }}>
      <div style={{ width: "600px", backgroundColor: "pink" }}>News
        <Label>
          <Input required placeholder="Name" type="text" style={{ width: 200 }}
          value={name != null ? name : ''} onChange={(e) => setName(e.target.value)} />
        </Label>
        <br />
        <div style={{ width: "300px" }}>
          IssueDate:<DateSelect required selectedDate={issueDate}
            setselectedDate={date => { setIssueDate(date); setMessage(date.toISOString()) }}
            value={issueDate != null ? issueDate : ''} />
        </div>
        
        <br />

        <Button onClick={handleClick}>
          Select a file
        </Button>
        <Label>{orgFileName}</Label>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <br />
        <Label>
          <textarea  required placeholder="Content"  rows="10" cols="50"
          value={content != null ? content : ''} onChange={(e) => setContent(e.target.value)} >
          </textarea>
        </Label>

        <Button type="submit">Submit</Button>
        <Label>Message: {message} </Label>
      </div>
    </Form>
  )

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
`;

const Button = styled.button`
    width: 100px;
    background-color: #fa9000;
    color: #333;
    border: none;
    cursor: pointer;
    padding: 10px;
    font-size: 18px;
    font-weight: 600;
    margin-top: 10px;    
`;

const Input = styled.input`
    margin: 5px;
    padding: 5px 15px;
`;