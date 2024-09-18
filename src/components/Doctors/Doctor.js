import React, { useEffect, useState } from 'react';
import api from '../../apiHandler/api';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Doctor.css';

function Doctor() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrors] = useState(null);
    const location = useLocation();
    const hospitalId=location.state!=null?location.state.hospitalId:null;
    useEffect(() => {
        handleApi();
    }, []);

   
    function handleApi() {
        api.get('/Doctor/Get/Doctor/HospitalId/'+hospitalId)
            .then(response => {
                setDoctors(response.data);
            })
            .catch(error => {
                setErrors(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <div style={{margin:"100px"}}>
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error.message}</div>}
                {doctors.length > 0 ? (
                    doctors.map(doctor => (
                        <div className="Doctors d-flex justify-content-between" key={doctor.doctorId}>
                            <div className="child Doctor-image">
                                <img
                                    src={`data:image/jpeg;base64,${doctor.image}`}
                                    className="img-fluid"
                                    alt={doctor.doctorName}
                                />
                            </div>
                            <div className="child Doctor-Details">
                                <h4>Doctor Name: {doctor.doctorName}</h4>
                                <p>Specialization: {doctor.specialization}</p>
                                <p>Consultation Fee: {doctor.consultationFee}</p>
                            </div>
                            <div className="child btn btn-primary appointment-button">
                                <Link to='/root/bookAppointments' state={{doctorId:doctor.doctorId}}>Book Appointment</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <div>No doctors available.</div>
                )}
            </div>
        </>
    );
}

export default Doctor;
