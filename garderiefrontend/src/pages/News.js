import React, { useState } from "react";
import DateSelect from '../component/DateSelect'
import styled from "styled-components";
// import { useNavigate } from 'react-router-dom';

export default function News() {
  const[name, setName] = useState(null);
  const[issueDate, setIssueDate] = useState(null);
  const[content, setContent] = useState(null);
  const [fileName, setFileName] = useState()
  const[message, setMessage] = useState(null);
  var lastStatus;

  function handleChange(event) {
    setFileName(event.target.files[0])
  }

  function resetForm() {
    setName(null);
    setIssueDate(null);
    setContent(null);
  }

  const btnConfirm = (ev) => {
    ev.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('issueDate', issueDate);
    formData.append('content', content);
    formData.append('fileName', fileName);
        
    fetch("http://localhost:8080/news", {
        method: "POST",
        body: formData,
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
    .then((res) => {
      lastStatus = res.status;
      return res.json();
    })
    .then((data) => {
        console.log(data);
        console.log(lastStatus);
        if(lastStatus === 201){
            localStorage.setItem('data', JSON.stringify(data.data));
            // history('/confirmed');
            console.log(data.data);
            setMessage('News added.');
            resetForm();
        }        
    })
    .catch(err => {
        // console.log("we have a problem " + err.message);
        setMessage("we have a problem " + err.message);
      });
    }

  return (
    <Form onSubmit={(ev) =>{btnConfirm(ev)}}>
    <div style={{width:"600px", backgroundColor:"pink"}}>Classes
      <Label>
        <Input required placeholder="Name" type="text" value={name!=null?name:''} onChange={(e)=>setName(e.target.value)} />
      </Label>
      <br/>
      OpenDate:<DateSelect placeholder="issueDate" selectedDate={issueDate} setselectedDate={setIssueDate} value={issueDate!=null?issueDate:''} />
      <br/>
      <Label>
        Select a picture:<input type="fileName" onChange={handleChange}/>
      </Label>
      <br/>
      <Label>
        <Input required placeholder="Content" type="text" value={content!=null?content:''} onChange={(e)=>setContent(e.target.value)} />
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