import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:44376/notificationhub", {
                withCredentials: true,
                accessTokenFactory: () => localStorage.getItem("authToken"),
            })
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

        newConnection.start()
            .then(() => {
                console.log("Connected to SignalR hub.");
                
                newConnection.on("ReceiveNotification", (message) => {
                    setNotifications(prev => [...prev, message]);
                });
            })
            .catch(err => console.error("Connection failed: ", err));

        return () => {
            if (newConnection) {
                newConnection.stop();
            }
        };
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notification;
