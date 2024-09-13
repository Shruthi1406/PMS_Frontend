import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientDetails = ({ patientId = 2 }) => {
  const [hospitalName, setHospitalName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for the given patientId
        const [hospitalResponse, doctorResponse, medicalHistoryResponse] = await Promise.all([
          axios.get(`https://localhost:44376/api/Hospital/get/${patientId}`),
          axios.get(`https://localhost:44376/api/Doctor/Get/DoctorById/${patientId}`),
          axios.get(`https://localhost:44376/api/History?patientId=${patientId}`)
        ]);

        // Log responses to check data
        console.log('Hospital Response:', hospitalResponse.data);
        console.log('Doctor Response:', doctorResponse.data);
        console.log('Medical History Response:', medicalHistoryResponse.data);

        // Process and set state
        setHospitalName(hospitalResponse.data.hospitalName || 'No hospital name available');
        setDoctorName(doctorResponse.data.doctorName || 'No doctor name available');

        // Assuming medicalHistoryResponse.data is an array
        const history = medicalHistoryResponse.data[0] || {}; // Take the first item from array or empty object
        setReason(history.reason || 'No reason available');

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err.response || err.message);
        setError(err);
        setLoading(false);
      }
    }; 

    fetchData();
  }, [patientId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div>
      <h1>Patient Details</h1>
      <p><strong>Hospital:</strong> {hospitalName}</p>
      <p><strong>Doctor:</strong> {doctorName}</p>
      <p><strong>Reason:</strong> {reason}</p>
    </div>
  );
};

export default PatientDetails;
