import './App.css';
import DashBoard from './components/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoute from './apiHandler/PrivateRoute';
import Coverpage from './components/CoverPage/Coverpage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Coverpage />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: 'dashboard',
        element: <DashBoard />,
      },
    ],
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
