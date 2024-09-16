import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Dashboard/Root';
import Homepage from './components/Dashboard/Homepage';
import Coverpage from './components/CoverPage/Coverpage';
import Appointments from './components/appointment/Appointments'
import PrivateRoute from './apiHandler/PrivateRoute';
import Receptionist from './components/receptionist/Receptionist'
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