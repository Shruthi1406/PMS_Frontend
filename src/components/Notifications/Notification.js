// import React, { useEffect, useState } from 'react';
// import { useOutletContext } from 'react-router-dom';
// import { useNotification } from './NotificationContext';

// const Notifications = () => {
//     const [notifications, setNotifications] = useState([]);
//     const { setNotificationCount } =  useNotification();

//     useEffect(() => {
//         const storedAppointments = JSON.parse(localStorage.getItem('appointments'));

//         if (storedAppointments) {
//             const newNotifications = storedAppointments
//                 .filter(appointment => appointment.statusId === 1)
//                 .map(appointment => `Your appointment at ${appointment.hospitalName} has been booked successfully on ${new Date(appointment.appointmentDate).toLocaleString()}.`);

//             setNotifications(newNotifications);
//             setNotificationCount(newNotifications.length);
            
//              // Set count when notifications are loaded
//         } else {
//             setNotificationCount(0); // Reset count if no appointments found
//         }
//     }, [setNotificationCount, localStorage.getItem('appointments')]);


//     return (
//         <div className="container mt-5">
//             <h1 className="mb-4">Notifications</h1>
//             {notifications.length > 0 ? (
//                 <div className="notification-list">
//                     {notifications.map((notification, index) => (
//                         <div key={index} className="notification alert alert-success">
//                             {notification}
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>No new notifications.</p>
//             )}
//         </div>
//     );
// };

// export default Notifications;


import React, { useEffect, useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNotification } from './NotificationContext';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { setNotificationCount } = useNotification();
  const storedAppointmentsRef = useRef(null);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments'));
    storedAppointmentsRef.current = storedAppointments;

    if (storedAppointments) {
      const newNotifications = storedAppointments
        .filter(appointment => appointment.statusId === 1)
        .map(appointment => `Your appointment at ${appointment.hospitalName} has been booked successfully on ${new Date(appointment.appointmentDate).toLocaleString()}.`);

      setNotifications(newNotifications);
      setNotificationCount(newNotifications.length);

    
    } else {
      setNotificationCount(0); // Reset count if no appointments found
    }
  }, [setNotificationCount, storedAppointmentsRef.current]);


  useEffect(() => {
    const handleStorageChange = () => {
      const storedAppointments = JSON.parse(localStorage.getItem('appointments'));
      if (storedAppointments !== storedAppointmentsRef.current) {
        storedAppointmentsRef.current = storedAppointments;
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Clear notifications when navigating to the Notifications tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setNotifications([]);
        setNotificationCount(0);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
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

// import React, { useEffect, useState } from 'react';
// import { useNotification } from './NotificationContext';

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const { setNotificationCount } = useNotification();

//   useEffect(() => {
   
//     const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

  
//     const hasViewedNotifications = localStorage.getItem('hasViewedNotifications');

//     if (!hasViewedNotifications) {
//       const newNotifications = storedAppointments
//         .filter(appointment => appointment.statusId === 1)
//         .map(appointment => `Your appointment at ${appointment.hospitalName} has been booked successfully on ${new Date(appointment.appointmentDate).toLocaleString()}.`);

//       if (newNotifications.length > 0) {
//         setNotifications(newNotifications);
//         setNotificationCount(newNotifications.length);

        
//       }

    
//       if (newNotifications.length > 0) {
//         localStorage.setItem('hasViewedNotifications', 'true');
//       }
//     } else {
      
//       setNotifications([]);
//       setNotificationCount(0);
//     }
//   }, [setNotificationCount]);

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Notifications</h1>
//       {notifications.length > 0 ? (
//         <div className="notification-list">
//           {notifications.map((notification, index) => (
//             <div key={index} className="notification alert alert-success">
//               {notification}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No new notifications.</p>
//       )}
//     </div>
//   );
// };

// export default Notifications;


// import React, { useEffect, useState } from 'react';
// import { useNotification } from './NotificationContext';

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const { setNotificationCount } = useNotification();

//   useEffect(() => {
//     const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
//     const hasViewedNotifications = localStorage.getItem('hasViewedNotifications');

//     if (!hasViewedNotifications) {
//       const newNotifications = storedAppointments
//         .filter(appointment => appointment.statusId === 1)
//         .map(appointment => `Your appointment at ${appointment.hospitalName} has been booked successfully on ${new Date(appointment.appointmentDate).toLocaleString()}.`);

//       if (newNotifications.length > 0) {
//         setNotifications(newNotifications);
//         setNotificationCount(newNotifications.length);

//         // Set the flag to true after 5 seconds
//         const timer = setTimeout(() => {
//           localStorage.setItem('hasViewedNotifications', 'true');
//         }, 5000);

//         // Cleanup the timer on unmount
//         return () => clearTimeout(timer);
//       }
//     } else {
//       setNotifications([]);
//       setNotificationCount(0);
//     }
//   }, [setNotificationCount]);

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Notifications</h1>
//       {notifications.length > 0 ? (
//         <div className="notification-list">
//           {notifications.map((notification, index) => (
//             <div key={index} className="notification alert alert-success">
//               {notification}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No new notifications.</p>
//       )}
//     </div>
//   );
// };

// export default Notifications;

