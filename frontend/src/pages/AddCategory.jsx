import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

const AddCategory = () => {
  
  const category={
    catname:""
  }
  const [data,setData]=useState(category);
  const navigate=useNavigate();


  const change=(e)=>{
    const {name,value}=e.target
    setData({...data,[name]:value})
  }

  const submit=async()=>{
    await axios.post("http://localhost:1000/api/v1/addCategory",data)
    .then(res=>{
      toast.success(res.data.message);
      navigate("/category")
    }
    
    )
    .catch(error=>console.log(error));

  }
  return (
    
    <div>
        <h3 style={{textAlign:"center",marginTop:"2vh"}}><b>Add Category</b></h3>

        <div style={{
          width: '40%',
          marginLeft: 'auto',
          marginRight:' auto',
          border: '1px solid silver',
          marginTop: '28vh',
          padding: '20px',
          borderRadius: '7px'
        }}>
        <label style={{fontSize:"larger"}}><b>Category</b></label>
          <input type='text' style={{width:"37.2vw",pointerEvents:"all"}} name="catname" placeholder='Enter the category' onChange={change} autoComplete='off'/>
          <div style={{display:"grid",gridTemplateColumns:"auto auto",justifyContent:"space-between"}}>
          <button className='btn btn-success' style={{width:"5vw",fontSize:"larger",fontWeight:"bold"}} onClick={submit}>ADD</button>
          <Link to={'/category'} style={{fontSize:"larger",fontWeight:"bold"}} className='btn btn-danger'>CANCEL</Link>

          </div>
        </div>
    </div>
  )
}

export default AddCategory