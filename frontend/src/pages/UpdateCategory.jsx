import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom'

const UpdateCategory = () => {
  const id=useParams().id;
  const categories={
    catname:""
  }
  const [data,setData]=useState(categories);
  const navigate=useNavigate();

  useEffect(()=>{
      axios.get(`http://localhost:1000/api/v1/getCategoryById/${id}`)
      .then(res=>{
        console.log(res.data.cat);
        setData(res.data.cat)
      })
  },[id])

  const change=(e)=>{
    
    const {name,value}=e.target;
    setData({...data,[name]:value});
  }

  const submit=async(e)=>{
    
    e.preventDefault();

    await axios.put(`http://localhost:1000/api/v1/updateCategory/${id}`,data)
    .then(res=>{
      toast.success(res.data.message);
      navigate("/category");
    })
    .catch(error=>console.log(error));
  }
  return (
    <div><h3 style={{textAlign:"center"}}><b>Update Category</b></h3>

    <div>
    <form onSubmit={submit} style={{
      width: '40%',
      marginLeft: 'auto',
      marginRight:' auto',
      border: '1px solid silver',
      marginTop: '28vh',
      padding: '20px',
      borderRadius: '7px'
    }}>
    <label style={{fontSize:"larger",marginRight:"32vw"}}><b>Category</b></label>
      <input type='text' style={{width:"37.2vw",pointerEvents:"all"}} name="catname" placeholder='Enter the category' onChange={change} value={data && data.catname} autoComplete='off'/>
      <div style={{display:"grid",gridTemplateColumns:"auto auto",justifyContent:"space-between"}}>
      <button className='btn btn-success' style={{width:"7vw",fontSize:"larger",fontWeight:"bold"}} type='submit'>UPDATE</button>
      <Link to={'/category'} style={{fontSize:"larger",fontWeight:"bold"}} className='btn btn-danger'>CANCEL</Link>

      </div>
    </form>
    </div>
</div>
  )
}

export default UpdateCategory