import React, { useState, useEffect } from 'react';
import api from '../../apiHandler/api';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link, useNavigate } from 'react-router-dom';
import './Hospital.css'; 



const Hospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await api.get('/Hospital/Get/All/Hospitals');
      console.log('API Response:', response.data);
      setHospitals(response.data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  function handleClick(){
   
    navigate('/root/doctors');
  }

  return (
    <div className="container mt-5 list-hospitals" >
      <h1 className="mb-4 list-hospitals">Hospitals List</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div className="row">
        {hospitals.map(hospital => (
          <div key={hospital.hospitalId} className="col-md-4 mb-4">
            <div className="card custom-card">
            <div className="custom-card-img-container">
              {hospital.hospitalImage ? (
                <img
                  src={`data:image/jpeg;base64,${hospital.hospitalImage}`}
                  className="card-img-top custom-card-img"
                  alt={hospital.hospitalName}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/300x200"
                  className="card-img-top custom-card-img"
                  alt="Placeholder"
                />
              )}
            </div>
              <div className="card-body">
                <h5 className="card-title">{hospital.hospitalName} Hospitals</h5>
                <p className="card-text">City: {hospital.city}</p>
                <p className="card-text">Pincode: {hospital.pincode}</p>
                {/* <div onClick={ handleClick}  className="btn btn-primary">View Doctors</div> */}
                
                <Link to="/root/doctors" state={{hospitalId:hospital.hospitalId}}><div  className="btn btn-primary">View Doctors</div></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hospital;
