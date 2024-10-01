import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Removed Link import
import Root from './components/Dashboard/Root';
import Homepage from './components/Dashboard/Homepage';
import Coverpage from './components/CoverPage/Coverpage';
import Appointments from './components/appointment/Appointments';
import PrivateRoute from './apiHandler/PrivateRoute';
import MedicalHistoryForm from './components/Medicalhistory/Medicalhistory';
import Hospital from './components/Hospitals/Hospital';
import Receptionist from './components/receptionist/Receptionist';
import Doctor from './components/Doctors/Doctor';
import VitalSignsTable from './components/vitalsigns/VitalSigntable';
import HospitalSearchComponent from './components/Search';
import { useState } from 'react';
import Specailist from './components/Doctors/Specailist';
import AddDevice from './components/vitalsigns/AddDevice';
import FitbitCallback from './components/fitbit/FitbitCallback';
import FitbitLogin from './components/fitbit/FitbitLogin';
import HeartRateDisplay from './components/fitbit/HeartRateDisplay';
import VitalSignsDisplay from './components/fitbit/VitalSignsDisplay';

import Notifications from './components/Notifications/Notification';
import VitalSigns from './components/vitalsigns/VitalSigns';
import PasswordReset from './components/password/password';
import HealthForm from './apiHandler/HealthForm';
import { NotificationProvider } from './components/Notifications/NotificationContext';
import Navbar from './components/Assests/Navbar';


const App = () => {
  const [location, setLocation] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Coverpage />,
    },
    {
      path: '/root',
      element: <Root notificationCount={notificationCount} 
      setNotificationCount={setNotificationCount}  />,
      children: [
        { element: <Homepage />, index: true },
        {
          element: <PrivateRoute />,
          children: [
            {
              path: 'appointments',
              element: <Appointments />,
            },
            {
              path: 'bookAppointments',
              element: <MedicalHistoryForm />,
            },
            {
              path: 'vitalsignstable',
              element: <VitalSignsTable />,
            },
          ],
        },
        {
          path: '/root/hospitals',
          element: <Hospital />,
        },
        {
          path: '/root/locationSearch',
          element: <HospitalSearchComponent location={location} />,
        },
        {
          path: '/root/doctors',
          element: <Doctor />,
        },
        {
          path:'/root/specialist',
          element:<Specailist/>
        },
        {
          path:'/root/notifications',

          element:<Notifications/>
        },
        {
          path: '/root/fitbit-callback',
          element: <FitbitCallback />,
        },
        {
          path: '/root/fitbit-login',
          element: <FitbitLogin />,
        },
        {
          path: '/root/vital-signs',
          element: <VitalSignsDisplay />,
        },
        {
          path:"/root/add-device",
          element:<AddDevice/>
        },
        {
          path:"/root/vitalsigns",
          element:<VitalSigns/>

        },
        {
          path:"/root/PasswordReset",
          element:<PasswordReset/>
        },
        {
          path:"/root/healthform",
          element:<HealthForm/>

        }
      ],
    },    
    {
      path: '/receptionist',
      element: <Receptionist />,
    },
    {
      path:"/heartrate",
      element:<HeartRateDisplay/>
    },
    
  ]);

  return (
    <NotificationProvider>
      
    <div>
      <RouterProvider router={router} />
    </div>
    </NotificationProvider>
  
  );
};

export default App;
