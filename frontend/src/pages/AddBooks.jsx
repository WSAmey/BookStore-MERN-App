import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AddBooks() {
    const navigate=useNavigate();
    const [Data,setData]=useState({
        bookname:"",
        author:"",
        description:"",
        image:"",
        price:"",
        stockstatus:"Available for purchase",
        category:""
    })
    const [catData,setCatData]=useState([])
    useEffect(()=>{
        const fetchCategory=async()=>{
            await axios.get("http://localhost:1000/api/v1/getCategory")
            .then(res=>setCatData(res.data.cat))
            .catch(error=>console.log(error));
        }
        fetchCategory();
      
    },[])
    const change=(e)=>{
    

        const{name,value}=e.target; //here as we are directly distructuring the fields so no need to write e.target.name and e.target.value seperately, only need to write e.target as common for destructured fields
        setData({...Data,[name]:value});
   
    }
    const submit=async(e)=>{

        e.preventDefault();
        
        await axios.post("http://localhost:1000/api/v1/add",Data)
        .then((res)=>{
            toast.success(<b>{res.data.message}</b>);
            navigate("/books");

        })
    }
console.log(Data);
  return (
    <>
    <div className=''>
            <h3 className=' text-center p-3'><b>Add Books</b></h3>
          
    <div className=' d-flex justify-content-center align-items-center' style={{minHeight:"91.5vh"}}>



        <div className='container p-4'>

        <div className="mb-3">
                <label for="exampleFormControlInput1" style={{fontSize:"large",fontWeight:"bold"}} className="form-label">Category</label> <br/>

                <select name="category" style={{padding:"7px",width:'83vw',border:'1px solid silver',borderRadius:"7px",marginTop:"12px"}} onChange={change} required>
                <option>-- Select Category --</option>
                    {catData.map((item,index)=>(

                    <option  value={item.catname}>{item.catname}</option>
                    ))}
                    
                </select>
            </div>
            <div className="mb-3">
                <label for="exampleFormControlInput1" style={{fontSize:"large",fontWeight:"bold"}} className="form-label">Book Name</label>
                <input type="text" name='bookname' value={Data.bookname} className="form-control" id="exampleFormControlInput1" style={{pointerEvents:"all"}} placeholder="Enter Book Name" autoComplete='off' onChange={change} required/>
            </div>
            
        
            <div className="mb-3">
                <label for="exampleFormControlInput1" style={{fontSize:"large",fontWeight:"bold"}} className="form-label">Author</label>
                <input type="text" name='author' value={Data.author} style={{pointerEvents:"all"}}  onChange={change} className="form-control" id="exampleFormControlInput1" autoComplete='off' placeholder="Enter The Name Of Author" required/>
            </div>
            <div className="mb-3">
                <label for="exampleFormControlInput1" style={{fontSize:"large",fontWeight:"bold"}} className="form-label">Description</label>
                <textarea type="text" name='description' style={{pointerEvents:"all",padding:'10px'}} value={Data.description} onChange={change} className="form-control" id="exampleFormControlInput1" autoComplete='off' placeholder="Enter Description Of The Book" required/>
            
        </div>
            <div className="mb-3">
                <label for="exampleFormControlInput1" style={{fontSize:"large",fontWeight:"bold"}} className="form-label">Image Url</label> 
                <input type="text" name='image' value={Data.image} style={{pointerEvents:"all"}} onChange={change} className="form-control" id="exampleFormControlInput1" autoComplete='off' placeholder="Enter The URL Of The Image" required/>
            </div>
            <div className="mb-3">
                <label for="exampleFormControlInput1" style={{fontSize:"large",fontWeight:"bold"}} className="form-label">Price</label>
                <input type="number" name='price' value={Data.price} style={{pointerEvents:"all"}} onChange={change} className="form-control" id="exampleFormControlInput1" autoComplete='off' placeholder="Enter The Price Of Book" required/>
            </div>
           <div style={{display:"grid",gridTemplateColumns:"auto auto",justifyContent:"space-between"}}>
            <button className='btn btn-success' style={{width:"7vw",fontSize:"larger",fontWeight:"bolder"}} onClick={submit} type='submit'>Add</button>
            <Link className='btn btn-danger' style={{width:"7vw",fontSize:"larger",fontWeight:"bolder"}} to="/books"> Cancel</Link>
            </div>
        </div>
    </div>
    </div>
    </>
)
}

export default AddBooks