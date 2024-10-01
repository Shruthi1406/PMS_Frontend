// import React, { createContext, useContext, useState, useEffect } from 'react';

// const NotificationContext = createContext();

// export const useNotification = () => useContext(NotificationContext);

// export const NotificationProvider = ({ children }) => {
//     const [notificationCount, setNotificationCount] = useState(() => {
//         // Initialize state from local storage
//         const savedCount = localStorage.getItem('notificationCount');
//         return savedCount ? parseInt(savedCount, 10) : 0;
//     });

//     useEffect(() => {
//         // Store the notification count in local storage whenever it changes
//         localStorage.setItem('notificationCount', notificationCount);
//     }, [notificationCount]);

//     return (
//         <NotificationContext.Provider value={{ notificationCount, setNotificationCount }}>
//             {children}
//         </NotificationContext.Provider>
//     );
// };

import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(() => {
    // Initialize state from local storage
    const savedCount = localStorage.getItem('notificationCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    // Store the notification count in local storage whenever it changes
    localStorage.setItem('notificationCount', notificationCount);
  }, [notificationCount]);

  useEffect(() => {
    // Update the notification count whenever the appointments in local storage change
    const storedAppointments = JSON.parse(localStorage.getItem('appointments'));
    if (storedAppointments) {
      const newNotifications = storedAppointments.filter(appointment => appointment.statusId === 1);
      setNotificationCount(newNotifications.length);
    } else {
      setNotificationCount(0);
    }
  }, [localStorage.getItem('appointments')]);

  return (
    <NotificationContext.Provider value={{ notificationCount, setNotificationCount }}>
      {children}
    </NotificationContext.Provider>
  );
};
