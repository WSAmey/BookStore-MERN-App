import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import NavbarIndex from '../components/NavbarIndex'
function Home() {
  return (
    <>
    <NavbarIndex/>
   <div className='Home-Page  container-fluid d-flex justify-content-center align-items-center'>
      <div className='row container'>
        <div className='col-lg-6 d-flex justify-content-center align-items-start flex-column' style={{height:'91.5vh'}}>
        <h2 style={{fontSize:"80px"}}>BOOK STORE</h2>
        <p className='mb-0' style={{color:'silver',fontSize:"x-large"}}><b>Checkout The Books Here.</b></p>
        <Link to="/booksIndex" className='viewBook my-3' style={{color:"blue",padding:'7px',border:'2px solid blue',borderRadius:"5px",fontSize:"larger",fontWeight:"bolder"}}>View Books</Link>
        
        </div>
        <div className='col-lg-6 d-flex justify-content-center align-items-end flex-column'  style={{height:'91.5vh'}}>
            <img className='img-fluid homeimg' src='https://www.westend61.de/images/0001521214pw/young-man-reading-book-while-sitting-on-sofa-at-home-EGAF01731.jpg' alt='/'/>
        </div>

      </div>

   </div>
   <Footer/>
   </>
  )
}

export default Home