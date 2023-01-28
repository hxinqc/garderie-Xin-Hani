import React from "react";
import { useState } from "react";
import styled from "styled-components";

// useHystory in 'react-router' ver.6
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");

  const registrUser = (e) => {
    e.preventDefault();

    if (password != Cpassword) {
      alert("Your entered passwords doesn't match. Please try again!");
      return true;
    }
    fetch("`http://localhost:8080/newUser", {
        method: "POST",
        body: JSON.stringify({
            firstName:firstName,
            lastName:lastName,
            role:role,
            email: email,
            plain_password: password
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.status === 400){
            alert(data.msg)
            
        }
        if(data.status === 200){
            alert(data.msg)
            localStorage.setItem('Current_User', email)
            // after registration, directly going to the login page
            // using react router dom ver.6 usehystory=navigate
            navigate('/Login');

        } 
    })
    .catch(err => {
        console.log("we have a problem " + err.message)});


  };

  return (
    <Registerdiv>
      <Registerform
        onSubmit={(e) => {
          registrUser(e);
        }}
      >
        <RegisterSpan>Register</RegisterSpan>

        <Registerlabel>First Name</Registerlabel>
        <Registerinput
          type="text"
          name="firstName"
          placeholder="Enter Your First Name ..."
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <Registerlabel>Last Name</Registerlabel>
        <Registerinput
          type="text"
          name="lastName"
          placeholder="Enter Your Last Name ..."
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <Registerlabel>Role</Registerlabel>
        <Registerinput
          type="text"
          name="role"
          placeholder="Enter Your Role ..."
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <Registerlabel>Email</Registerlabel>
        <Registerinput
          type="text"
          name="email"
          placeholder="Enter Your Email ..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Registerlabel>Password</Registerlabel>
        <Registerinput
          type="password"
          name="passwoed"
          placeholder="Choose a Passwoed ..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <Textlabel>
          Use 8 or more characters with a mix of letters, numbers and symbols
        </Textlabel>

        <Registerlabel>Confirm Password</Registerlabel>
        <Registerinput
          type="password"
          name="confirmPassword"
          placeholder="Confirm the Passwoed ..."
          onChange={(e) => setCPassword(e.target.value)}
        />

        <RegisterButton type="submit">Register</RegisterButton>
      </Registerform>
    </Registerdiv>
  );
};

const Registerdiv = styled.div``;

const Registerform = styled.form``;

const RegisterSpan = styled.span``;

const Registerlabel = styled.label``;

const Registerinput = styled.input``;

const Textlabel = styled.label``;

const RegisterButton = styled.button``;

export default Register;
