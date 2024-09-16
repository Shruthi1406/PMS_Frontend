
import './App.css';
import RegisterPatient from './components/RegisterPatient';
import 'bootstrap/dist/css/bootstrap.min.css';

import VitalSignsTable from './components/Medicalhistory/VitalSigntable';
import PatientDetails from './components/Medicalhistory/Medicalhistory';

function App() {
  return (
    <div>
      {/* <RegisterPatient /> */}
      {/* <VitalSignsTable/> */}
      <PatientDetails/>
    </div>
  );
}

export default App;
