import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

export default function ViewAdmin() {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [isActive, setIsActive] = useState();
  const { adminId } = useParams();
  
  const retrieveData =() => {
    fetch(`http://localhost:8080/admin/${adminId}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setName(data.name);
        setDescription(data.description);

        if (data.isActive) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      })
      .catch(err => {
        console.log("we have a problem " + err.message);
      });
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <Form>
    <div style={{width:"600px", backgroundColor:"pink"}}>View Teacher:
      <br />
      <Label>
        name: {name!=null?name:''} 
      </Label>
      <br/>
      <Label>
        password: ****
      </Label>
      <br/>
      <Label>
        description: {description!=null?description:''} 
      </Label>
      <br/>
      <Label>
        isActive: {isActive?'true':'false'}
      </Label>
      <br/>

      <Link className="btn btn-primary mx-2" to={"/Admins"} >Back to admins</Link>
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
