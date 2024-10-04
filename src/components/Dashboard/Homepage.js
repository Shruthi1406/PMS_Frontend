import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import './HomePage.css';
import { Container, Accordion, Card } from 'react-bootstrap'; // Ensure these components are imported correctly
import 'bootstrap/dist/css/bootstrap.min.css';

import { Row, Col } from 'react-bootstrap';
import handIcon from './hand.svg';
import smilyIcon from './smily.svg';
import securityIcon from './security.svg';
import confidentialityIcon from './complete.svg';
import certifiedIcon from './cerified.svg';
import affordableIcon from './afforable.svg';
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
      <Specialities />
      <OnlineConsultation />
      <StatsComponent />
      <Consultation />
      <Faqs/>
      


    </div>
  );

}

const StatsComponent = () => {
  return (
    <div className="stat-container text-center py-5">
      <div className='container'>
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
function Faqs() {
  return (
    <>
      <div className="accordion accordion-flush mt-4" id="accordionFlushExample" style={{ margin: '20px' }}>
        {/* First Accordion Item */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              <h3><b>What is Online Consultation?</b></h3>
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              An online doctor consultation happens over an online doctor chat, call, or video call. This enables you
              to talk to doctors online without having to search or locate a clinic or hospital near you. You can now
              opt for an online medical consultation by simply selecting a doctor from various specialties from the
              comfort of your home, without dealing with the hassle of waiting in traffic or long queues.
            </div>
          </div>
        </div>

        {/* Second Accordion Item */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button
              className="accordion-button collapsed custom-accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              <h3><b>How do I do an online consultation?</b></h3>
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              The steps to talk to a doctor online are simple:<br />
              1. Contact us by visiting our website or downloading the MFine app for doctor consultation.<br />
              2. Choose your symptoms or select a specialist doctor to consult. You can even consult a general
              physician who can understand your condition better.<br />
              3. Book a doctor appointment online and a specialist will get in touch with you immediately.<br />
              4. Ask a doctor online about your symptoms, problems, condition, medication, and more during your
              consultation.<br />
              5. Online doctor consultation at MFine may require you to submit previous medical records, lab results,
              etc. so the doctor can better understand your condition.<br />
              6. Post the teleconsultation, you can get follow-ups with your doctor.<br />
              7. You can also order medicines online from the MFine app.<br />
              8. You can also get lab tests done at home.
            </div>
          </div>
        </div>

        {/* Third Accordion Item */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingThree">
            <button
              className="accordion-button collapsed custom-accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              <h3><b>Which online doctor should I see?</b></h3>
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingThree"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              If you are aware of your condition, you should consult with a doctor of the specialty your condition
              falls under. For example, if you suffer from back pain or fracture, you should see an orthopedician. If
              you suffer from irregular periods, you should consult a gynecologist. But if you are unable to understand
              your symptoms, it will be best to consult a general physician.
            </div>
          </div>
        </div>

        {/* Fourth Accordion Item */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingFour">
            <button
              className="accordion-button collapsed custom-accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFour"
              aria-expanded="false"
              aria-controls="flush-collapseFour"
            >
              <h3><b>Can I choose a specific doctor to consult with?</b></h3>
            </button>
          </h2>
          <div
            id="flush-collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingFour"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Yes, you can avail of online consultation with a doctor of your choice. With multiple doctors in various
              specialties and cities, you can select a doctor based on their profile.
            </div>
          </div>
        </div>

        {/* Fifth Accordion Item */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingFive">
            <button
              className="accordion-button collapsed custom-accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFive"
              aria-expanded="false"
              aria-controls="flush-collapseFive"
            >
              <h3><b>Is my online medical consultation secure?</b></h3>
            </button>
          </h2>
          <div
            id="flush-collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingFive"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              With MFine, you can consult a doctor online without having to worry about privacy. We ensure that your
              interaction with a doctor online remains confidential.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}















export default Homepage;
