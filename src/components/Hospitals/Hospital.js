import React, { useState, useEffect } from 'react';
import api from '../../apiHandler/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import './Hospital.css';



const Hospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

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

  const handleReset = () => {
    setSearchTerm('');
    setHospitals([]);
  }

  function handleClick() {

    navigate('/root/doctors');
  }
  function handleSearch() {
    navigate(`/root/locationSearch?location=${location.toLowerCase()}`);
    setLocation('');
  }
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  return (
    <div>
      
      <div className='backgroundimg'>
        <div>
          <ul className="navbar-nav me-auto my-2 my-lg-0">

            <li className='nav-item'>
              <div className="input-group">
                <input type="text" id="search" className="form-control" placeholder="Find hospital by location" aria-label="Recipient's username with two button addons"
                  value={location}
                  onChange={handleLocationChange}
                />
                <button className="btn btn-outline-secondary custom-search-button" type="button" onClick={handleSearch}>Search</button>
              </div>
            </li>
          </ul>

        </div>


  
      <div className="container mt-5 list-hospitals" >
        <h1 className="mb-4 list-hospitals">Hospitals List</h1>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        <div className="row">
          {hospitals.map(hospital => (
            <div key={hospital.hospitalId} className="col-md-3 mb-4">
              <div className="card custom-card hospital-card">
                <div className="custom-card-img-container hospital-image w-100" style={{ width: '18rem' }} >
                  {hospital.hospitalImage ? (
                    <img
                      src={`data:image/jpeg;base64,${hospital.hospitalImage}`}
                      className="card-img-top custom-card-img hospital-images"
                      alt={hospital.hospitalName}
                      style={{ width: '18rem' }}

                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/300x200"
                      className="card-img-top custom-card-img"
                      alt="Placeholder"
                    />
                  )}
                </div>
                <div className="card-body hospital-body">
                  <h5 className="hospital-title">{hospital.hospitalName} Hospital</h5>
                  <p className="card-text">City: {hospital.city}</p>
                  <p className="card-text">Pincode: {hospital.pincode}</p>


                  <Link to="/root/doctors" state={hospital}><div className="btn btn-primary doctor-button">View Doctors</div></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
    </div>

  );
};

export default Hospital;
