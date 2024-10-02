import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../receptionist/receptionist.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate,Link } from 'react-router-dom';

const Receptionist = () => {
  const [activeComponent, setActiveComponent] = useState('default');
  const navigate = useNavigate();
  const receptionistInfo = JSON.parse(localStorage.getItem('receptionistInfo')) || null;

  const hospitalName = receptionistInfo?.hospitalName || 'Unknown Hospital';
  const receptionistName = receptionistInfo?.receptionistName || 'Unknown Receptionist';

  const handleLogout = () => {
    localStorage.removeItem('recAuthToken');
    localStorage.removeItem('receptionistInfo');
    navigate('/root');
  };

  const [tasks, setTasks] = useState([]); // State for tasks count

  const renderDefaultCards = () => (
    <div className="default-cards d-flex justify-content-between">
      <div className="card-custom flex-fill mx-2">
        <div className="card-header-custom">
          <h5 className="card-title"><i className="fa fa-calendar" aria-hidden="true"></i>   Appointments</h5>
        </div>
        <div className="card-body-custom">
          <p className="card-text">You have appointments today.</p>
        </div>
      </div>
      <div className="card-custom flex-fill mx-2">
        <div className="card-header-custom">
          <h5 className="card-title"><i class="fas fa-tasks"></i>  Tasks</h5>
        </div>
        <div className="card-body-custom">
          <p className="card-text">You have  tasks to complete.</p>
        </div>
      </div>
    </div>
  );

  

  return (
    <div className="receptionist-container">
      {/* Navbar */}
      <nav className="navbar-custom sticky-top">
        <div className="container d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="#">
            Hospital Name: {hospitalName}
          </a>
          <span className="navbar-text">Receptionist: {receptionistName}</span>
          <button onClick={handleLogout} className="btn btn-primary">Logout</button>
        </div>
      </nav>

      <div className="main-content d-flex">
        {/* Sidebar */}
        <div className="sidebar-custom">
          <h2 className="sidebar-heading">Overview</h2>
          <ul className="sidebar-links">
            <li><Link onClick={() => setActiveComponent('appointments')}>Appointment History</Link></li>
            <li><Link onClick={() => setActiveComponent('tasks')}>Tasks</Link></li>
            <li><Link onClick={() => setActiveComponent('doctors')}>Doctors</Link></li>
          </ul>
        </div>

        {/* Main Component Area */}
        <div className="overview-section d-flex flex-column">
          <div className='bg-light'>{activeComponent === 'default' &&renderDefaultCards()}</div>
          <div>
            {activeComponent === 'appointments' && <Appointments />}
          </div>
          <div>
            {activeComponent === 'tasks' && <Tasks />}
          </div>
          <div>
            {activeComponent === 'doctors' && <Doctors />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Appointments Component
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('recAuthToken');
      const hospitalName = JSON.parse(localStorage.getItem('receptionistInfo'))?.hospitalName;
      const statusId=2;
      try {
        const response = await axios.get(`https://localhost:44376/api/Appointment/GetHospitalName/${hospitalName}/${statusId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data || []);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  // const confirmAppointment = async (appointmentId) => {
  //   const token = localStorage.getItem('recAuthToken');
  //   const status = 1;
  //   try {
  //     await axios.put(`https://localhost:44376/api/Appointment/UpdateStatus/${appointmentId}?status=${status}`, null, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setAppointments(prev => prev.filter(appointment => appointment.appointmentId !== appointmentId));
  //     alert(`Appointment for ID ${appointmentId} confirmed!`);
  //   } catch (error) {
  //     console.error('Error confirming appointment:', error);
  //     alert('Error confirming appointment. Please try again.');
  //   }
  // };

  return (
    <div>
      <h2 className="text-center mb-4">Appointment List</h2>
      <div className="row">
        {appointments.length === 0 ? (
          <p className="text-center">No appointments available.</p>
        ) : (
          appointments.map((appointment) => (
            <div className="col-12 mb-3" key={appointment.appointmentId}>
              <div className="card-custom">
                <div className="card-body-custom d-flex justify-content-between align-items-start">
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
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Tasks Component
const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('recAuthToken');
      const hospitalName = JSON.parse(localStorage.getItem('receptionistInfo'))?.hospitalName;
      const statusId=-1;
      try {
        const response = await axios.get(`https://localhost:44376/api/Appointment/GetHospitalName/${hospitalName}/${statusId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data || []);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);
  const confirmAppointment = async (appointmentId) => {
    const token = localStorage.getItem('recAuthToken');
    const status = 1;
    try {
      await axios.put(`https://localhost:44376/api/Appointment/UpdateStatus/${appointmentId}?status=${status}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(prev => prev.filter(task => task.appointmentId !== appointmentId));
      alert(`Appointment for ID ${appointmentId} confirmed!`);
    } catch (error) {
      console.error('Error confirming appointment:', error);
      alert('Error confirming appointment. Please try again.');
    }
  };
  return (
    <div>
      <h2 className="text-center mb-4">Appointment List</h2>
      <div className="row">
        {tasks.length === 0 ? (
          <p className="text-center">No appointments available.</p>
        ) : (
          tasks.map((task) => (
            <div className="col-12 mb-3" key={task.appointmentId}>
              <div className="card-custom">
                <div className="card-body-custom d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="card-title">{task.patientName}</h5>
                    <p className="card-text">
                      <strong>Doctor:</strong> {task.doctorName} <br />
                      <strong>Problem:</strong> {task.reason} <br />
                      <strong>Gender:</strong> {task.gender} <br />
                      <strong>Email:</strong> {task.email} <br />
                      <strong>Appointment Time:</strong> {task.appointmentDate}
                    </p>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => confirmAppointment(task.appointmentId)}
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
  );
};

// Doctors Component
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem('recAuthToken');
      const hospitalName = JSON.parse(localStorage.getItem('receptionistInfo'))?.hospitalName;
      try {
        const response = await axios.get(`https://localhost:44376/api/Doctor/GetDoctors/${hospitalName}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(response.data || []);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div>
      <h2 className="text-center mb-4">Doctors</h2>
      <div className="row">
        {doctors.length === 0 ? (
          <p className="text-center">No doctors available.</p>
        ) : (
          doctors.map((doctor) => (
            <div className="col-12 mb-3" key={doctor.doctorId}>
              <div className="card-custom">
                <div className="card-body-custom">
                  <h5 className="card-title">{doctor.name}</h5>
                  <p className="card-text">
                    <strong>Specialty:</strong> {doctor.specialty} <br />
                    <strong>Email:</strong> {doctor.email}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Receptionist;
