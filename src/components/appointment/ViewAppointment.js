import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../apiHandler/api';
import '../css/ViewAppointment.css'

const ViewAppointment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const appointment = location.state;
    const [error, setError] = useState(null);

    const handleCancel = async () => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            try {
                await api.delete(`/Appointment/Cancel/${appointment.appointmentId}`);
                alert('Appointment cancelled successfully.');
                navigate('/root/appointments'); // Navigate back to appointments
            } catch (error) {
                setError('Failed to cancel appointment: ' + (error.response ? error.response.data : error.message));
            }
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!appointment) {
        return <div>Loading...</div>;
    }

    // Calculate the time difference
    const currentDate = new Date();
    const appointmentDate = new Date(appointment.appointmentDate);
    const timeDifference = appointmentDate - currentDate; // Time difference in milliseconds
    const isCancelable = timeDifference >= 48 * 60 * 60 * 1000;

    return (
        <div className="container-bg">
            <h1>Appointment Details</h1>
            <div className="container card p-4 w-50">
                <h5>Hospital Name: <span className="text-muted">{appointment.hospitalName}</span></h5>
                <h5>Doctor Name: <span className="text-muted">{appointment.doctorName}</span></h5>
                <h5>Reason: <span className="text-muted">{appointment.reason}</span></h5>
                <h5>Created At: <span className="text-muted">{new Date(appointment.createdAt).toLocaleString()}</span></h5>
                <h5>Appointment Date: <span className="text-muted">{new Date(appointment.appointmentDate).toLocaleString()}</span></h5>

                {
                    (appointment.statusId === 1 && !isCancelable) ? (
                        <p className="text-warning mt-3">Upcoming Appointment</p>
                    ) : (
                        (appointment.statusId === 1 || appointment.statusId === -1) && isCancelable ? (
                            <button className="btn btn-danger mt-3 " onClick={handleCancel}>
                                Cancel Appointment
                            </button>
                        ) : (
                            appointment.statusId === 0 ? (
                                <p className="text-danger mt-3 fs-1 fw-bold">Cancelled</p>
                            ) : (
                                appointment.statusId === 2 ? (
                                    <p className="text-success mt-3">Completed</p>
                                ) : null
                            )
                        )
                    )
                }
            </div>
        </div>
    );
};

export default ViewAppointment;
