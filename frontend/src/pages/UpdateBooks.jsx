import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'

function UpdateBooks() {
    const id=useParams().id;
    const books={
        bookname:"",
        author:"",
        description:"",
        image:"",
        price:""
    }
    const navigate=useNavigate();
    const [Data,setData]=useState(books);
    const change=(e)=>{
    

        const{name,value}=e.target; //here as we are directly distructuring the fields so no need to write e.target.name and e.target.value seperately, only need to write e.target as common for destructured fields
        setData({...Data,[name]:value});
   
    }

    useEffect(()=>{
        axios.get(`http://localhost:1000/api/v1/getBooksById/${id}`)
        .then((response) => {
          setData(response.data.book)
        //   console.log(response);
        //   console.log("response: ", response.data.book);
          // response.data.book
        })
        .catch((error) => console.log(error));
    },[id]) 

    const submit=async(e)=>{

        e.preventDefault();
        
        await axios.put(`http://localhost:1000/api/v1/updateBook/${id}`,Data)
        .then((res)=>{
            toast.success(<b>{res.data.message}</b>);
            navigate("/books");

        }).catch((error)=>{
            console.log(error);
        })
    }
console.log(Data);
  return (
    <div className='bg-dark'>

            <h4 className='text-white bg-dark text-center p-3'>Update Books</h4>

            <Link className='text-decoration-none' style={{marginLeft:'122px',fontSize:"x-large",marginTop:"50px",color:"silver",border:'1px solid silver',borderRadius:'7px',padding:'10px'}} to="/books">Back</Link>
    <form onSubmit={submit}>
        <div className='bg-dark d-flex justify-content-center align-items-center' style={{minHeight:"91.5vh"}}>

        <div className='container p-4'>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label text-white">Book Name</label>
                <input type="text" name='bookname' value={Data && Data.bookname} className="form-control" id="exampleFormControlInput1" placeholder="Enter Book Name" autoComplete='off' onChange={change}/>
            </div>
            
        
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label text-white">Author</label>
                <input type="text" name='author' value={Data && Data.author}  onChange={change} className="form-control" id="exampleFormControlInput1" placeholder="Enter The Name Of Author" autoComplete='off'/>
            </div>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label text-white">Description</label>
                <input type="text" name='description' value={Data && Data.description} onChange={change} className="form-control" id="exampleFormControlInput1" placeholder='Enter The Description' autoComplete='off'/>
            
        </div>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label text-white">Image Url</label>
                <input type="text" name='image' value={Data && Data.image} onChange={change} className="form-control" id="exampleFormControlInput1" placeholder="Enter The URL Of The Image" autoComplete='off'/>
            </div>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label text-white">Price</label>
                <input type="number" name='price' value={Data && Data.price} onChange={change} className="form-control" id="exampleFormControlInput1" placeholder="Enter The Price Of Book" autoComplete='off'/>
            </div>
            <button className='btn btn-success' type='submit'>Submit</button>
        </div>
    </div>
    </form>
    </div>
)
}

export default UpdateBooks