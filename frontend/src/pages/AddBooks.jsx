import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

function AddBooks() {
    const navigate=useNavigate();
    const [Data,setData]=useState({
        bookname:"",
        author:"",
        description:"",
        image:"",
        price:""
    })

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
    <div className='bg-dark'>
            <h4 className='text-white bg-dark text-center p-3'>Add Books</h4>
            <Link className='text-decoration-none' style={{marginLeft:'122px',fontSize:"x-large",marginTop:"50px",color:"silver",border:'1px solid silver',borderRadius:'7px',padding:'10px'}} to="/books">Back</Link>
    <div className='bg-dark d-flex justify-content-center align-items-center' style={{minHeight:"91.5vh"}}>

        <div className='container p-4'>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label text-white">Book Name</label>
                <input type="text" name='bookname' value={Data.bookname} className="form-control" id="exampleFormControlInput1" placeholder="Enter Book Name" autoComplete='off' onChange={change}/>
            </div>
            
        
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label text-white">Author</label>
                <input type="text" name='author' value={Data.author}  onChange={change} className="form-control" id="exampleFormControlInput1" autoComplete='off' placeholder="Enter The Name Of Author"/>
            </div>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label text-white">Description</label>
                <input type="text" name='description' value={Data.description} onChange={change} className="form-control" id="exampleFormControlInput1" autoComplete='off' placeholder="Enter Description Of The Book"/>
            
        </div>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label text-white">Image Url</label>
                <input type="text" name='image' value={Data.image} onChange={change} className="form-control" id="exampleFormControlInput1" autoComplete='off' placeholder="Enter The URL Of The Image"/>
            </div>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label text-white">Price</label>
                <input type="number" name='price' value={Data.price} onChange={change} className="form-control" id="exampleFormControlInput1" autoComplete='off' placeholder="Enter The Price Of Book"/>
            </div>
            <button className='btn btn-success' onClick={submit}>Submit</button>
        </div>
    </div>
    </div>
)
}

export default AddBooks