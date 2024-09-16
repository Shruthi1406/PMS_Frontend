import React from 'react'
import PmsLogo1 from './PmsLogo1.jpg';
import { Modal, Button } from 'react-bootstrap';
import './Navbar.css'
import { NavLink } from 'react-bootstrap';
import RegisterPatient from '../register patient/RegisterPatient';
import Login from '../login/Login';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('register'); 

  const handleClose = () => setShowModal(false);
  const handleShow = (component) => {
    setCurrentComponent(component);
    setShowModal(true);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/root');
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <a className="navbar-brand" href="#">
            <Link to="/root"><img src={PmsLogo1} className="img-fluid custom-logo" alt="Logo" /></Link>
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
              <Link to="appointments" className="nav-link">Appointments</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Medical History</a>
            </li>
            <li className="nav-item">
            <Link to="bookAppointments" className="nav-link">Book Appointment</Link>
            </li>
            <li className='nav-item'>
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Find hospital by location" aria-label="Recipient's username with two button addons"/>
               <button class="btn btn-outline-secondary custom-search-button" type="button">search</button>
 
              </div>
            </li>
          </ul>
          
          <button onClick={handleLogout}>Logout</button>
          <ul className="navbar-nav ms-auto my-2 my-lg-0">
           
            <li className="nav-item">
              <span className="icon-style notifications">Notifications</span>
             
            </li>
            <li className="nav-item">
              {localStorage.getItem("authToken")?<div ><FontAwesomeIcon style={{width:"80px"}} icon={faUser}/></div>:<Button variant="light" onClick={() => handleShow('login')}>Login/Signup</Button>}
            </li>
           
          </ul>
        </div>
       
      </div>
    </nav>
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentComponent === 'register' ? 'Register Patient' : 'Login'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentComponent === 'register' ? (
            <RegisterPatient onClose={handleClose} />
          ) : (
            <Login onClose={handleClose} />
          )}
        </Modal.Body>
        <Modal.Footer>
          {currentComponent === 'register' ? (
            <div>
              Already have an account? <Button variant="link" onClick={() => setCurrentComponent('login')}>Login here</Button>
            </div>
          ) : (
            <div>
              Not registered yet? <Button variant="link" onClick={() => setCurrentComponent('register')}>Register here</Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </header>
    
  )
}

export default Navbar