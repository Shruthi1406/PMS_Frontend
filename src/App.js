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

const App = () => {
  const [location, setLocation] = useState('');

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
      element: <Root location={location} handleLocationChange={handleLocationChange} />,
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
              path: 'vitalsigns',
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
      ],
    },
    {
      path: '/receptionist',
      element: <Receptionist />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
