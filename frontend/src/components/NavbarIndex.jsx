import React from 'react'
import { Link } from 'react-router-dom'


const NavbarIndex = () => {


  return (
    <div style={{borderBottom:'1px solid white'}}>
    
         <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container">
              <a className="navbar-brand text-light" href="#">Books Store</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <Link className="nav-item nav-link active text-light" to="/">
                    Home
                  </Link>
                  <Link className="nav-item nav-link active text-light" to="/booksIndex">
                    Books
                  </Link>
                  <Link className="nav-item nav-link active text-light" to="">
                    Cart <i class="fa-solid fa-cart-shopping"></i> 
                  </Link>
                  <Link className="nav-item nav-link active text-light" to="/contactus">
                    Contact Us
                  </Link>
                  <Link className="nav-item nav-link active text-light" to="/login">
                    Admin Login
                  </Link>
                  </ul>
              </div>
            </div>
          </nav>
    
    </div>
  )
}

export default NavbarIndex