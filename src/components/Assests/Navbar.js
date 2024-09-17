import React, { useState } from 'react';
import PmsLogo1 from './PmsLogo1.jpg';
import { Modal, Button, Tabs, Tab } from 'react-bootstrap';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ReceptionistLogin from '../receptionist/ReceptionistLogin';
import Login from '../login/Login';

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState('patient'); // Default tab is 'patient'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [currentComponent, setCurrentComponent] = useState('register');
  
  const handleClose = () => setShowModal(false);
  const handleShow = (component) => {
    setCurrentComponent(component);
    setShowModal(true);
  };
  const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/root');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header style={{ margin: '50px' }}>
      <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
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
                <Link to='hospitals' className="nav-link">Find Hospitals</Link>
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
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Find hospital by location" aria-label="Recipient's username with two button addons" />
                  <button className="btn btn-outline-secondary custom-search-button" type="button">Search</button>
                </div>
              </li>
            </ul>

            <button onClick={handleLogout}>Logout</button>
            <ul className="navbar-nav ms-auto my-2 my-lg-0">
              <li className="nav-item">
                <span className="icon-style notifications">Notifications</span>
              </li>
              <li className="nav-item">
                {localStorage.getItem("authToken") ? (
                  <div>
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ width: "80px", cursor: "pointer" }}
                      onClick={toggleSidebar}
                    />
                  </div>
                ) : (
                  <Button variant="light" onClick={() => handleShow('login')}>Login/Signup</Button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            id="login-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="patient" title="Patient Login">
              <Login onClose={handleClose} />
            </Tab>
            <Tab eventKey="receptionist" title="Receptionist Login">
              <ReceptionistLogin onClose={handleClose} />
            </Tab>
          </Tabs>
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

      <div className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
        <div className="sidebar-header">
          <FontAwesomeIcon
            icon={faUser}
            size="4x"  
            style={{ cursor: "pointer" }}
          />
          <div>
            <h5>{patientInfo.patientName}</h5>
            <p>{patientInfo.patientEmail}</p>
          </div>
        </div>
        {/* <ul className="sidebar-nav mt-5">
          <li><Link to="#home">Vital Signs</Link></li>
          <li><Link to="#followme">Logout</Link></li>
        </ul> */}
        <Link to="#home">Vital Signs</Link>
        <Link to="#followme">Logout</Link>
      </div>

    </header>
  );
}

export default Navbar;
