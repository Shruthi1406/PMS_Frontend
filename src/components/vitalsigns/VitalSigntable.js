import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../Medicalhistory/VitalSigns.css'; 
import heartrate from '../Assests/heartrate.jpg';
import oxygen from '../Assests/oxygen.jpg';
import bp from '../Assests/bp.jpg';
import temperature from '../Assests/temperature.jpg';
import respiratory from '../Assests/respiratory.jpg';
import api from '../../apiHandler/api';
const VitalSignsTable = () => {
  const patientInfo = localStorage.getItem('patientInfo')!=null ? JSON.parse(localStorage.getItem('patientInfo')) : null;
  const [vitalSigns, setVitalSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchVitalSigns = async () => {
      try {
        if (patientInfo.id) {
          const response = await api.get(`/VitalSign/GetVitalSignsByPatientId`, {
            params: { patientId: patientInfo.id }, 
          });
          console.log('Vital Signs Response:', response.data); 
          if (Array.isArray(response.data)) {
            setVitalSigns(response.data);
          } else if (response.data.vitalSignId) {
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
  }, [patientInfo.id]); // Depend on patientId
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error}</p>;
 
  // Vital sign data structure
  const vitalSignData = [
    { type: 'Heart Rate', value: vitalSigns.length > 0 ? vitalSigns[0].heartRate : 'N/A', image: heartrate },
    { type: 'Oxygen Saturation', value: vitalSigns.length > 0 ? vitalSigns[0].oxygenSaturation : 'N/A', image: oxygen },
    { type: 'Blood Pressure', value: vitalSigns.length > 0 ? vitalSigns[0].bloodPressure : 'N/A', image: bp },
    { type: 'Temperature', value: vitalSigns.length > 0 ? vitalSigns[0].temperature : 'N/A', image: temperature },
    { type: 'Respiratory Rate', value: vitalSigns.length > 0 ? vitalSigns[0].respiratoryRate : 'N/A', image: respiratory },
  ];
 
  return (
<div className="vital-signs-container mb-4" style={{ width: '60%', margin: '0 auto' }}>
  <h2 className="vital-signs-title mb-4">Vital Signs</h2>
  {vitalSignData.length > 0 ? (
  <div className="row">
    {vitalSignData.map((sign, index) => (
    <div className="col-md-4 mb-4" key={index}>
      <div className="card vital-sign-card">
        <img 
          src={sign.image} 
          alt={sign.type} 
          className="card-img-top" 
        />
      <div className="card-body">
        <h5 className="card-title">{sign.type}</h5>
          <p className="card-text">
            <strong>{sign.value}</strong>
          </p>
      </div>
   </div>
  </div>
  ))}
  </div>
        ) : (
  <p>No vital signs available.</p>
        )}
</div>
  );
};
 
export default VitalSignsTable;