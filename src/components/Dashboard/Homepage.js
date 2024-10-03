import React from 'react';
import './HomePage.css';
import dashboard from './dashboard.jpg';
import cough from './cough.jpg';
import bone from './bone.jpeg';
import depression from './depression.jpg';
import migrane from './migrane.jpg';
import { Link } from 'react-router-dom';
import derma from './derma.jpg';
import dentist from './dentist.jpg';
import cardio from './cardio.jpg';
import nutrionist from './nutritionist.png';
import Footer from '../Footer';

function Homepage() {

  return (
    <>

      <div className='linear'>
        <div className='back'>
          <div className="textto d-flex flex-column align-items-start justify-content-end" style={{ height: '100vh', paddingLeft: '20px' }}>
            <h4 style={{ color: 'blue' }}>The right care, is wherever you are</h4><br />
            <h1 className="font-bold">
              <span className='rem'>Consult India's</span><br />
              <span className='rem'>Top Doctors Online</span>
            </h1><br />
            <button className="btn btn-warning btn-custom-long">Consult Now</button>
          </div>

          <div className='backimg'>

          </div>
        </div>

      </div>









    </>
  );

}




export default Homepage;
