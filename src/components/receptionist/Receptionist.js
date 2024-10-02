import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../receptionist/receptionist.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate,Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings'
const Receptionist = () => {
  const [activeComponent, setActiveComponent] = useState('default');
  const navigate = useNavigate();
  const receptionistInfo = JSON.parse(localStorage.getItem('receptionistInfo')) || null;

  const hospitalName = receptionistInfo?.hospitalName || 'Unknown Hospital';
  const receptionistName = receptionistInfo?.receptionistName || 'Unknown Receptionist';
  const [appointments, setAppointments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleLogout = () => {
    localStorage.removeItem('recAuthToken');
    localStorage.removeItem('receptionistInfo');
    navigate('/root');
  };
  //fetching appointments
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
    console.log("appointments executed");
    fetchAppointments();
  }, []);
  //fetching pending appointments
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
    console.log("tasks executed");
    fetchTasks();
  }, []);
  const confirmAppointment = async (appointmentId) => {
    const token = localStorage.getItem('recAuthToken');
    const statusId = 1;
    try {
      await axios.put(`https://localhost:44376/api/Appointment/UpdateStatus/${appointmentId}?statusId=${statusId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(prev => prev.filter(task => task.appointmentId !== appointmentId));
      alert(`Appointment for ID ${appointmentId} confirmed!`);
    } catch (error) {
      console.error('Error confirming appointment:', error);
      alert('Error confirming appointment. Please try again.');
    }
  };
  //fetching doctors
  const fetchDoctors = async () => {
    const token = localStorage.getItem('recAuthToken');
    const hospitalId = JSON.parse(localStorage.getItem('receptionistInfo'))?.hospitalId;
    try {
      const response = await axios.get(`https://localhost:44376/api/Doctor/Get/Doctor/HospitalId/${hospitalId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setDoctors(response.data || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDoctors();
  }, []);
  const renderDefaultCards = () => (
    <div className="default-cards d-flex justify-content-between">
      <div className="card-custom flex-fill mx-2">
        <div className="card-header-custom">
          <h5 className="card-title"><i className="fa fa-calendar" aria-hidden="true"></i>   Appointments</h5>
        </div>
        <div className="card-body-custom">
          {
            appointments?.length>0?
            <p className="card-text">You have {appointments.length} completed appointments.</p>:
            <p className="card-text">You have 0 completed appointments</p>
          }
        </div>
      </div>
      <div className="card-custom flex-fill mx-2">
        <div className="card-header-custom">
          <h5 className="card-title"><i class="fas fa-tasks"></i>  Tasks</h5>
        </div>
        <div className="card-body-custom">
          {
            tasks?.length>0?
            <p className="card-text">You have {tasks.length} tasks to complete.</p>:
            <p className="card-text">You have no tasks to complete.</p>
          }
        </div>
      </div>
    </div>
  );
  const handleAddDoctorSuccess = () => {
    setActiveComponent('doctors')
    fetchDoctors(); // Optionally re-fetch doctors after adding a new one
  };
  const handleAddDoctorClick=()=>
  {
    setActiveComponent("AddDoctor");
  }

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
            {activeComponent === 'appointments' && <Appointments appointments={appointments}/>}
          </div>
          <div>
            {activeComponent === 'tasks' && <Tasks tasks={tasks} confirmAppointment={confirmAppointment}/>}
          </div>
          <div>
            {activeComponent === 'doctors' && <Doctors doctors={doctors} error={error} loading={loading} handleAddDoctorClick={handleAddDoctorClick} onAddDoctorSuccess={handleAddDoctorSuccess} />}
          </div>
          <div>
            {activeComponent==='AddDoctor' && <AddDoctor onAddSuccess={handleAddDoctorSuccess}></AddDoctor>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Appointments Component
const Appointments = ({appointments}) => {

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
const Tasks = ({tasks,confirmAppointment}) => {

 
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
const Doctors = ({ doctors, loading, error, handleAddDoctorClick}) => {
  const getRandomRating = () => Math.floor(Math.random() * 5) + 1;
  
  return (
    <div className="doctors-container" >
      <div className='d-flex mb-4 justify-content-between'>
        <h2>Doctors List</h2>
        <button className='btn btn-primary' onClick={handleAddDoctorClick}>Add Doctor</button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {doctors.length > 0 ? (
        doctors.map(doctor => {
          const rating = getRandomRating();
          return (
            <div className="doctor-card d-flex justify-content-between" key={doctor.doctorId}>
              <div className="doctor-image">
                <img
                  src={`data:image/jpeg;base64,${doctor.image}`}
                  className="img-fluid"
                  alt={doctor.name}
                />
              </div>
              <div className="doctor-details">
                <h4>{doctor.name}</h4>
                <strong> {doctor.doctorName}</strong>
                <p>Specialization: {doctor.specialization}</p>
                <p>Consultation Fee: Rs.{doctor.consultationFee}</p>
                <p>Email: {doctor.doctorEmail}</p>
                <p>
                  <StarRatings
                    rating={rating}
                    starRatedColor="gold"
                    numberOfStars={5}
                    name='rating'
                    starDimension="20px"
                    starSpacing="2px"
                  />
                </p>
              </div>
            </div>
          );
        })
      ) : (
        !loading && <div>No doctors available.</div>
      )}
    </div>
  );
};
const AddDoctor = ({ onAddSuccess }) => {
  const [doctorName, setDoctorName] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [contact, setContact] = useState('');
  const [consultationFee, setConsultationFee] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const hospitalId = JSON.parse(localStorage.getItem('receptionistInfo'))?.hospitalId;

    const formData = new FormData();
    formData.append('Doctorname', doctorName);
    formData.append('email', email);
    formData.append('specialization', specialization);
    formData.append('contact', contact);
    formData.append('isAvailable',isAvailable);
    formData.append('consultationFee', consultationFee);
    formData.append('hospitalId', hospitalId);
    if (file) formData.append('file', file);

    try {
      const token = localStorage.getItem('recAuthToken');
      await axios.post('https://localhost:44376/api/Doctor/Add/Doctors', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onAddSuccess(); // Trigger re-fetch or state update
      alert('Doctor added successfully!');
    } catch (error) {
      setError('Error adding doctor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-doctor-form">
      <h2>Add New Doctor</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Doctor Name:</label>
          <input type="text" className="form-control" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Specialization:</label>
          <input type="text" className="form-control" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Contact:</label>
          <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Consultation Fee:</label>
          <input type="number" className="form-control" value={consultationFee} onChange={(e) => setConsultationFee(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Upload Image:</label>
          <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Doctor'}
        </button>
      </form>
    </div>
  );
};

export default Receptionist;
