
import './App.css';
//import RegisterPatient from './components/RegisterPatient';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {createBrowserRouter,RouerProvider} from 'react-router-dom';
//import Navbar from './components/Assests/Navbar';
import Coverpage from './components/CoverPage/Coverpage';

// const router=createBrowserRouter([
//   {path:'/',element:<Navbar/>,
// children:[
//   {path:'/', element:<Navbar/>}
// ]}
// ])
function App() {
  return (
    <div>
      {/* <RegisterPatient />
      <Navbar/> */}
      <Coverpage/>
    </div>
  );
}

export default App;
