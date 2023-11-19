import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './UpdateBook.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function UpdateBooks() {
    const id=useParams().id;
    const books={
        bookname:"",
        author:"",
        description:"",
        image:"",
        price:"",
        stockstatus:"",
        category:""
    }
    const navigate=useNavigate();
    const [Data,setData]=useState(books);
    const [catData,setCatData]=useState([])

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
    const fetchCategory=async()=>{
        await axios.get("http://localhost:1000/api/v1/getCategory")
        .then(res=>setCatData(res.data.cat))
        .catch(error=>console.log(error));
    }
    fetchCategory();
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
    <>
    <div className=''>

            <h3 className='text-center p-3'><b> Update Books </b></h3>

            <b> <Link className='text-decoration-none' style={{marginLeft:'130px',fontSize:"medium",marginTop:"50px",color:"grey"}} to="/books"><i style={{fontSize:"small"}} class="fa-solid fa-chevron-left"></i> Back To Books</Link> </b>
    <form onSubmit={submit} style={{width:"82vw",marginBottom:"4vh"}}>
        <div className=' d-flex justify-content-center align-items-center' style={{minHeight:"91.5vh"}}>



        <div className='container p-4'>
            <div className="mb-3" style={{textAlign:"left"}}>
                <label for="exampleFormControlInput1" className="" 
                style={{fontSize:"large",fontWeight:"bold"}}
                >Book Name</label>
                <input type="text" name='bookname' value={Data && Data.bookname} className="form-control" 
                style={{pointerEvents:"all"}} id="exampleFormControlInput1" placeholder="Enter Book Name" autoComplete='off' onChange={change}/>
            </div>
            
        
            <div className="mb-3" style={{textAlign:"left"}}>
                <label for="exampleFormControlInput1" className="" 
                style={{fontSize:"large",fontWeight:"bold"}}
                >Author</label>
                <input type="text" style={{pointerEvents:"all"}} name='author' value={Data && Data.author}  onChange={change} className="form-control" id="exampleFormControlInput1" placeholder="Enter The Name Of Author" autoComplete='off'/>
            </div>
            <div className="mb-3" style={{textAlign:"left"}}>
                <label for="exampleFormControlInput1" className=""
                style={{fontSize:"large",fontWeight:"bold"}}
                >Description</label>
                <input style={{pointerEvents:"all"}} type="text" name='description' value={Data && Data.description} onChange={change} className="form-control" id="exampleFormControlInput1" placeholder='Enter The Description' autoComplete='off'/>
            
        </div>
            <div className="mb-3" style={{textAlign:"left"}}>
                <label for="exampleFormControlInput1" className=""
                style={{fontSize:"large",fontWeight:"bold"}}
                >Image Url</label>
                <input style={{pointerEvents:"all"}} type="text" name='image' value={Data && Data.image} onChange={change} className="form-control" id="exampleFormControlInput1" placeholder="Enter The URL Of The Image" autoComplete='off'/>
            </div>
            <div className="mb-3" style={{textAlign:"left"}}>
                <label for="exampleFormControlInput1" className=""
                style={{fontSize:"large",fontWeight:"bold"}}
                >Price</label>
                <input style={{pointerEvents:"all"}} type="number" name='price' value={Data && Data.price} onChange={change} className="form-control" id="exampleFormControlInput1" placeholder="Enter The Price Of Book" autoComplete='off'/>
            </div>
            <div className="mb-3">
            <label for="exampleFormControlInput1" style={{fontSize:"large",fontWeight:"bold",marginRight:"69vw"}} className="form-label">Stock Status</label> <br/>

                <select className='' name="stockstatus"  style={{padding:"7px",width:'76vw',border:'1px solid silver',borderRadius:"7px",marginTop:"12px"}} onChange={change} >
                    <option  value={Data && Data.stockstatus}>{Data && Data.stockstatus}</option>
                  <option value='Available for purchase'>Available for purchase</option>

                    <option value='Currently unavailable'>Currently unavailable</option>

                </select>
            </div>
            <div className="mb-3">
            <label for="exampleFormControlInput1" style={{fontSize:"large",fontWeight:"bold",marginRight:"69vw"}} className="form-label">Category</label> <br/>

                <select className='' name="category"  style={{padding:"7px",width:'76vw',border:'1px solid silver',borderRadius:"7px",marginTop:"12px"}} onChange={change} >
                    <option  value={Data && Data.category}>{Data && Data.category}</option>
                    {catData.map((item,index)=>(

                       <option  value={item.catname}>{item.catname}</option>
                    ))}

                </select>
            </div>
            <div className='btnDiv' style={{display:"grid",gridTemplateColumns:"auto auto",justifyContent:"space-between"}}>
            <button className='btn btn-success' style={{width:"7vw",fontSize:"larger",fontWeight:"bolder"}} type='submit'>Update</button>
            <Link className='btn btn-danger' style={{width:"7vw",fontSize:"larger",fontWeight:"bolder"}} to={'/books'}>Cancel</Link>
            </div>
        </div>
    </div>
    </form>
    </div>
    </>
)
}

export default UpdateBooks