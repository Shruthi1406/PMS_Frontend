import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../Medicalhistory/VitalSigns.css';

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
    <div className="vital-signs-container mb-4">
      <h2 className="vital-signs-title mb-4">Vital Signs</h2>
      {vitalSigns.length > 0 ? (
        <div className="table-responsive">
          <table className="vital-signs-table table-striped table-bordered">
            <thead className="vital-signs-thead">
              <tr>
                <th className="vital-signs-th">Heart Rate</th>
                <th className="vital-signs-th">Oxygen Saturation</th>
                <th className="vital-signs-th">Blood Pressure</th>
                <th className="vital-signs-th">Temperature</th>
                <th className="vital-signs-th">Respiratory Rate</th>
              </tr>
            </thead>
            <tbody>
              {vitalSigns.map((sign, index) => (
                <tr key={index}>
                  <td className="vital-signs-td" id={`heart-rate-${index}`}>{sign.heartRate}</td>
                  <td className="vital-signs-td" id={`oxygen-saturation-${index}`}>{sign.oxygenSaturation}</td>
                  <td className="vital-signs-td" id={`blood-pressure-${index}`}>{sign.bloodPressure}</td>
                  <td className="vital-signs-td" id={`temperature-${index}`}>{sign.temperature}</td>
                  <td className="vital-signs-td" id={`respiratory-rate-${index}`}>{sign.respiratoryRate}</td>
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

