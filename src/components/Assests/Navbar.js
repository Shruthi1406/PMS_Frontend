import React from 'react'
import PmsLogo1 from './PmsLogo1.jpg';


import './Navbar.css'
import { NavLink } from 'react-bootstrap';


function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <a className="navbar-brand" href="#">
            <img src={PmsLogo1} className="img-fluid custom-logo" alt="Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0">
            <li className="nav-item">
              <NavLink to='/homepage'>Find Hospitals</NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Appointments</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Medical History</a>
            </li>
            <li className='nav-item'>
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Find hospital by location" aria-label="Recipient's username with two button addons"/>
               <button class="btn btn-outline-secondary custom-search-button" type="button">search</button>
 
              </div>
            </li>
          </ul>
          
         
          <ul className="navbar-nav ms-auto my-2 my-lg-0">
           
            <li className="nav-item">
              <span className="icon-style notifications">Notifications</span>
             
            </li>
            <li className="nav-item">
            <button type="button" class="btn btn-outline-secondary notifications">Login/Signup</button>
            </li>
           
          </ul>
        </div>
       
      </div>
    </nav>
    </header>
  )
}

export default Navbar