import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

import axios from 'axios'

const ContactInquiries = () => {

  const[data,setData]=useState([]);

  useEffect(()=>{
    const fetch=async()=>{
      const response = await axios.get("http://localhost:1000/api/v1/getContacts")
      setData(response.data);
      console.log(response);
    };
    fetch();
  },[])



  return (
    <>
    <Navbar/>
    <div style={{minHeight:"84.5vh"}}>
    <h3 style={{textAlign:"center",marginTop:"5vh"}}><b>Manage Support</b></h3>

    <div className='tablediv' style={{marginTop:"4vh",padding:"16px",width:"90%",marginLeft:"auto",marginRight:"auto",boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",borderRadius:"7px"}}>
    <table class="table table-borderless" style={{border:"none", Weight:"bold"}}>
  <thead className='text-center' style={{ fontSize:"medium", Weight:"bold"}}>
    <tr>
      <th style={{color:"white",background:"#3e79e0",borderTopLeftRadius:"7px",borderBottomLeftRadius:"7px"}} scope="col"><h4>#</h4></th>
      <th scope="col" style={{color:"white",background:"#3e79e0"}}><h5>Name</h5></th>
      <th scope="col" style={{color:"white",background:"#3e79e0"}}><h5>Email</h5></th>
      <th scope="col" style={{color:"white", background:"#3e79e0"}}><h5>Inquiry Description</h5></th>
      <th scope="col" style={{color:"white", background:"#3e79e0"}}><h5>Date</h5></th>

      <th scope="col" style={{color:"white", background:"#3e79e0"}}><h5>Mail Response</h5></th>
      <th scope="col" style={{color:"white", background:"#3e79e0"}}><h5>Mail</h5></th>
      <th scope="col" style={{color:"white", background:"#3e79e0",borderTopRightRadius:"7px",borderBottomRightRadius:"7px"}}><h5>Update Response</h5></th>


    </tr>
  </thead>
  <tbody className='text-center' style={{ Size:"larger"}}>
  {data.map((item,index)=>(
    <tr>
   
      <td style={{fontWeight:"bold",fontSize:"large"}}>{index+1}</td>
      <td style={{fontWeight:"bold",fontSize:"large"}}>{item.fname}</td>
      <td style={{fontWeight:"bold",fontSize:"large"}}>{item.email}</td>
      <td style={{fontWeight:"bold",fontSize:"large"}}>{item.description}</td>
      <td style={{fontWeight:"bold",fontSize:"large"}}>{new Date(item.entrydate).toLocaleDateString('en-GB')}
      {/* his code parses the date using new Date(item.entrydate) and then formats it using toLocaleDateString with the 'en-GB' locale, which results in the "DD/MM/YYYY" format.  */}
      </td>


      <td><p style={{padding:"10px",background:item.cresponse==="pending"?"red":"green",color:"white", borderRadius:"7px",width:"7vw",marginLeft:"auto",marginRight:"auto",fontSize:"large", fontWeight:"bold", Weight:"bold"}}>{item.cresponse}</p></td>
    
      <td><Link to={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${item.email}&su=Regarding book inquiry/help&body=Hi ${item.fname},%0D%0A%0D%0A%0D%0A%0D%0ARegards bookStore@help`} target='_blank' style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",fontSize:"x-large"}}><i className="fa-solid fa-envelope" style={{ Size:"x-large",background:"#0099ff",color:"white",padding:"10px",borderRadius:"5px",width:"5vw"}}></i></Link>  
</td>
      {/* https://mail.google.com/mail/?view=cm&fs=1&to=<%=r.getString("email")%>&su=Regarding Your Question Paper Request&body=Hi <%=r.getString("cname")%>, %0D%0DThe paper you have requested will be soon uploaded on our website, please check our website on regular basis.%0D%0DRegards pyq@help */}
      <td>
      
     {item.cresponse==="pending" && <Link to={`/updateContact/${item._id}`} className='btn btn-success'  style={{width:"6vw",color:"white", Size:"larger", Weight:"bolder",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}><i class="fa-solid fa-pen-to-square" style={{fontSize:"larger"}}></i></Link>}
     {item.cresponse==="responded" && <Link  className='btn btn-success' style={{width:"6vw",color:"white", Size:"larger", Weight:"bolder",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}><i class="fa-solid fa-check" style={{fontSize:"larger"}  }></i></Link>}
      </td>
    </tr>
  ))}
   
    
  </tbody>
</table>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default ContactInquiries