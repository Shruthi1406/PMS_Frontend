import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import RegisterPatient from '../register patient/RegisterPatient';
import Login from '../login/Login';
import './Coverpage.css';

function Coverpage() {
  const [showModal, setShowModal] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('register'); // Manage the current component

  const handleClose = () => setShowModal(false);
  const handleShow = (component) => {
    setCurrentComponent(component);
    setShowModal(true);
  };

  return (
    <div className="coverpage">
      <div className='heading'>
        <h1>Effortlessly Schedule Your Appointments with Ease</h1>
        <p className='content'>Streamline your healthcare experience with our intuitive online appointment booking system.</p>
        <p className='content'>Quickly find available times, book your visits, and manage your schedule all from the comfort of your home.</p>
        <p className='content'>Enjoy a seamless, user-friendly interface designed to make managing your health appointments simple and stress-free.</p>
        <Button variant="light" onClick={() => handleShow('register')}>Register Now!</Button>
        <Button variant="light" onClick={() => handleShow('login')} className="ms-3">Login</Button>
      </div>

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
      
    </div>
  );
}

export default Coverpage;
