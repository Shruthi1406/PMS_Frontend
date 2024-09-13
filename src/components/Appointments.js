import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('https://localhost:44376/api/Appointment/patient/1');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAppointments(data);
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
        </div>
    );
};

export default Appointments;
