import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BookStock = () => {

    const stock=useParams().stock;
    const [data,setData]=useState([]);

    const fetch=async()=>{
      const response=await axios.get(`http://localhost:1000/api/v1/getBooksByStock/${stock}`);
      setData(response.data.stockdata);
  }
    useEffect(()=>{
        
        fetch();
    },[stock])


    const changeHandle=(e)=>{
      const searchTerm = e.target.value.toLowerCase();
      const search=data.filter(item=>item.bookname.toLowerCase().includes(searchTerm))
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
    <div style={{minHeight:"84vh"}}>
    <div style={{marginTop:"5vh"}}>
    {stock==="Available for purchase" && <h3 style={{textAlign:"center",fontWeight:"bold",color:"black"}}>Books In Stock </h3> }
    {stock==="Currently unavailable" && <h3 style={{textAlign:"center",fontWeight:"bold",color:"black"}}>Books Out Of Stock </h3> } 
    </div>

    <div className=''>
        <b>  <Link className='text-decoration-none' style={{marginLeft:'15vw',fontSize:"medium",marginTop:"50px",color:"grey",marginBottom:"50px"}} to="/adminPanel"><i style={{fontSize:"small"}} class="fa-solid fa-chevron-left"></i> Back To Dashboard</Link> </b>
      </div>

    {/* <div style={{width:"70%",marginLeft:"auto",marginRight:"auto",textAlign:"center"}}> */}
    <input  type='text' style={{
            padding:' 10px',
            boxSizing:' border-box',
            border: 'none',
            borderBottom:' 2px solid red',
            width: '46vw',
            fontFamily:"'Helvetica', FontAwesome, sans-serif",
            marginLeft:"26vw",
            fontSize:"larger",
            pointerEvents:"all"

        }}  placeholder='search books here...' onChange={changeHandle}/>
    {/* </div> */}
    <div style={{display:"grid",
                gridTemplateColumns:"auto", 
                width:"70%",
                rowGap:"2vh",
                marginLeft:"auto",
                marginRight:"auto",
                justifyContent:'space-evenly',
                marginBottom:"7vh"    
                }}>

<p>{data.length} results</p>


  {data && data.map((item)=>(
                    <div className='bookCard' style={{ display: 'flex', border: '1px solid silver', borderRadius: '7px' }}>
  <div className='imagediv'>
    <img src={item.image} alt='/' style={{ borderTopLeftRadius: '7px', borderBottomLeftRadius: '7px', height: '42vh', width: '14vw' }} />
  </div>
  <div className='detailsdiv' style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
    <h5>{item.bookname}</h5>
    <h6 style={{ color: 'gray' }}>by <b> {item.author} </b> </h6>
    <h3 style={{marginTop:'2vh'}}>&#x20B9;<b> {item.price} </b></h3>
    {item.stockstatus==="Available for purchase" && <h4 style={{color:"white",padding:"5px",borderRadius:"7px",background:"#25ca08",fontSize:"larger"}}> In Stock </h4>}
    {item.stockstatus==="Currently Unavailable" && <h4 style={{color:"white",padding:"5px",borderRadius:"7px",background:"red",fontSize:"larger"}}> Out Of Stock </h4>}
    <h6 style={{ color: 'grey',marginTop:"2vh",marginBottom:"2vh" }}>
    {item.description.slice(0, 100)}...
<Link to={`/viewMore/${item._id}`} style={{ textDecoration: 'none' }}>View More</Link>
    </h6>
    <div>
    <Link to={`/updateStock/${item._id}/${item.stockstatus}`} style={{ background: 'green',  padding:"12px",border: 'none',fontSize:"medium",fontWeight:"bold" }} className='btn btn-primary'>EDIT STOCK STATUS <i class="fa-solid fa-pen-to-square"></i></Link>
     
    </div>
  </div>
</div>    

))}
 

</div>
{data.length===0 && <h4 style={{textAlign:"center"}}><b>No Result Found</b></h4>}
</div>
<Footer/>
</>
  )
}

export default BookStock;