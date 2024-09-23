import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../apiHandler/api';
import '../css/Appointments.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));
                const response = await api.get('/Appointment/GetAppointmentByPatientId/' + patientInfo.patientId);
                
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

    const getStatusText = (appointment) => {
        const currentDate = new Date();

        if (new Date(appointment.appointmentDate) < currentDate) {
            return 'Completed';
        }

        switch (appointment.statusId) {
            case 1:
                return 'Booked';
            case 0:
                return 'Cancelled';
            case -1:
                return 'Pending';
            default:
                return 'Unknown'; 
        }
    };

    const getStatusClass = (appointment) => {
        const currentDate = new Date();

        if (new Date(appointment.appointmentDate) < currentDate) {
            return 'bg-info text-white'; 
        }

        switch (appointment.statusId) {
            case 1:
                return 'bg-success text-white'; 
            case 0:
                return 'bg-danger text-white'; 
            case -1:
                return 'bg-warning text-dark'; 
            default:
                return 'bg-secondary text-white'; 
        }
    };

    if (error) {
        return <div className="alert alert-danger">Error: {error}</div>;
    }

    return (
        <div className="container mt-5 appointments-heading">
            <h1 className="mb-4">Appointments</h1>
            {
                appointments.length === 0 ?
                <div>
                    <h3>You don't have any Appointments</h3>
                </div> :
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
                                <td className={getStatusClass(appointment)}>
                                    {getStatusText(appointment)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
};

export default Appointments;
