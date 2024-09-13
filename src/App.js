
import './App.css';
import DashBoard from './components/dashboard';
import Login from './components/login/Login';
import RegisterPatient from './components/register patient/RegisterPatient';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Navbar from './components/Assests/Navbar';
import Coverpage from './components/CoverPage/Coverpage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Dashboard/Root';
import Homepage from './components/Dashboard/Homepage';

const router = createBrowserRouter([

 
  {
    path: '/',
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
    </div>
  );
};
export default App;



