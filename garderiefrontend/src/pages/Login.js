import React from 'react'
import {UserConstext,useState} from 'react'
import styled from 'styled-components'
// in 'react-router' ver.6 instead of useHystory
import { useNavigate } from 'react-router'



const Login= ()=> {

  const [userName,setUserName]=useState('');
  const [password,setPassword]=useState('');
  const[role,setRole]=useState('');
  const navigate = useNavigate();


  const signing_in=(e)=>{
    e.preventDefault();
    fetch("/api/sign-in", {
        method: "POST",
        body: JSON.stringify({
            userName: userName,
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
           setRole(data.token.role)
           navigate('/Home');

        } 
    })
    .catch(err => {
        console.log("we have a problem " + err.message)});

}

  
  return (
    <div>
        <Logindiv>

<Loginform onSubmit={(e) =>{signing_in(e)}}>
    {/* <img src={LoginBackground}/> */}
    <LoginSpan>Login</LoginSpan>

    <Loginlabel>User Name</Loginlabel>
    <Logininput type="text" value={userName} onChange={e=> setUserName(e.target.value)}/>

    <Loginlabel>Password</Loginlabel>
    <Logininput type="password" placeholder="Enter your passwoed ..." onChange={e=> setPassword(e.target.value)}/>

    <LoginButton>Login</LoginButton>

 </Loginform>


</Logindiv>
    </div>
  )
}

const Logindiv = styled.div`
height: calc(100vh - 50px);
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
background-size: cover;

`;

const LoginSpan=styled.span`
font-size: 50px;
color: white;

`;

const Loginform=styled.form`
margin-top:20px;
display: flex;
flex-direction: column;

`

const Loginlabel = styled.label`
margin: 10px 0;
color: white;

`
const Logininput= styled.input`
padding:10px;
background-color: white;
border: none;

`

const LoginButton=styled.button`
margin-top: 20px;
cursor: pointer;
background-color:  #ffd617;
border: none;
border-radius:10px;
padding: 10px;


`

const LoginRegisterButton= styled.button`
position: absolute;
top:60px;
right:20px;
background-color:#444;
cursor: pointer;
border:none;
padding: 10px;
border-radius: 10px;
color: white;


`

export default Login