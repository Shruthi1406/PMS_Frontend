import React from 'react';
import './css/Footer.css'; // Import custom CSS for additional styles
import PmsLogo1 from './Assests/newlogo.png'; // Path to your logo

const Footer = () => {
  return (
    <footer className="footer-background">
      <div className="footer-wrapper">
        <div className="footer-content container">
          <div className="footer-column">
            <h5 className="footer-title">Find your Doctor</h5>
            <div className="footer-links">
              <a href="#" className="footer-item">About</a>
              <a href="#" className="footer-item">Blog</a>
              <a href="#" className="footer-item">Careers</a>
              <a href="#" className="footer-item">Press</a>
              <a href="#" className="footer-item">Contact Us</a>
            </div>
          </div>
          <div className="footer-column">
            <h5 className="footer-title">For Patients</h5>
            <div className="footer-links">
              <a href="#" className="footer-item">Search for doctors</a>
              <a href="#" className="footer-item">Search for clinics</a>
              <a href="#" className="footer-item">Search for hospitals</a>
              <a href="#" className="footer-item">MedMonitor Plus</a>
              <a href="#" className="footer-item">Covid Hospital Listing</a>
              <a href="#" className="footer-item">Practo Care Clinics</a>
              <a href="#" className="footer-item">Read health articles</a>
              <a href="#" className="footer-item">Read about medicines</a>
              <a href="#" className="footer-item">MedMonitor Drive</a>
              <a href="#" className="footer-item">Health app</a>
            </div>
          </div>
          <div className="footer-column">
            <h5 className="footer-title">For Doctors</h5>
            <div className="footer-links">
              <a href="#" className="footer-item">MedMonitor Profile</a>
            </div>
            
            <div className="footer-links">
              <a href="#" className="footer-item">Ray by MedMonitor</a>
              <a href="#" className="footer-item">MedMonitor Reach</a>
              <a href="#" className="footer-item">Ray Tab</a>
              <a href="#" className="footer-item">MedMonitor Pro</a>
            </div>
          </div>
          <div className="footer-column">
            <h5 className="footer-title">For Hospitals</h5>
            <div className="footer-links">
              <a href="#" className="footer-item">Insta by MedMonitor</a>
              <a href="#" className="footer-item">Qikwell by MedMonitor</a>
              <a href="#" className="footer-item">MedMonitor Profile</a>
              <a href="#" className="footer-item">MedMonitor Reach</a>
              <a href="#" className="footer-item">MedMonitor Drive</a>
            </div>
            <div className="footer-links">
              <a href="#" className="footer-item">Wellness Plans</a>
            </div>
          </div>
          <div className="footer-column">
            <h5 className="footer-title">More</h5>
            <div className="footer-links">
              <a href="#" className="footer-item">Help</a>
              <a href="#" className="footer-item">Developers</a>
              <a href="#" className="footer-item">Privacy Policy</a>
              <a href="#" className="footer-item">Terms & Conditions</a>
              <a href="#" className="footer-item">PCS T&C</a>
              <a href="#" className="footer-item">Healthcare Directory</a>
              <a href="#" className="footer-item">MedMonitor Health Wiki</a>
            </div>
          </div>
          <div className="footer-column">
            <h5 className="footer-title">Social</h5>
            <div className="footer-links">
              <a href="#" className="footer-item" rel="nofollow">Facebook</a>
              <a href="#" className="footer-item" rel="nofollow">Twitter</a>
              <a href="#" className="footer-item" rel="nofollow">LinkedIn</a>
              <a href="#" className="footer-item" rel="nofollow">YouTube</a>
              <a href="#" className="footer-item" rel="nofollow">GitHub</a>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <img src={PmsLogo1} alt="MedMonitor" className="footer-logo" />
          <div className="copyright-text">
            <span>Copyright © {new Date().getFullYear()}, MedMonitor. </span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
