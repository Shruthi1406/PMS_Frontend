import React,{useState} from 'react';
import { Carousel } from 'react-bootstrap';
import './HomePage.css';
import { Row, Col } from 'react-bootstrap';
import handIcon from './hand.svg';
import smilyIcon from './smily.svg';
import securityIcon from './security.svg';
import confidentialityIcon from './complete.svg';
import certifiedIcon from './cerified.svg';
import affordableIcon from './afforable.svg';
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
import Specialities from './Specialities';
import Online1 from '../Assests/Online1.webp';
import Online2 from '../Assests/Online2.webp';
import Online3 from '../Assests/Online3.webp';
import Online4 from '../Assests/Online4.webp';
import Online5 from '../Assests/Online5.webp';


function Homepage() {

  const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
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
      <div className="container-fluid"> {/* Use container-fluid for full width */}
        <OnlineConsultation />
      </div>
          {/* Specialization Based */}
         
      </div>
      <Specialities/>
      <div className="container-fluid"> {/* Use container-fluid for full width */}
        <OnlineConsultation />
      <div class="container-fluid">
      <Consultation/>
      </div>
      </div>
    </>
  );

}

function OnlineConsultation() {
  return (
    <div className="mt-5"> {/* Use mt-5 to add top margin */}
      <div className="p-4" style={{ background: 'linear-gradient(to bottom, #ffcccb, #add8e6)', borderRadius: '10px' }}>
        {/* Left-aligned header with blue color */}
        <div className="row mb-4">       
          <h1 className="text-left text-primary">Why Consult Online on PMS</h1>        
        </div>
        <div className="row">
          {/* Accessibility */}
          <div className="col-md-6 mb-4 d-flex align-items-start">
            <img
              src={handIcon}
              alt="Accessibility"
              className="me-3"
              style={{ width: '50px' }}
            />
            <div>
              <h5 className="fw-bold">Accessibility</h5>
              <p>With 30+ specialities, 4000+ Doctors, and partnerships with 600+ hospitals across the nation.</p>
            </div>
          </div>

          {/* Convenience */}
          <div className="col-md-6 mb-4 d-flex align-items-start">
            <img
              src={smilyIcon}
              alt="Convenience"
              className="me-3"
              style={{ width: '50px' }}
            />
            <div>
              <h5 className="fw-bold">Convenience</h5>
              <p>Most patients prefer online consultations due to the ease and convenience of the process.</p>
            </div>
          </div>

          {/* Security and Privacy */}
          <div className="col-md-6 mb-4 d-flex align-items-start">
            <img
              src={securityIcon}
              alt="Security and Privacy"
              className="me-3"
              style={{ width: '50px' }}
            />
            <div>
              <h5 className="fw-bold">Security and Privacy</h5>
              <p>We ensure that your medical information is safe and protected with top security standards.</p>
            </div>
          </div>

          {/* Complete Confidentiality */}
          <div className="col-md-6 mb-4 d-flex align-items-start">
            <img
              src={confidentialityIcon}
              alt="Complete Confidentiality"
              className="me-3"
              style={{ width: '50px' }}
            />
            <div>
              <h5 className="fw-bold">Complete Confidentiality</h5>
              <p>Our platform facilitates a secure and confidential online consultation with your doctor.</p>
            </div>
          </div>

          {/* Certified Doctors */}
          <div className="col-md-6 mb-4 d-flex align-items-start">
            <img
              src={certifiedIcon}
              alt="Certified Doctors"
              className="me-3"
              style={{ width: '50px' }}
            />
            <div>
              <h5 className="fw-bold">Certified Doctors</h5>
              <p>Our network includes certified doctors with over 10 years of experience in their respective fields.</p>
            </div>
          </div>

          {/* Affordability */}
          <div className="col-md-6 mb-4 d-flex align-items-start">
            <img
              src={affordableIcon}
              alt="Affordability"
              className="me-3"
              style={{ width: '50px' }}
            />
            <div>
              <h5 className="fw-bold">Affordability</h5>
              <p>Online consultations cost a fraction of the price compared to physical visits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Consultation() {
  return (
    <>
      <div>
        <div className="container mt-5">
          <Step 
            image={Online1} 
            title="Choose a speciality" 
            description="Choose a specialty based on the medical condition you have. If unsure, consult with a general physician."
           
          />
          <Step 
            image={Online2} 
            title="Choose your doctor" 
            description="Choose your doctor based on your preferences like experience, qualifications, languages, and location."
              // Modify image size here
          />
          <Step 
            image={Online3}
            title="Talk to a doctor online" 
            description="Consult a doctor through chat, audio, or video call and get medical advice, tips, and prescriptions."
             // Modify image size here
          />
          <Step 
            image={Online4}
            title="Book Lab Tests online" 
            description="Get lab tests done from the comfort of your home. Your reports will be available on the app."
             // Modify image size here
          />
          <Step 
            image={Online5} 
            title="Buy medicines online" 
            description="Buy medicines online and get them delivered to your doorstep without stepping out of your home."
            
          />
        </div>
      </div>
    </>
  );
}

function Step({ image, title, description }) {
  return (
    <Row className="mb-5 align-items-center">
      <Col md={2}>
        <img src={image} alt={title} className="img-fluid" />
      </Col>
      <Col md={10}>
        <h3>{title}</h3>
        <p>{description}</p>
      </Col>
    </Row>
  );
}



export default Homepage;
