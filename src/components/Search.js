import React, { useState } from 'react';
//import './SearchComponent.css';
import { Link } from 'react-router-dom';

const HospitalSearchComponent = () => {
    const [location, setLocation] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = () => {
        if (!location) return;

        setLoading(true);
        setError(null);
        fetch(`https://localhost:44376/api/Hospital/Get/HospitalsByLocation?location=Hyderabad`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setHospitals(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    };

    return (
        <div className="search-component">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for hospitals by location..."
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            <div className="hospital-list">
                {hospitals.length > 0 ? (
                    hospitals.map(hospital => (
                        <Link to={`/hospital/${hospital.hospitalId}`} key={hospital.hospitalId} className="hospital-item">
                            <div className="hospital-info">
                                <h3>{hospital.hospitalName}</h3>
                                <p>Location: {hospital.city}</p>
                                <p>Pincode: {hospital.pincode}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No hospitals found.</p>
                )}
            </div>
        </div>
    );
};

export default HospitalSearchComponent;
