import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../receptionist/receptionist.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../apiHandler/api';
import { useNavigate } from 'react-router-dom';

const Receptionist = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const receptionistInfo = localStorage.getItem('receptionistInfo') ? JSON.parse(localStorage.getItem('receptionistInfo')) : null;

  const hospitalName = receptionistInfo?.hospitalName || 'Unknown Hospital';
  const receptionistName = receptionistInfo?.receptionistName || 'Unknown Receptionist';

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('recAuthToken');
        const response = await axios.get(`https://localhost:44376/api/Appointment/GetHospitalName/${hospitalName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setAppointments(response.data);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [hospitalName]);

  const confirmAppointment = async (appointmentId) => {
    try {
      const token=localStorage.getItem("recAuthToken");
      const status = 1;
      const response = await axios.put(`https://localhost:44376/api/Appointment/UpdateStatus/${appointmentId}?status=${status}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.appointmentId !== appointmentId)
        );
      alert(`Appointment for ID ${appointmentId} confirmed!`);
      } 
    }
    catch (error) {
      console.error('Error confirming appointment:', error);
      alert('Error confirming appointment. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('recAuthToken');
    localStorage.removeItem('receptionistInfo');
    navigate('/root');
  };

  return (
    <div className="image">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{ background: 'skyblue' }}>
        <div className="container d-flex justify-content-between">
          <a className="navbar-brand" href="#">
            Hospital Name: {hospitalName}
          </a>
          <span className="nav-link">Receptionist: {receptionistName}</span>
          <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5 rec-container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <h2 className="text-center mb-4">Appointment List</h2>
            <div className="row">
              {appointments.length === 0 ? (
                <p className="text-center">No appointments available.</p>
              ) : (
                appointments.map((appointment) => (
                  <div className="col-12 mb-3" key={appointment.appointmentId}>
                    <div className="card">
                      <div className="card-body d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="card-title">{appointment.patientName}</h5>
                          <p className="card-text">
                            <strong>Doctor:</strong> {appointment.doctorName} <br />
                            <strong>Problem:</strong> {appointment.reason} <br />
                            <strong>Gender:</strong> {appointment.gender} <br />
                            <strong>Email:</strong> {appointment.email} <br />
                            <strong>Appointment Time:</strong> {appointment.appointmentDate}
                          </p>
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={() => confirmAppointment(appointment.appointmentId)}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receptionist;
