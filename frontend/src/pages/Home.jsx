import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
function Home() {
  const image=require('../images/about.jpeg')
  return (
   <div className='Home-Page bg-dark text-white container-fluid d-flex justify-content-center align-items-center'>
      <div className='row container'>
        <div className='col-lg-6 d-flex justify-content-center align-items-start flex-column' style={{height:'91.5vh'}}>
        <h2 style={{fontSize:"80px"}}>BOOK STORE</h2>
        <h3 style={{fontSize:"50px"}}>FOR YOU</h3>
        <p className='mb-0' style={{color:'silver'}}>Checkout The Books From Here.</p>
        <Link to="/books" className='viewBook my-3'>View Books</Link>
        
        </div>
        <div className='col-lg-6 d-flex justify-content-center align-items-end flex-column'  style={{height:'91.5vh'}}>
            <img className='img-fluid homeimg' src='https://www.westend61.de/images/0001521214pw/young-man-reading-book-while-sitting-on-sofa-at-home-EGAF01731.jpg' alt='/'/>
        </div>

      </div>

   </div>
  )
}

export default Home