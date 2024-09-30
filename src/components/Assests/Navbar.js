import React, { useState,useEffect,useRef } from 'react';
import PmsLogo1 from './PmsLogo1.jpg';
import { Modal, Button, Tabs, Tab } from 'react-bootstrap';
import './Navbar.css';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ReceptionistLogin from '../receptionist/ReceptionistLogin';
import { getAuthorizationUrl } from '../fitbit/fitbitAPI';
import HospitalSearchComponent from '../Search';
import AddDevice from '../vitalsigns/AddDevice';
import Notifications from '../Notifications/Notification';
import Login from '../login/Login'; 
import RegisterPatient from '../register patient/RegisterPatient';


function Navbar({notificationCount}) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [key, setKey] = useState('patient');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  // const locationForNotification=useLocation();
  // const notificationCount=locationForNotification.state?.notificationCount || 0;
  // Add the necessary state for the AddDevice modal
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
  const [deviceAdded, setDeviceAdded] = useState(false);
  // Handle show and close functions
  const handleShowAddDevice = () => setShowAddDeviceModal(true);
  const handleCloseAddDevice = () => setShowAddDeviceModal(false);
  const [location, setLocation] = useState('');
  console.log("Notification count in navbar:",notificationCount);
  // const locationNotify = useLocation();
  // const notificationCount = locationNotify.state?.notificationCount || 0;
 
  // const[notificationCount,setNotificationCount]=useState(0);
  // const locationNotify=useLocation();
   //const [location, setLocation] = useState('');
  
//    const decrementNotificationCount = () => {
//     setNotificationCount(prevCount => Math.max(prevCount - 1, 0));
// };



  const handleCloseLogin = () => setShowLoginModal(false);
  const handleShowLogin = () => setShowLoginModal(true);

  
  const handleCloseRegister = () => setShowRegisterModal(false);
  const handleShowRegister = () => setShowRegisterModal(true);
  
  const patientInfo = localStorage.getItem('patientInfo')!=null ? JSON.parse(localStorage.getItem('patientInfo')) : null;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('patientInfo');
    setSidebarOpen(!sidebarOpen);
    navigate('/root');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  function handleSearch()
  {
    navigate(`/root/locationSearch?location=${location.toLowerCase()}`);
    setLocation('');
  }

  function getInitials(name) {
    return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
  }

  function generateBackground(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  const profileStyle = {
    display: "flex",
    height: "45px",
    width: "45px",
    borderRadius: "100px",
    color: "white",
    background: patientInfo!=null ? generateBackground(patientInfo.patientName) : '#ccc',
    margin: "auto",
  };
  const handleLogin = () => {
    window.location.href = getAuthorizationUrl();
  };
  const onDeviceAdded = () => {
    setDeviceAdded(true);
    handleCloseAddDevice();
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false); 
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);
  return (
    <header className='navbar-header' style={{ margin: '50px' }}>
      <nav className="navbar navbar-expand-lg custom-navbar fixed-top ">
        <div className="container-fluid">
          <Link to="/root" className="navbar-brand">
            <img  src={PmsLogo1} className="img-fluid custom-logo ml-5" alt="Logo"  />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0">
              <li className="nav-item"><Link to='/root/hospitals' className="nav-link">Hospitals</Link></li>            
              <li className='nav-item'>
                <div className="input-group">
                  <input type="text" id="search" className="form-control"  placeholder="Find hospital by location" aria-label="Recipient's username with two button addons" 
                  value={location}
                  onChange={handleLocationChange}
                  />
                  <button className="btn btn-outline-secondary custom-search-button" type="button" onClick={handleSearch}>Search</button>
                </div>
              </li>
            </ul>
            

            <ul className="navbar-nav ms-auto my-2 my-lg-0">
            <li className="nav-item"><Link to="appointments" className="nav-link">Appointments</Link></li>
              <li className="nav-item">
              <Link to="/root/notifications" className="nav-link">
                                    <i style={{ fontSize: "30px" }} className="fa-regular fa-bell">
                                    {
                                      localStorage.getItem("authToken")!=null?
                                      notificationCount > 0 && <span className="notification-count">{notificationCount}</span>:                                  
                                      <></> 

                                    }
                                    </i>
              </Link>
              </li>
              <li className="nav-item">
                {localStorage.getItem("authToken")!=null ? (
                  <div style={profileStyle}>
                    <span style={{ margin: 'auto', cursor: "pointer", fontSize: "25px" }} onClick={toggleSidebar}>{getInitials(patientInfo.patientName)}</span>
                  </div>
                ) : (
                  <Button variant="light" onClick={handleShowLogin}>Login/Signup</Button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs id="login-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
            <Tab eventKey="patient" title="Patient Login">
              <Login onClose={handleCloseLogin} />
            </Tab>
            <Tab eventKey="receptionist" title="Receptionist Login">
              <ReceptionistLogin onClose={handleCloseLogin} />
            </Tab>
          </Tabs>
          <div className="text-center mt-3">
            <span>Not registered yet? </span>
            <Button variant="link" onClick={() => {
              handleCloseLogin(); 
              handleShowRegister(); 
            }}>
              Register here
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Register Modal */}
      <Modal  size="lg" show={showRegisterModal} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterPatient onClose={handleCloseRegister} />
          <div className="text-center mt-3">
            <span>Already have an account? </span>
            <Button variant="link" onClick={() => {
              handleCloseRegister();
              handleShowLogin(); 
            }}>
              Login here
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <AddDevice onClose={handleCloseAddDevice} show={showAddDeviceModal} onDeviceAdded={onDeviceAdded}/>
      <div className={`sidebar${sidebarOpen ? ' open' : ''}`} ref={sidebarRef}>
        <button className="close-btn" onClick={toggleSidebar}  >×</button>
        <div className="sidebar-header">
          <FontAwesomeIcon icon={faUser} size="4x" style={{ cursor: "pointer" }} />
          {patientInfo!=null ? (
            <div>
              <h5>{patientInfo.patientName}</h5>
              <p>{patientInfo.patientEmail}</p>
            </div>
          ) : (
            <div>
              <h5>No patient info available</h5>
              <p>Please log in</p>
            </div>
          )}
        </div>
        <ul className="sidebar-nav mt-5">
        {deviceAdded ? (
            <li><Link to="/root/vitalsignstable">Vital Signs</Link></li> // Show Vital Signs if device added
          ) : (
            <li><Link onClick={handleShowAddDevice}>Add Device</Link></li> // Show Add Device otherwise
          )}
          <li><Link to="/root/healthform">Fitbit Device</Link></li>
          <li><Link onClick={handleLogout}>Logout</Link></li>
        </ul>
      </div>

    </header>
    
  );
}

export default Navbar;
