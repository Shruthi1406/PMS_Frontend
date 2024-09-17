import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const VitalSignsTable = () => {
  const [patientId] = useState(2); // Default patientId
  const [vitalSigns, setVitalSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVitalSigns = async () => {
      try {
        if (patientId) {
          const response = await axios.get(`https://localhost:44376/api/VitalSign/GetVitalSigns?patientId=${patientId}`);
          console.log('Vital Signs Response:', response.data); // Log data for debugging

          // Check if response data is an array or a single object
          if (Array.isArray(response.data)) {
            setVitalSigns(response.data);
          } else if (response.data.vitalSignId) {
            // Convert single object to array
            setVitalSigns([response.data]);
          } else {
            console.error('Unexpected data format:', response.data);
            setError('Unexpected data format');
          }
        } else {
          console.error('Patient ID is required');
          setError('Patient ID is required');
        }
      } catch (err) {
        console.error('Error fetching data:', err.message || 'Error fetching data');
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchVitalSigns();
  }, [patientId]); // Depend on patientId

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Vital Signs for Patient {patientId}</h2>
      {vitalSigns.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Heart Rate</th>
                <th>Oxygen Saturation</th>
                <th>Blood Pressure</th>
                <th>Temperature</th>
                <th>Respiratory Rate</th>
              </tr>
            </thead>
            <tbody>
              {vitalSigns.map((sign, index) => (
                <tr key={index}>
                  <td>{sign.heartRate}</td>
                  <td>{sign.oxygenSaturation}</td>
                  <td>{sign.bloodPressure}</td>
                  <td>{sign.temperature}</td>
                  <td>{sign.respiratoryRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No vital signs available.</p>
      )}
    </div>
  );
};

export default VitalSignsTable;

