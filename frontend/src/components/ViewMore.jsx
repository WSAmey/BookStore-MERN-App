import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'



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
    <div className='bg-dark'>
        <h4 className='text-white text-center'>About Book</h4>
        <Link className='text-decoration-none' style={{marginLeft:'75px',fontSize:"x-large",marginTop:"50px",color:"greenyellow"}} to="/books">Back</Link>
        <div className='cards' style={{display:"grid",gridTemplateColumns:"auto auto",width:"90%",marginLeft:"auto",marginRight:"auto",marginTop:"25px"}}>
            <div className='image'>
                <img src={data && data.image}  alt="/" style={{width:"300px",height:"500px"}}/>
              
                {/* data && data.image is an expression that uses the logical AND (&&) operator and conditional rendering to display the value of the description property of the data object, if it exists. */}
            </div>
            <div className='details text-white' style={{marginLeft:"40px"}} >
                <h3>
                {data && data.bookname} 
                </h3>
                <h5>by <b style={{color:"silver"}}> {data && data.author} </b>(author)</h5>
                <h4 style={{color:'red',marginTop:"40px",marginBottom:"40px"}}><b>
                &#x20B9; {data && data.price}
                </b></h4>
                <h5 style={{wordWrap:"break-word"}}>
                  {data && data.description}

                </h5>
            </div>
        </div>
    </div>
  )
}

export default ViewMore