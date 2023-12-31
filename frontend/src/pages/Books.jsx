import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Books.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Books() {

  const [Data,setData]=useState([]);
  const [catData,setCatData]=useState([]);

  
  const fetch=async ()=>{
    try {
      const response= await axios.get("http://localhost:1000/api/v1/getBooks")
      setData(response.data.books)
    } catch (error) {
      console.log("Error fetching data:", error);
    }

  };

  const getCategory=async()=>{
    await axios.get("http://localhost:1000/api/v1/getBookCategories")
    .then((res)=>{
      setCatData(res.data.bookcat);
    })
    .catch((error)=>{
      console.log(error);
    });
  };
 useEffect(()=>{
    
    fetch();
    getCategory();

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

  const filterBooks=(e)=>{
    const searchTerm=e.target.value;
    if(searchTerm){
     const search =Data.filter(item=>item.bookname.toLowerCase().includes(searchTerm));
     setData(search)
    }
    else{
      fetch();
    }
   
  }

  const catFilter=async(val)=>{
    if(val!=="All"){
      try {
        await axios.get(`http://localhost:1000/api/v1/getBooksByCategory/${val}`)
        .then(response=>setData(response.data.categoryBook));
      } catch (error) {
        console.log(error);
      }
    }
    else{
      fetch();
    }
    
    // console.log(val);
    // if(val!=="All"){
    //   const filterData=axios.get(`http://localhost:1000/api/v1/getBooksByCategory/${val}`);
    //   setData(filterData);
    // }
    // else{
    //   fetch();
    // }
    
  
  }
  return (
    <>
    <Navbar/>
    <div className='' style={{minHeight:"91.5vh"}}>
      <div className=''>
        <h3 className='text-center mt-3' style={{fontWeight:"bold"}}>Books Section</h3>
        <b>  <Link className='text-decoration-none' style={{marginLeft:'75px',fontSize:"medium",marginTop:"50px",color:"grey"}} to="/adminPanel"><i style={{fontSize:"small"}} class="fa-solid fa-chevron-left"></i> Back To Dashboard</Link> </b>
      </div>
      {Data ? 
      (

        
        <>
        <div>
       
        <input
        className='mb-4 mt-2'
        type="text"
        placeholder="&#xF002; &nbsp;&nbsp;&nbsp;Search for Books... "
        onChange={filterBooks}
        style={{
            padding:'7px',
            marginLeft:"32vw",
            background:"#f5f5f6",
            fontFamily:"'Helvetica', FontAwesome, sans-serif",
            border:"1px solid #f5f5f6",
            borderRadius:"5px",
            pointerEvents:"all",
            color:"grey"
            
        }}
      />
     </div>
       {Data.length>0 && <div style={{width:"84%",marginLeft:"6vw",marginBottom:"4vh"}}>{Data.length} results</div>}
         
        <div className='' style={
          {
          display:"grid",
          gridTemplateColumns:"auto auto",
          width:"90%",
          marginLeft:"auto",
          marginRight:"auto",
          justifyContent:'space-evenly',
          marginTop:"2vh",
          marginBottom:"7vh"          
          }
          }>
          <div className='cat' style={{marginRight:Data.length===0 ? "72.5vw":"0",width:"12vw"}}>
         
              <h4 style={{color:"grey",textAlign:"center"}}>Categories</h4>
              <hr/>
              <h6 style={{cursor:"pointer"}} onClick={()=>catFilter("All")}>All</h6>
              {catData.map((item,index)=>(
                <h6 style={{cursor:"pointer"}} onClick={()=>catFilter(item)}>{item}</h6>
              ))}

          </div>
          <div>
        {Data && Data.map((item,index)=>
        (
          <>
          
          
        <div className='bookCard' style={{ display:'flex', boxShadow:' rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '7px',marginBottom:"2vh",marginLeft:"2vh" }}>
  <div className='imagediv'>
    <img src={item.image} alt='/' style={{ borderTopLeftRadius: '7px', borderBottomLeftRadius: '7px', height: '40vh', width: '14vw' }} />
  </div>
  <div className='detailsdiv' style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
    <h5>{item.bookname}</h5>
    <h6 >by <b style={{ color: 'gray' }}> {item.author} </b> | <p style={{display:"inline-block",color:"black"}}>{item.category}</p></h6> 
    <h3 >&#x20B9;<b>{item.price} </b></h3>
    <h4 style={{ color: item.stockstatus === 'Available for purchase' ? 'green' : 'red',marginTop:"1vh" }}>{item.stockstatus}</h4>
    <h6 style={{ color: 'grey',marginBottom:"2vh" }}>
      {item.description.slice(0, 100)}...
      <Link to={`/viewMore/${item._id}`} style={{ textDecoration: 'none' }}>View More</Link>
    </h6>
    <div>
    <Link to={`/updateBook/${item._id}`} style={{ background: 'green', width: '7vw', padding:"12px",border: 'none',fontSize:"large",fontWeight:"bold" }} className='btn btn-primary'>EDIT <i class="fa-solid fa-pen-to-square"></i></Link>
    <button className='btn btn-danger' style={{ width: '9vw', padding:"12px", background: 'red', marginLeft: '1vw',fontSize:"large",fontWeight:"bold" }} onClick={() => { deleteBook(item._id) }}>DELETE <i class="fa-solid fa-trash" style={{ color: 'white' }}></i></button>
    </div>
  </div>
</div>

        </>
        ))}

      
    </div>
</div>
      {/* When filtered array is empty then it will show the message no such books found */}
    {Data.length === 0 && (
          <div className='text-center' style={{fontWeight:"bolder",fontSize:"larger",marginTop:"-16vw"}}>No Results found</div>
        )}
    </>
          ):(
        <div className='text-white'>Loading...</div>
      ) }
    </div>
            <Footer/>
    </>
  )
}

export default Books