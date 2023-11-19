import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import NavbarIndex from '../components/NavbarIndex';
import Footer from '../components/Footer';

const Login = () => {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:1000/api/v1/login',{email,password})
        .then(result=>{
            console.log(result);
            if(result.data==="Success"){ //if result is there
                navigate("/adminPanel");
                toast.success(<b>Login Successful</b>)
            }
            else if(result.data==="Invalid credentials"){
                toast.error(<b>Invalid email or password</b>)

            }
            else{
                toast.error(<b>User does not exist</b>)

            }
        })
        .catch(err=>console.log(err));
    }
  return (
    
    <div style={{minHeight:"84.4vh"}}>
        <NavbarIndex/>
            <div style={{
                height:'62.4vh',
                width: '37%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '10%'
                
                }}>

            <form onSubmit={handleSubmit}>
                <h3 style={{marginBottom:"20px",color:"blue"}}><b> Admin Login </b></h3>
                    <input type='email' style={{marginLeft:"7px",width:"33vw",pointerEvents:"all"}}  placeholder='Enter Email' autoComplete='off' name='email' onChange={(e)=>{setEmail(e.target.value)}}/>
                <br/>
                


                <input type='password' style={{marginLeft:"7px",width:"33vw",pointerEvents:"all"}} placeholder='Enter Password' autoComplete='off' name='password' onChange={(e)=>{setPassword(e.target.value)}}/> 

            <br/>
            <button style={{background:"blue"}}  type='submit'>Login</button>
        </form>
            </div>
           
                <Footer/>
    </div>
  )
}

export default Login