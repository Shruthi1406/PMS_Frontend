import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const { setNotificationCount } = useOutletContext();

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('appointments'));

        if (storedAppointments) {
            const newNotifications = storedAppointments
                .filter(appointment => appointment.statusId === 1)
                .map(appointment => `Your appointment at ${appointment.hospitalName} has been booked successfully on ${new Date(appointment.appointmentDate).toLocaleString()}.`);

            setNotifications(newNotifications);
            setNotificationCount(newNotifications.length); // Set count when notifications are loaded
        } else {
            setNotificationCount(0); // Reset count if no appointments found
        }
    }, [setNotificationCount]);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Notifications</h1>
            {notifications.length > 0 ? (
                <div className="notification-list">
                    {notifications.map((notification, index) => (
                        <div key={index} className="notification alert alert-success">
                            {notification}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No new notifications.</p>
            )}
        </div>
    );
};

export default Notifications;
