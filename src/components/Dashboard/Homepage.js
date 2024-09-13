import React from 'react'
import './HomePage.css'
import dashboard from './dashboard.jpg'
import cough from './cough.jpg'
import bone from './bone.jpeg'
import depression from './depression.jpg'
import migrane from './migrane.jpg'
import { Link } from 'react-router-dom'
import derma from './derma.jpg'
import dentist from './dentist.jpg'
import cardio from './cardio.jpg'
import nutrionist from './nutritionist.png'



function Homepage() {
  return (
    <div className='homepage'>
        <div class="d-flex justify-content-around description">
            <div class="content-one">
                <h2>Streamline Your Healthcare Experience with Effortless Appointment Booking</h2>
                <h5>Simplify Scheduling with Our User-Friendly Booking System</h5>
                <p>Welcome to new era of convenience in helathcare mangagement.
                Our  Patient Appointment Booking System is designed to make scheduling medical appointments easy and efficient,putting you in control of your healthcare Journey.</p>
            </div>
            <div class="flex-shrink-1">
            <img src={dashboard} class="img-fluid image" alt="patient"/>
            </div>
        </div>
        <div className='problems'>
            <h2 className='problems'>Consult top Doctors online for any health concern</h2>
            <div class="d-flex justify-content-around">
                {/*problem-1*/}
              <div class="card custom-card">
                  <img src={cough} class="card-img-top img-fluid problem-img" alt="..."/>
                  <div class="card-body">
                     <p class="card-text">Typical cold with fever and cough.</p>
                      <button type="button" class="btn btn-info">consult now</button>
                    </div>
                </div>
                 {/*problem-2*/}
                 <div class="card custom-card">
                     <img src={bone} class="card-img-top img-fluid problem-img" alt="..."/>
                     <div class="card-body">
                       <p class="card-text">Arthritis causing joint discomfort.</p>
                      <button type="button" class="btn btn-info">consult now</button>
                    </div>
                </div>
                 {/*problem-2*/}
                 <div class="card custom-card">
                     <img src={migrane} class="card-img-top img-fluid problem-img" alt="..."/>
                     <div class="card-body">
                       <p class="card-text">Pulsating pain, light sensitivity.</p>
                      <button type="button" class="btn btn-info">consult now</button>
                    </div>
                </div>
                 {/*problem-2*/}
                 <div class="card custom-card">
                     <img src={depression} class="card-img-top img-fluid problem-img" alt="..."/>
                     <div class="card-body">
                       <p class="card-text">Persistent sadness and hopelessness.</p>
                      <button type="button" class="btn btn-info">consult now</button>
                    </div>
                </div>
                
            </div>
            {/* specalization based */}
            <div className='appointment'>
                <h2>Book an appointment for in-clinic consultation</h2>
                {/*Dentist */}
                <div className='d-flex justify-content-around'>
                 <div className="container">
                    <img src={dentist} class="card-img-top img-fluid problem-img" alt="..."/><br/>
                    <Link to='/'>Dentist</Link>
                 </div>
                 {/*Derma */}
                  <div className="container">
                    <img src={derma} class="card-img-top img-fluid problem-img" alt="..."/><br/>
                    <Link to='/'>Dermatologist</Link>
                  </div>
                 {/*cardio */}
                  <div className="container">
                    <img src={cardio} class="card-img-top img-fluid problem-img" alt="..."/><br/>
                    <Link to='/'>Cardiologist</Link>
                   </div>
                 {/*nutrionist */}
                   <div className="container">
                     <img src={nutrionist} class="card-img-top img-fluid problem-img" alt="..."/><br/>
                     <Link to='/'>Nutritionist</Link>
                   </div>
                </div>
                
            </div>
            {/*carousel */}
            

        </div>
  
        
    </div>
  )
}

export default Homepage