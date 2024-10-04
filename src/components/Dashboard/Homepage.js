import React,{useState} from 'react';
import { Carousel } from 'react-bootstrap';
import './HomePage.css';
import { Container, Row, Col } from 'react-bootstrap';
import handIcon from './hand.svg';
import smilyIcon from './smily.svg';
import securityIcon from './security.svg';
import confidentialityIcon from './complete.svg';
import certifiedIcon from './cerified.svg';
import affordableIcon from './afforable.svg';
import Specialities from './Specialities';

function Homepage() {

  const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
  return (
    <div >
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
      <Specialities/>
      <OnlineConsultation />
      <StatsComponent/>
    </div>
  );

}

const StatsComponent = () => {
  return (
    <div className="stat-container text-center py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-4 position-relative stat-item">
          <h2 className="text-primary">30+</h2>
          <p>Specialities</p>
        </div>
        <div className="col-4 position-relative stat-item">
          <h2 className="text-primary">4000+</h2>
          <p>Doctors</p>
        </div>
        <div className="col-4 stat-item">
          <h2 className="text-primary">600+</h2>
          <p>Hospitals</p>
        </div>
      </div>
    </div>
  );
};

function OnlineConsultation() {
  return (
    <div className="mt-5"> {/* Use mt-5 to add top margin */}
      <div className="p-4" style={{ background: 'linear-gradient(to bottom, #ffcccb, #add8e6)' }}>
        <div className='container'>
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
    </div>
  );
}



export default Homepage;
