import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './UpdateContact.css'
const UpdateContact = () => {


    const id=useParams().id;
    const contacts={
        fname:"",
        email:"",
        description:"",
        cresponse:""
    }
    
    const navigate=useNavigate();
    const [Data,setData]=useState(contacts);
    const change=(e)=>{
    

        const{name,value}=e.target; //here as we are directly distructuring the fields so no need to write e.target.name and e.target.value seperately, only need to write e.target as common for destructured fields
        setData({...Data,[name]:value});
   
    }

    useEffect(()=>{
        axios.get(`http://localhost:1000/api/v1/getContactById/${id}`)
        .then((response) => {  
            
          setData(response.data.contact)
            console.log(response.data);
        })
        .catch((error) => console.log(error));
    },[id]) 

    const submit=async(e)=>{

        e.preventDefault();
        
        await axios.put(`http://localhost:1000/api/v1/updateContact/${id}`,Data)
        .then((res)=>{
            toast.success(<b>{res.data.message}</b>);
            navigate("/contactinquiry");

        }).catch((error)=>{
            console.log(error);
        })
    }

  return (
    <>
    <Navbar/>
    <div className=''>

    <h3 className='text-center p-3'><b> Update Response Status </b></h3>

    <b> <Link className='text-decoration-none' style={{marginLeft:'130px',fontSize:"medium",marginTop:"50px",color:"grey"}} to="/adminPanel"><i style={{fontSize:"small"}} class="fa-solid fa-chevron-left"></i> Back To Dashboard</Link> </b>
<form onSubmit={submit} style={{width:"82vw"}}>
<div className=' d-flex justify-content-center align-items-center' >

<div className='container p-4'>
    <div className="mb-3" style={{textAlign:"left"}}>
        <label for="exampleFormControlInput1" className="" 
        style={{fontSize:"large",fontWeight:"bold"}}
        >Name</label>
        <input type="text" name='fname' value={Data && Data.fname} onChange={change} className="form-control" id="exampleFormControlInput1" placeholder="Enter Book Name"  autoComplete='off'/>
    </div>
    

    <div className="mb-3" style={{textAlign:"left"}}>
        <label for="exampleFormControlInput1" className="" 
        style={{fontSize:"large",fontWeight:"bold"}}
        >Email</label>
        <input type="text" name='email' value={Data && Data.email} className="form-control" id="exampleFormControlInput1" placeholder="Enter The Name Of Author" autoComplete='off' onChange={change}/>
    </div>
    <div className="mb-3" style={{textAlign:"left"}}>
        <label for="exampleFormControlInput1" className=""
        style={{fontSize:"large",fontWeight:"bold"}}
        >Description</label>
        <textarea type="text" name='description' value={Data && Data.description} onChange={change}  className="form-control" id="exampleFormControlInput1" style={{marginTop:"2vh",height:"15vh"}} placeholder='Enter The Description' autoComplete='off'/>
    
</div>
    
    <div className="mb-3">
    <label for="exampleFormControlInput1" style={{fontSize:"large",fontWeight:"bold",marginRight:"67vw"}} className="form-label">Response Status</label> <br/>

        <select className='' name="cresponse"  style={{padding:"7px",width:'76vw',border:'1px solid silver',borderRadius:"7px",marginTop:"12px"}} onChange={change} >
            <option  value={Data && Data.cresponse}>{Data && Data.cresponse}</option>
          <option value='responded'>Responded</option>

        </select>
    </div>
    <div className='btnDiv' style={{textAlign:"left"}}>
    <button className='btn btn-success' style={{width:"7vw",fontSize:"larger",fontWeight:"bolder"}} type='submit'>Update</button>
    </div>
</div>
</div>
</form>
</div>
<Footer/>
</>
  )
}

export default UpdateContact