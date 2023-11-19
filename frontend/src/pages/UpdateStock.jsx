import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom'

const UpdateStock = () => {

 const {id,stock}=useParams();
  const stockStatus={
    stockstatus:""
  }
  const [data,setData]=useState(stockStatus);
  const navigate=useNavigate();
  useEffect(()=>{
    axios.get(`http://localhost:1000/api/v1/getBooksById/${id}`)
    .then(res=>setData(res.data.book))
    .catch(error=>console.log(error));
  },[id])


  const change=(e)=>{
    

    const{name,value}=e.target; //here as we are directly distructuring the fields so no need to write e.target.name and e.target.value seperately, only need to write e.target as common for destructured fields
    setData({...data,[name]:value});

}


   const submit=async(e)=>{

        e.preventDefault();
        
        await axios.put(`http://localhost:1000/api/v1/updateStock/${id}`,data)
        .then((res)=>{
            toast.success(<b>{res.data.message}</b>);
            navigate(`/bookStock/${stock}`);

        }).catch((error)=>{
            console.log(error);
        })
    }

  
  return (
  <>

<h3 className='text-center p-3'><b> Update Stock Status </b></h3>
<div style={{width:"70%",marginLeft:"auto",marginRight:"auto",border:"1px solid silver",borderRadius:"7px",padding:"20px",marginTop:"16vh"}}>
      <form onSubmit={submit} style={{padding:"22px",border:"none",width:"auto"}}>
      <h4 style={{textAlign:"center",color:"grey"}}><b>{data.bookname}</b> </h4> 
      <h5 style={{textAlign:"center",color:"grey"}}>by <b>{data.author}</b></h5>
      <label for="exampleFormControlInput1" style={{fontSize:"large",fontWeight:"bold",marginRight:"57vw"}} className="form-label">Update Stock</label> <br/>

      <select className='' name="stockstatus"  style={{padding:"10px",width:'64vw',border:'1px solid silver',borderRadius:"7px",marginTop:"1vh"}} onChange={change} >
          <option  value={data && data.stockstatus}>{data && data.stockstatus}</option>
          {data.stockstatus==="Available for purchase" && <option value='Currently unavailable'>Currently unavailable</option> }
          {data.stockstatus==="Currently unavailable" && <option value='Available for purchase'>Available for purchase</option>}
          
  
      </select>
      <div className='btnDiv' style={{display:"grid",gridTemplateColumns:"auto auto",justifyContent:"space-between"}}>
            <button className='btn btn-success' style={{width:"7vw",fontSize:"larger",fontWeight:"bold",marginTop:"4vh"}} type='submit'>Update</button>
            <Link to={`/bookStock/${stock}`} className='btn btn-danger' style={{width:"7vw",fontSize:"larger",fontWeight:"bold",marginTop:"4vh"}} type='submit'>Cancel</Link>
            </div>
      </form>
      </div>
  </>  
)
}

export default UpdateStock