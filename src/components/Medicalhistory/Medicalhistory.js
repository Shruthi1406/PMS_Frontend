import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../Medicalhistory/Medicalhistoryform.css';

const MedicalHistoryForm = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    recordedDate: '',
    reason: '',
    doctorName: '',
    hospitalName: '',
    medication: '',
    hasAsthma: false,
    hasBloodPressure: false,
    hasCancer: false,
    hasCholesterol: false,
    hasDiabetes: false,
    hasHeartDisease: false,
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleMedicationChange = (e) => {
    setFormData({
      ...formData,
      medication: e.target.value.split(',').map(med => med.trim()),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:44376/api/History', formData);
      setSuccessMessage('Medical history submitted successfully');
      setFormData({
        patientId: '',
        doctorId: '',
        recordedDate: '',
        reason: '',
        doctorName: '',
        hospitalName: '',
        medication: '',
        hasAsthma: false,
        hasBloodPressure: false,
        hasCancer: false,
        hasCholesterol: false,
        hasDiabetes: false,
        hasHeartDisease: false,
      });
    } catch (error) {
      console.error('There was an error!', error);
      setSuccessMessage('There was an error submitting the form');
    }
  };

  return (
    <div className="container mt-4">
      <div className="form-container">
        <h1 className="text-center mb-4">Medical History Form</h1>
        <form onSubmit={handleSubmit}>
          {/* <div className="form-group">
            <label htmlFor="patientId">Patient ID:</label>
            <input
              type="number"
              id="patientId"
              name="patientId"
              className="form-control"
              value={formData.patientId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctorId">Doctor ID:</label>
            <input
              type="number"
              id="doctorId"
              name="doctorId"
              className="form-control"
              value={formData.doctorId}
              onChange={handleChange}
              required
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="recordedDate">Recorded Date:</label>
            <input
              type="date"
              id="recordedDate"
              name="recordedDate"
              className="form-control"
              value={formData.recordedDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason">Reason:</label>
            <input
              type="text"
              id="reason"
              name="reason"
              className="form-control"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctorName">Doctor Name:</label>
            <input
              type="text"
              id="doctorName"
              name="doctorName"
              className="form-control"
              value={formData.doctorName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hospitalName">Hospital Name:</label>
            <input
              type="text"
              id="hospitalName"
              name="hospitalName"
              className="form-control"
              value={formData.hospitalName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="medication">Medication (comma separated):</label>
            <input
              type="text"
              id="medication"
              name="medication"
              className="form-control"
              value={formData.medication}
              onChange={handleMedicationChange}
            />
          </div>
          <div className="form-group">
            <label>Medical Conditions:</label>
            <div className="form-check">
              <input
                type="checkbox"
                id="hasAsthma"
                name="hasAsthma"
                className="form-check-input"
                checked={formData.hasAsthma}
                onChange={handleChange}
              />
              <label htmlFor="hasAsthma" className="form-check-label">Has Asthma</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="hasBloodPressure"
                name="hasBloodPressure"
                className="form-check-input"
                checked={formData.hasBloodPressure}
                onChange={handleChange}
              />
              <label htmlFor="hasBloodPressure" className="form-check-label">Has Blood Pressure</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="hasCancer"
                name="hasCancer"
                className="form-check-input"
                checked={formData.hasCancer}
                onChange={handleChange}
              />
              <label htmlFor="hasCancer" className="form-check-label">Has Cancer</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="hasCholesterol"
                name="hasCholesterol"
                className="form-check-input"
                checked={formData.hasCholesterol}
                onChange={handleChange}
              />
              <label htmlFor="hasCholesterol" className="form-check-label">Has Cholesterol</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="hasDiabetes"
                name="hasDiabetes"
                className="form-check-input"
                checked={formData.hasDiabetes}
                onChange={handleChange}
              />
              <label htmlFor="hasDiabetes" className="form-check-label">Has Diabetes</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="hasHeartDisease"
                name="hasHeartDisease"
                className="form-check-input"
                checked={formData.hasHeartDisease}
                onChange={handleChange}
              />
              <label htmlFor="hasHeartDisease" className="form-check-label">Has Heart Disease</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          {successMessage && (
            <div className="alert alert-success mt-3" role="alert">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MedicalHistoryForm;
