import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../apiHandler/api';
const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
                const response = await api.get('/Appointment/patient/'+patientInfo.patientId);
                if (!response.data) {
                    throw new Error('Network response was not ok');
                }
                setAppointments(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchAppointments();
    }, []);

    if (error) {
        return <div className="alert alert-danger">Error: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Appointments</h1>
            {
                appointments.length==0?
                <div>
                    <h3>You don't have any Appointments</h3>
                </div>:
                <table className="table table-striped table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Hospital Name</th>
                        <th>Doctor Name</th>
                        <th>Reason</th>
                        <th>Created At</th>
                        <th>Appointment Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.appointmentId}>
                            <td>{appointment.hospitalName}</td>
                            <td>{appointment.doctorName}</td>
                            <td>{appointment.reason}</td>
                            <td>{new Date(appointment.createdAt).toLocaleString()}</td>
                            <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
                            <td>{appointment.statusId === 1 ? 'Booked' : 'Cancelled'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
        </div>
    );
};

export default Appointments;
