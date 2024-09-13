
import './App.css';
import DashBoard from './components/dashboard';
import Landing from './components/landing page/Landing';
import Login from './components/login/Login';
import RegisterPatient from './components/register patient/RegisterPatient';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: 'register',
    element: <RegisterPatient />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'dashboard',
    element: <DashBoard/>,
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
