import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

import axios from 'axios'
import toast from 'react-hot-toast'

const Category = () => {

  const[data,setData]=useState([]);


  const fetch=async()=>{
    const response = await axios.get("http://localhost:1000/api/v1/getCategory")
    setData(response.data.cat);
    
  };

  useEffect(()=>{
   
    fetch();
  },[])

  const deleteBook=async(id)=>{
    console.log("delete book method");
    await axios.delete(`http://localhost:1000/api/v1/deleteCategory/${id}`)
    .then((response)=>{ //here as we are removing data from database then we also need to remove the 
                        //data from state as well so in setUSers, prevuser parameter holds the previous data in state
      setData((prevData)=>prevData.filter((book)=>book._id!==id))
      toast.success(<b>{response.data.message}</b>)
      // navigate("/")
    })
  }
  const search=(e)=>{
    const searchTerm = e.target.value.toLowerCase();
      const search=data.filter(item=>item.catname.toLowerCase().includes(searchTerm));
      if(searchTerm){
        setData(search)
      }
      else{
        fetch();
      }
  }

  return (
    <>
    <Navbar/>
    <div style={{minHeight:"84.5vh"}}>
    <h3 style={{textAlign:"center",marginTop:"2vh",marginBottom:"5vh"}}><b>Manage Categories</b></h3>

    <input
        className='mb-4 mt-2'
        type="text"
        placeholder="&#xF002; Search for category... "
       
        onChange={search}
        style={{
            padding:' 10px',
            boxSizing:' border-box',
            pointerEvents:"all",
            border: 'none',
            borderBottom:' 2px solid red',
            width: '46vw',
            fontFamily:"'Helvetica', FontAwesome, sans-serif",
            marginLeft:"26vw",
            fontSize:"larger"

        }}  
      />

    <div className='tablediv' style={{marginTop:"2vh",padding:"16px",width:"50%",marginLeft:"auto",marginRight:"auto",boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",borderRadius:"7px",paddingBottom:"2px"}}>
    <Link className='btn btn-warning' style={{fontSize:"large",fontWeight:"bold",marginBottom:"2vh",color:"white",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}} to={'/addCategory'}>Add Category</Link>
    <table class="table table-borderless" style={{border:"none", Weight:"bold"}}>
  <thead className='text-center' style={{ fontSize:"medium", Weight:"bold"}}>
    <tr>
      <th style={{color:"white",background:"#3e79e0",borderTopLeftRadius:"7px",borderBottomLeftRadius:"7px"}} scope="col"><h4>#</h4></th>
      <th scope="col" style={{color:"white",background:"#3e79e0"}}><h5>Category</h5></th>
      <th scope="col" style={{color:"white",background:"#3e79e0",borderTopRightRadius:"7px",borderBottomRightRadius:"7px"}}><h5>Action</h5></th>

    </tr>
  </thead>
  <tbody className='text-center' style={{ Size:"larger"}}>
  {data.map((item,index)=>(
    <tr>
   
      <td style={{fontWeight:"bold",fontSize:"large"}}>{index+1}</td>
      <td style={{fontWeight:"bold",fontSize:"large",width:"25vw"}}>{item.catname}</td>
      <td style={{fontWeight:"bold",fontSize:"large"}}>
        <div>
        <Link to={`/updateCategory/${item._id}`} style={{ background: 'green', width: '7vw', padding:"12px",border: 'none',fontSize:"large",fontWeight:"bold",boxShadow:' rgba(0, 0, 0, 0.24) 0px 3px 8px' }} className='btn btn-primary'>EDIT <i class="fa-solid fa-pen-to-square"></i></Link>
    <button className='btn btn-danger' style={{ width: '9vw', padding:"12px", background: 'red', marginLeft: '1vw',fontSize:"large",fontWeight:"bold",boxShadow:' rgba(0, 0, 0, 0.24) 0px 3px 8px' }} onClick={() => { deleteBook(item._id) }}>DELETE <i class="fa-solid fa-trash" style={{ color: 'white' }}></i></button>
        </div>
      </td>
     
      </tr>
    
  ))}
   
    
  </tbody>
</table>
    </div>
    {data.length===0 && <h4 style={{textAlign:"center",marginTop:"2vh"}}><b>No Result Found</b></h4>}

    </div>
    <Footer/>
    </>
  )
}

export default Category