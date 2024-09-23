import React from 'react';
import './css/Footer.css'
import PmsLogo1 from '../components/Assests/PmsLogo1.jpg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-column">
            <div className="footer-title">Find your Doctor</div>
            <div className="footer-links">
              <a className="footer-item" href="#"  rel="noopener noreferrer">About</a>
              <a className="footer-item" href="#"  rel="noopener noreferrer">Blog</a>
              <a className="footer-item" href="#"  rel="noopener noreferrer">Careers</a>
              <a className="footer-item" href="#"  rel="noopener noreferrer">Press</a>
              <a className="footer-item" href="#"  rel="noopener noreferrer">Contact Us</a>
            </div>
          </div>
          <div className="footer-column">
            <div className="footer-title">For patients</div>
            <div className="footer-links">
              <a className="footer-item" href="#">Search for doctors</a>
              <a className="footer-item" href="#">Search for clinics</a>
              <a className="footer-item" href="#">Search for hospitals</a>
              <a className="footer-item" href="#">MedMonitor Plus</a>
              <a className="footer-item" href="#">Covid Hospital listing</a>
              <a className="footer-item" href="#">Practo Care Clinics</a>
              <a className="footer-item" href="#">Read health articles</a>
              <a className="footer-item" href="#">Read about medicines</a>
              <a className="footer-item" href="#">MedMonitor drive</a>
              <a className="footer-item" href="#">Health app</a>
            </div>
          </div>
          <div className="footer-column">
            <div className="footer-title">For doctors</div>
            <div className="footer-links">
              <a className="footer-item" href="#">MedMonitor Profile</a>
            </div>
            <div className="footer-title">For clinics</div>
            <div className="footer-links">
              <a className="footer-item" href="#">Ray by MedMonitor</a>
              <a className="footer-item" href="#">MedMonitor Reach</a>
              <a className="footer-item" href="#">Ray Tab</a>
              <a className="footer-item" href="#">MedMonitor Pro</a>
            </div>
          </div>
          <div className="footer-column">
            <div className="footer-title">For hospitals</div>
            <div className="footer-links">
              <a className="footer-item" href="#">Insta by MedMonitor</a>
              <a className="footer-item" href="#">Qikwell by MedMonitor</a>
              <a className="footer-item" href="#">MedMonitor Profile</a>
              <a className="footer-item" href="#">MedMonitor Reach</a>
              <a className="footer-item" href="#">MedMonitor Drive</a>
            </div>
            <div className="footer-title">For Corporates</div>
            <div className="footer-links">
              <a className="footer-item" href="#">Wellness Plans</a>
            </div>
          </div>
          <div className="footer-column">
            <div className="footer-title">More</div>
            <div className="footer-links">
              <a className="footer-item" href="#">Help</a>
              <a className="footer-item" href="#">Developers</a>
              <a className="footer-item" href="#">Privacy Policy</a>
              <a className="footer-item" href="#">Terms & Conditions</a>
              <a className="footer-item" href="#">PCS T&C</a>
              <a className="footer-item" href="#">Healthcare Directory</a>
              <a className="footer-item" href="#">MedMonitor Health Wiki</a>
            </div>
          </div>
          <div className="footer-column">
            <div className="footer-title">Social</div>
            <div className="footer-links">
              <a className="footer-item" href="#" rel="nofollow">Facebook</a>
              <a className="footer-item" href="#" rel="nofollow">Twitter</a>
              <a className="footer-item" href="#" rel="nofollow">LinkedIn</a>
              <a className="footer-item" href="#" rel="nofollow">Youtube</a>
              <a className="footer-item" href="#" rel="nofollow">Github</a>
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
