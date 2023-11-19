import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NavbarIndex from './NavbarIndex';
import Footer from './Footer';

const ViewMoreIndex = () => {
    const [data, setData] = useState([]);
    const [sameData,setSameData]=useState([])
    // console.log(data);
    
    const id = useParams().id;

    const fetch = async () => {
      try {
          const response = await axios.get(`http://localhost:1000/api/v1/getBooksById/${id}`);
          setData(response.data.book);
          console.log(response);
          console.log("response: ", response.data.book);
      } catch (error) {
          console.log(error);
      }
  };

  const catFilter = async (category) => {
      try {
          const response = await axios.get(`http://localhost:1000/api/v1/getBooksByCategory/${category}`);
          setSameData(response.data.categoryBook);
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
      console.log("inside fetch()");
      fetch();
  }, [id]);

  useEffect(() => {
      if (data && data.category) {
          console.log("inside catFilter()");
          catFilter(data.category);
      }
  }, [data]);
    
    if (!data) {
      // If data is still undefined, render loading or handle it as appropriate
      return <div>Loading...</div>;
    }
      return (
        <>
        <NavbarIndex/>
        <div className=' py-3' style={{minHeight:"91.5vh",background:"whitesmoke"}}>
            <h3 className=' text-center'><b>About Book</b></h3>
           <b> <Link className='text-decoration-none' style={{marginLeft:'75px',fontSize:"medium",marginTop:"50px",color:"grey"}} to="/booksIndex"><i style={{fontSize:"small"}} class="fa-solid fa-chevron-left"></i> Back To Books</Link> </b>
            <div className='cards' style={{display:"grid",gridTemplateColumns:"auto auto",width:"92%",marginLeft:"auto",marginRight:"auto",marginTop:"25px",background:"white",padding:"20px",borderRadius:"5px",boxShadow:"0 2px 4px 0 rgba(0,0,0,.08)"}}>
                <div className='image'>
                    <img src={data && data.image}  alt="/" style={{height: '40vh', width: '14vw'}}/>
                 
                    {/* data && data.image is an expression that uses the logical AND (&&) operator and conditional rendering to display the value of the description property of the data object, if it exists. */}
                    <h4 style={{ color: data.stockstatus === 'Available for purchase' ? 'green' : 'red',marginTop:"2vh",marginBottom:"2vh",textAlign:"center" }}>{data.stockstatus}</h4>
                </div>
                <div className='details ' style={{marginLeft:"40px"}} >
                    <h3>
                    {data && data.bookname} 
                    </h3>
                    <h5>by <b style={{color:"grey"}}> {data && data.author} </b>(author) | {data && data.category}</h5>
                    <h4 style={{color:'red',marginTop:"2vh",marginBottom:"2vh"}}><b>
                    &#x20B9; {data && data.price}
                    </b></h4>
                  
                    <h6 style={{wordWrap:"break-word"}}>
                      {data && data.description}
    
                    </h6>
                    {data.stockstatus==="Available for purchase" && <button style={{fontSize:"large",fontWeight:"bold",width:"9vw",background:"#e4e40b",marginTop:"4vh"}}>Add To Cart</button>}
                </div>
            </div>
            {sameData.length>0 && <div className='similarBooks' style={{marginTop:"2vh",background:"white",boxShadow:"0 2px 4px 0 rgba(0,0,0,.08)",width:"92%",marginLeft:"auto",marginRight:"auto",padding:"20px",borderRadius:"5px"}}>
            <h4>Similar Books</h4>
            <hr/>
            
            <div style={{display:"grid",gridTemplateColumns:"auto auto auto auto auto",justifyContent:"space-evenly" }}>
              {sameData.map((value,index)=>(
                value._id !== data._id && ( //if value id and data id matches, then exclude that data from same data card
                            <div className='bookCard' key={value._id} style={{borderRadius:"5px",padding:"12px",width:"15vw",marginRight:"2vw",marginBottom:"2vh",boxShadow:' rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                                <img src={value.image} alt='/' style={{height:"32vh",width:"13.2vw"}}/>
                                <Link to={`/viewMoreIndex/${value._id}`} style={{textDecoration:"none"}}>
                                    <h6>{value.bookname} 
                                        <p style={{fontSize:"medium",color:"grey"}}>{value.author}</p> 
                                        <p style={{color: value.stockstatus === 'Available for purchase' ? 'green' : 'red',fontWeight:"bold"}}>{value.stockstatus}</p>
                                    </h6>
                                    <h5 style={{color:"red"}}>&#x20B9; {value.price}</h5>
                                </Link>
                            </div>
                        )
              ))}
              
            </div>
        </div>
}       
 </div>

      

        <Footer/>
        </>
      )
}

export default ViewMoreIndex