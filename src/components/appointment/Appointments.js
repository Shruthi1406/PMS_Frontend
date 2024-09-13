import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Appointments.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('https://localhost:44376/api/Appointment/patient/4');
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

    const getStatusText = (statusId) => {
        if (statusId === 1) {
            return 'Booked';
        } else if (statusId === 0) {
            return 'Cancelled';
        } else if (statusId === -1) {
            return 'Pending';
        } else {
            return 'Unknown'; 
        }
    };

    const getStatusClass = (statusId) => {
        if (statusId === 1) {
            return 'bg-success text-white'; 
        } else if (statusId === 0) {
            return 'bg-danger text-white'; 
        } else if (statusId === -1) {
            return 'bg-warning text-dark'; 
        } else {
            return 'bg-secondary text-white'; 
        }
    };

    if (error) {
        return <div className="alert alert-danger">Error: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-skyblue">Appointments</h1>
            <table className="table table-striped table-bordered table-hover table-custom">
                <thead>
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
                            <td className={getStatusClass(appointment.statusId)}>
                                {getStatusText(appointment.statusId)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Appointments;
