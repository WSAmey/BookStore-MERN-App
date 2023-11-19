import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Adminpanel = () => {
  const [inStock,setInStock]=useState([]);
  const [outStock,setOutStock]=useState([]);
  const availableStock="Available for purchase";
  const unavailableStock="Currently unavailable";


  useEffect(()=>{
    const inStockCount=async(req,res)=>{
      try {
        await axios.get(`http://localhost:1000/api/v1/getBooksByStock/${availableStock}`)
        .then(response=>{
          setInStock(response.data.stockdata);
        })
      } catch (error) {
        console.log(error);
      }
    }
    
    inStockCount();
    const outOfStockCount=async(req,res)=>{
      try {
        await axios.get(`http://localhost:1000/api/v1/getBooksByStock/${unavailableStock}`)
        .then(response=>{
          setOutStock(response.data.stockdata);
        })
      } catch (error) {
        console.log(error);
      }
    }
    
    outOfStockCount();
  },[])
  console.log(inStock.length);
  return (
    <>
    <Navbar/>
    <div style={{minHeight:"83.4vh"}}>
        <h3 className=' text-center p-3' ><b>Admin Dashboard</b></h3>
        <div className='boxes' style={{display:"grid",gridTemplateColumns:"auto auto auto",width:"87%",marginLeft:"auto", marginRight:"auto",justifyContent:"space-evenly",marginTop:"4vh",columnGap:"0.5vw"}}>

                <Link style={{textDecoration:"none",padding:"87px",border:"none",color:"white",background:"linear-gradient(to right, rgb(235, 51, 73), rgb(244, 92, 67))",borderRadius:"7px",fontSize:"x-large",fontWeight:"bold",width:"27.5vw",textAlign:"center"}} to={'/category'}>

                <i class="fa-solid fa-list" style={{marginRight:"10px",padding:"22px",border:"3px solid white",borderRadius:"50%"}}></i>
                 Categories 
                
                </Link>


                <Link style={{textDecoration:"none",padding:"87px",border:"none",color:"white",background:"linear-gradient(to right, rgb(86, 204, 242), rgb(47, 128, 237))",borderRadius:"7px",fontSize:"x-large",fontWeight:"bold",width:"27.5vw",textAlign:"center"}} to={'/books'}>
                <i class="fa-solid fa-book" style={{marginRight:"10px",padding:"22px",border:"3px solid white",borderRadius:"50%"}}></i>
                Books
                </Link>


                <Link style={{textDecoration:"none",padding:"87px",border:"none",color:"white",background: "#2ee447f0"
                ,borderRadius:"7px",fontSize:"x-large",fontWeight:"bold",width:"27.5vw", textAlign:"center"}} to={'/contactinquiry'}>
                <i class="fa-solid fa-envelope" style={{marginRight:"10px",padding:"22px",border:"3px solid white",borderRadius:"50%"}}></i>
                Support
                </Link>
        </div>
        <div className='boxes' style={{display:"grid",gridTemplateColumns:"auto auto",width:"87.5%",marginLeft:"auto", marginRight:"auto",justifyContent:"space-evenly",marginTop:"2vh",paddingBottom:"4vh"}}>
                
                <Link to={`/bookStock/${availableStock}`} style={{textDecoration:"none",padding:"87px",border:"none",color:"white",background:"#eea62b",borderRadius:"7px",fontSize:"x-large",fontWeight:"bold",width:"42vw",textAlign:"center"}} >
                <i class="fa-solid fa-square-check" style={{marginRight:"10px",padding:"22px",border:"3px solid white",borderRadius:"50%"}}></i>
                Books In Stock <p style={{fontSize:"xx-large"}}>{inStock!==0 && inStock.length}</p>
                </Link>


                <Link to={`/bookStock/${unavailableStock}`} style={{textDecoration:"none",padding:"87px",border:"none",color:"white",background:"#ff8700",borderRadius:"7px",fontSize:"x-large",fontWeight:"bold",width:"42vw",textAlign:"center"}} >
                <i class="fa-solid fa-square-xmark" style={{marginRight:"10px",padding:"22px",border:"3px solid white",borderRadius:"50%"}}></i>
                Books Out Of Stock <p style={{fontSize:"xx-large"}}> {outStock!==0 && outStock.length}</p>
                </Link>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Adminpanel
