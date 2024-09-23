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
      <div className='Home-content'>
        <div className='homepage'>
          <div className="d-flex justify-content-around description">
            <div className="flex-grow-1 mt-5">
              <h2>Streamline Your Healthcare Experience with Effortless Appointment Booking</h2>
              <h5>Simplify Scheduling with Our User-Friendly Booking System</h5>
              <p>
                Welcome to a new era of convenience in healthcare management. 
                Our Patient Appointment Booking System is designed to make scheduling 
                medical appointments easy and efficient, putting you in control of 
                your healthcare journey.
              </p>
            </div>
            <div className="card custom-card flex-shrink-1 mt-5" style={{ width: '18rem' }}>
              <img src={dashboard} className="card-img-top img-fluid" alt="Patient" />
            </div>
          </div>

          <div className='problems'>
            <h2>Consult top Doctors online for any health concern</h2>
            <div className="d-flex justify-content-around">
              {/* Problem 1 */}
              <div className="card custom-card">
                <img src={cough} className="card-img-top img-fluid problem-img" alt="Typical cold" />
                <div className="card-body">
                  <p className="card-text">Typical cold with fever and cough.</p>
                  <Link to='/root/specialist' state={{ specialization: 'GeneralPhysician' }}>
                    <button type="button" className="btn btn-info">Consult Now</button>
                  </Link>
                </div>
              </div>

              {/* Problem 2 */}
              <div className="card custom-card">
                <img src={bone} className="card-img-top img-fluid problem-img" alt="Arthritis" />
                <div className="card-body">
                  <p className="card-text">Arthritis causing joint discomfort.</p>
                  <Link to='/root/specialist' state={{ specialization: 'Neurologist' }}>
                    <button type="button" className="btn btn-info">Consult Now</button>
                  </Link>
                </div>
              </div>

              {/* Problem 3 */}
              <div className="card custom-card">
                <img src={migrane} className="card-img-top img-fluid problem-img" alt="Migrane" />
                <div className="card-body">
                  <p className="card-text">Pulsating pain, light sensitivity.</p>
                  <Link to='/root/specialist' state={{ specialization: 'Neurologist' }}>
                    <button type="button" className="btn btn-info">Consult Now</button>
                  </Link>
                </div>
              </div>

              {/* Problem 4 */}
              <div className="card custom-card">
                <img src={depression} className="card-img-top img-fluid problem-img" alt="Depression" />
                <div className="card-body">
                  <p className="card-text">Persistent sadness and hopelessness.</p>
                  <Link to='/root/specialist' state={{ specialization: 'Psychiatrist' }}>
                    <button type="button" className="btn btn-info">Consult Now</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Specialization Based */}
          <div className='appointment'>
            <h2>Book an appointment for in-clinic consultation</h2>
            <div className='d-flex justify-content-around'>
              {/* Dentist */}
              <div className="card custom-card">
                <img src={dentist} className="card-img-top img-fluid problem-img" alt="Dentist" />
                <div className="card-body">
                  <Link to='/root/specialist' state={{ specialization: 'Dentist' }} className="btn btn-info">Dentist</Link>
                </div>
              </div>
              {/* Dermatologist */}
              <div className="card custom-card">
                <img src={derma} className="card-img-top img-fluid problem-img" alt="Dermatologist" />
                <div className="card-body">
                  <Link to='/root/specialist' state={{ specialization: 'Dermatologist' }} className="btn btn-info">Dermatologist</Link>
                </div>
              </div>
              {/* Cardiologist */}
              <div className="card custom-card">
                <img src={cardio} className="card-img-top img-fluid problem-img" alt="Cardiologist" />
                <div className="card-body">
                  <Link to='/root/specialist' state={{ specialization: 'Cardiologist' }} className="btn btn-info">Cardiologist</Link>
                </div>
              </div>
              {/* Nutritionist */}
              <div className="card custom-card">
                <img src={nutrionist} className="card-img-top img-fluid problem-img" alt="Nutritionist" />
                <div className="card-body">
                  <Link to='/root/specialist' state={{ specialization: 'Nutrionist' }} className="btn btn-info">Nutritionist</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className='carousel'>
            <h2 className="carousel-heading">What Our Users Say</h2>
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                  <p>The patient monitoring system has significantly enhanced our ability to track and respond to patient needs in real-time.<br/>
                    Its seamless EHR integration and reliability have been outstanding.</p>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <p>I’m impressed with the system’s detailed analytics and remote monitoring capabilities.<br/>
                    They’ve greatly improved my ability to manage and monitor patient progress effectively.</p>
                </div>
                <div className="carousel-item">
                  <p>This monitoring system has streamlined our workflow and improved patient safety.<br/>
                    The intuitive interface and timely alerts are incredibly useful for proactive care.</p>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          
          
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
