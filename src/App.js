import './App.css';
// import DashBoard from './components/dashboard';
// import Login from './components/login/Login';
// import RegisterPatient from './components/register patient/RegisterPatient';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Navbar from './components/Assests/Navbar';
//import Coverpage from './components/CoverPage/Coverpage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//import PrivateRoute from './apiHandler/PrivateRoute';
//import Coverpage from './components/CoverPage/Coverpage';
import Root from './components/Dashboard/Root';
import Homepage from './components/Dashboard/Homepage';
import Coverpage from './components/CoverPage/Coverpage';
import Appointments from './components/Appointments';


const router = createBrowserRouter([ 
  {
    path:"/",
    element:<Coverpage/>
  },
  {
    path: '/root',
    element: <Root/>,
    children:[
      {element:<Homepage/> ,index:true}
    ]
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    <div>      
  );
};

export default App;



