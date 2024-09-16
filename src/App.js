
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Dashboard/Root';
import Homepage from './components/Dashboard/Homepage';
import Coverpage from './components/CoverPage/Coverpage';
import Appointments from './components/Appointments';
import PrivateRoute from './apiHandler/PrivateRoute';
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
          }
        ]
      },

    ]
  },
]);

const App = () => {
  return (
    <div>
<<<<<<< HEAD
      {/* <RegisterPatient /> */}
      {/* <VitalSignsTable/> */}
      <PatientDetails/>
=======
      <RouterProvider router={router} />
>>>>>>> dc94f9ffab12607c81d13641836ec213bd23ed91
    </div>
  );
};

export default App;



