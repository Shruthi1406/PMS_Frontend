
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Dashboard/Root';
import Homepage from './components/Dashboard/Homepage';
import Coverpage from './components/CoverPage/Coverpage';
import Footer from './components/Footer';
import Appointments from './components/appointment/Appointments'
import PrivateRoute from './apiHandler/PrivateRoute';
import MedicalHistoryForm from './components/Medicalhistory/Medicalhistory';
import Hospital from './components/Hospitals/Hospital';
import Receptionist from './components/receptionist/Receptionist'
import Doctor from './components/Doctors/Doctor';
const router = createBrowserRouter([ 
  {
    path:"/",
    element:<Coverpage/>
  },
  {
    path: '/root',
    element: <Root/>,
    children:[
      {element:<Homepage/> ,index:true},
      {
        element:<PrivateRoute/>,
        children:[
          {
            path:"appointments",
            element:<Appointments/>
          },
          {
            path:"bookAppointments",
            element:<MedicalHistoryForm/>
          },
          {
            path:"hospitals",
            element:<Hospital/>
          },
          {
            path:"doctors",
            element:<Doctor/>
          }
        ]
      },
    ]
  },
  {
    path:'/receptionist',
    element:<Receptionist/>
  }
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;