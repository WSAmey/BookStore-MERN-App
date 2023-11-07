import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Books() {

  const [Data,setData]=useState([]);
 useEffect(()=>{
    const fetch=async ()=>{
     const response= await axios.get("http://localhost:1000/api/v1/getBooks")
      setData(response.data.books)
    };

    fetch();
 },[])

 
  const deleteBook=async(id)=>{
    console.log("delete book method");
    await axios.delete(`http://localhost:1000/api/v1/deleteBook/${id}`)
    .then((response)=>{ //here as we are removing data from database then we also need to remove the 
                        //data from state as well so in setUSers, prevuser parameter holds the previous data in state
      setData((prevData)=>prevData.filter((book)=>book._id!==id))
      toast.success(<b>{response.data.message}</b>)
      // navigate("/")
    })
  }

  return (
    <>
    <div className='bg-dark' style={{minHeight:"91.5vh"}}>
      <div className='d-flex justify-content-center align-items-center py-3'>
        <h4 className='text-white'>Books Section</h4>
      </div>
      {Data ? 
      (

        

        <div className='d-flex justify-content-around align-items-center flex-wrap'>
        {Data && Data.map((item,index)=>
        (<div className='m-3' style={{width:'200px',height:"350px",border:"1px solid white",borderRadius:"7px"}}>
        <div> <img style={{width:'200px',height:'210px',borderTopLeftRadius:'7px',borderTopRightRadius:"7px"}} className='img-fluid' src={item.image} alt='/'/></div>
        <h6 style={{fontSize:"15px"}} className='px-2 my-1 text-white'>{item.bookname.slice(0,20)}... 
        <Link to={`/viewMore/${item._id}`} style={{textDecoration:"none"}}>View More</Link>
         </h6>
        <b style={{fontSize:"30px",  color:"red"}} className='px-2'>&#x20B9; {item.price}  </b>
       <div className='d-flex justify-content-around align-items-center my-2'>
       <Link to={`/updateBook/${item._id}`} className='btn btn-primary'>UPDATE</Link>

        <button className='btn btn-danger' onClick={()=>{deleteBook(item._id)}}>DELETE</button>
       </div>

        </div>))}
    </div>
          ):(
        <div className='text-white'>Loading...</div>
      ) }
    </div>
   
    </>
  )
}

export default Books