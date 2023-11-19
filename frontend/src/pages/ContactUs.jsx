import React, { useState } from 'react'
import NavbarIndex from '../components/NavbarIndex'
import Footer from '../components/Footer'
import axios from 'axios';
import toast from 'react-hot-toast';

const ContactUs = () => {
  
  const [contact,setContact]=useState({
      fname:"",
      email:"",
      description:"",
      cresponse:"pending"

  });

  const handleChange=(e)=>{
      const {name,value}=e.target;
    setContact({...contact,[name]:value})
  }
  console.log(contact);
  const handleSubmit=async(e)=>{
    e.preventDefault();
   
    try {
      const response = await axios.post("http://localhost:1000/api/v1/addContact", contact);
      toast.success(<b>{response.data.message}</b>);
    } catch (error) {
      // Handle error, display an error message
      console.error('Error submitting contact form:', error);
      toast.error(<b>Error submitting contact form</b>);
    }
  }
  return (
    <>
    <NavbarIndex/>
    <div style={{minHeight:"84.5vh"}}>
    <h3 style={{marginTop:"2vh",textAlign:"center"}}>Contact Us</h3>
      <div className='boxes' style={{display:"grid",gridTemplateColumns:"auto auto",width:"79%",marginLeft:"auto",marginRight:"auto",border:"1px solid silver",borderRadius:"7px",padding:"20px"}}>
          <div className='description' style={{width:"37vw",textAlign:"justify",marginTop:"2vh"}}>

            <img src='https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg' style={{height:"46vh",width:"37vw"}} alt='/'/>

              <h5 style={{marginTop:"5vh"}}>
                Fill out this form in order to get in touch with us. You can do inquiry for any books according to your needs. You can ask for books information like price, date of publication or you urgently need any book.   
                
              </h5>
          </div>
          <div className='inputs' style={{marginLeft:"2vw"}}>
                <label><h5><b>Name: </b> </h5></label>

                <br/>
                <input type='text' name='fname' placeholder='Enter your name' onChange={handleChange} autoComplete='off'/>

                <br/>

                <label><h5><b>Email: </b></h5></label>

                <br/>

                <input type='email' name='email' placeholder='Enter your email' onChange={handleChange} autoComplete='off'/>

                <br/>
                <label><h5><b>Description:</b></h5><h6 style={{color:"red"}} ><b> Enter your inquiry details regarding book</b></h6></label>

                <br/>

                <textarea type='text' name='description' style={{width:"36vw",border:"1px solid silver",padding:"10px",borderRadius:"7px",marginTop:"2vh"}} onChange={handleChange} autoComplete='off'/>

                <br/>
                <button style={{marginTop:"2vh",width:"7vw", background:"#eb8e0e"}} onClick={handleSubmit}>Submit</button>

          </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default ContactUs