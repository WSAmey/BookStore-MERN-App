import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer';



const ViewMore = () => {

   
    const [data, setData] = useState();
// console.log(data);

const id = useParams().id;

console.log(id);

useEffect(() => {
  console.log("inside fetch()");

  const fetch = async () => {
    console.log(id);
    await axios
      .get(`http://localhost:1000/api/v1/getBooksById/${id}`)
      .then((response) => {
        setData(response.data.book)
        console.log(response);
        console.log("response: ", response.data.book);
        // response.data.book
      })
      .catch((error) => console.log(error));
  };

  fetch();
},[id]);

  return (
    <>
    <Navbar/>
    <div className=' py-3'>
        <h3 className=' text-center'><b>About Book</b></h3>
       <b> <Link className='text-decoration-none' style={{marginLeft:'75px',fontSize:"medium",marginTop:"50px",color:"grey"}} to="/books"><i style={{fontSize:"small"}} class="fa-solid fa-chevron-left"></i> Back To Books</Link> </b>
        <div className='cards' style={{display:"grid",gridTemplateColumns:"auto auto",width:"90%",marginLeft:"auto",marginRight:"auto",marginTop:"25px"}}>
            <div className='image'>
                <img src={data && data.image}  alt="/" style={{width:"300px",height:"500px"}}/>
              
                {/* data && data.image is an expression that uses the logical AND (&&) operator and conditional rendering to display the value of the description property of the data object, if it exists. */}
            </div>
            <div className='details ' style={{marginLeft:"40px"}} >
                <h3>
                {data && data.bookname} 
                </h3>
                <h5>by <b style={{color:"grey"}}> {data && data.author} </b>(author)</h5>
                <h4 style={{color:'red',marginTop:"40px",marginBottom:"40px"}}><b>
                &#x20B9; {data && data.price}
                </b></h4>
                <h6 style={{wordWrap:"break-word"}}>
                  {data && data.description}

                </h6>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default ViewMore