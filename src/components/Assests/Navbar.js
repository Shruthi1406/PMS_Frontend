import React from 'react'
import PmsLogo1 from './PmsLogo1.jpg';


import './Navbar.css'


function Navbar() {
  return (
    <header>
      <nav>
        <ul className='list'>
          <li>
            <img className='logo' src={PmsLogo1}/>
          </li>
          <li>
            <a href="#">Find Hospitals</a>
          </li>
          <li>
          <input className="form-control me-5" type="search" placeholder="Search Hospitals By Location" aria-label="Search"/>
          </li>
          <li>
            <a href="#">Appointments</a>
          </li>
          <li>
            <a href="#">Medical History</a>
          </li>
          <li>
            <i class="fa-regular fa-bell"></i>
          </li>
          <li>
          <i class="fa-regular fa-user"></i>
          </li>
          
        </ul>
      </nav>
    </header>
  )
}

export default Navbar