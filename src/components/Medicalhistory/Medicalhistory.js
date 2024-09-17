import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Medicalhistory/Medicalhistoryform.css';

const CombinedForm = () => {
  const [formData, setFormData] = useState({
    // Medical History Fields
    patientId: '',
    doctorId: '',
    recordedDate: '',
    reason: '',
    doctorName: '',
    hospitalName: '',
    medication: [], // Keep this as an array for the DTO
    hasAsthma: false,
    hasBloodPressure: false,
    hasCancer: false,
    hasCholesterol: false,
    hasDiabetes: false,
    hasHeartDisease: false,
    exerciseFrequency: '', 
    alcoholConsumption: '', 
    smoke: '', 

    // Appointment Fields
    patientName: '',
    gender: '',
    height: '', // Ensure correct type (number)
    weight: '', // Ensure correct type (number)
    dob: '',
    email: '',
    appointmentDate: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleMedicationChange = (e) => {
    const medicationArray = e.target.value.split(',').map(med => med.trim()).filter(med => med.length > 0);
    setFormData({
      ...formData,
      medication: medicationArray
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validation of form data before sending
      if (!formData.patientId || !formData.doctorId) {
        throw new Error('Patient ID and Doctor ID are required.');
      }

      // Prepare data for the first API call
      const medicalHistoryData = {
        patientId: formData.patientId,
        doctorId: formData.doctorId,
        recordedDate: formData.recordedDate,
        reason: formData.reason,
        doctorName: formData.doctorName,
        hospitalName: formData.hospitalName,
        medication: formData.medication,
        hasAsthma: formData.hasAsthma,
        hasBloodPressure: formData.hasBloodPressure,
        hasCancer: formData.hasCancer,
        hasCholesterol: formData.hasCholesterol,
        hasDiabetes: formData.hasDiabetes,
        hasHeartDisease: formData.hasHeartDisease,
        exerciseFrequency: formData.exerciseFrequency,
        alcoholConsumption: formData.alcoholConsumption,
        smoke: formData.smoke,
      };

      // First API call: Submit medical history
      const medicalHistoryResponse = await axios.post('https://localhost:44376/api/History', medicalHistoryData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Medical History Response:', medicalHistoryResponse);

      if (!medicalHistoryResponse.data.historyId) {
        throw new Error('Medical History ID not found in response');
      }

      const medicalHistoryId = medicalHistoryResponse.data.historyId;

      // Prepare data for the second API call
      const appointmentData = {
        patientId: formData.patientId,
        doctorId: formData.doctorId,
        patientName: formData.patientName,
        gender: formData.gender,
        height: parseInt(formData.height, 10),
        weight: parseInt(formData.weight, 10),
        dob: formData.dob,
        email: formData.email,
        appointmentDate: formData.appointmentDate,
        statusId: -1, // default value
        hospitalName: formData.hospitalName,
        reason: formData.reason,
        createdAt: new Date().toISOString(), // current timestamp
        doctorName: formData.doctorName,
        medicalHistoryId // Pass medicalHistoryId to appointment
      };

      // Second API call: Schedule appointment
      const appointmentResponse = await axios.post('https://localhost:44376/api/Appointment/schedule', appointmentData);
      console.log('Appointment Response:', appointmentResponse);

      setSuccessMessage('Form submitted successfully');
      setErrorMessage('');
      
      // Clear form fields
      setFormData({
        patientId: '',
        doctorId: '',
        recordedDate: '',
        reason: '',
        doctorName: '',
        hospitalName: '',
        medication: [], // Reset to an empty array
        hasAsthma: false,
        hasBloodPressure: false,
        hasCancer: false,
        hasCholesterol: false,
        hasDiabetes: false,
        hasHeartDisease: false,
        exerciseFrequency: '',
        alcoholConsumption: '',
        smoke: '', 
        patientName: '',
        gender: '',
        height: '',
        weight: '',
        dob: '',
        email: '',
        appointmentDate: '',
      });
    } catch (error) {
      console.error('There was an error!', error);
      const errorMsg = error.response?.data?.errors || error.message || 'There was an error submitting the form';
      console.log('Error details:', error.response?.data); // Log detailed error response
      setErrorMessage(errorMsg);
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-4">
      <div className="form-container">
        <h1 className="text-center mb-4">Patient Details</h1>
        <form onSubmit={handleSubmit}>
          {/* Appointment Fields */}
          <div className="form-group">
            <label htmlFor="patientName">Patient Name:</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              className="form-control"
              value={formData.patientName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              className="form-control"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="height">Height (in cm):</label>
            <input
              type="number"
              id="height"
              name="height"
              className="form-control"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight (in kg):</label>
            <input
              type="number"
              id="weight"
              name="weight"
              className="form-control"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="form-control"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="appointmentDate">Appointment Date:</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              className="form-control"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Medical History Fields */}
          <div className="form-group mt-4">
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
              value={formData.medication.join(', ')}
              onChange={handleMedicationChange}
            />
          </div>
          <div className="form-group">
            <label>Medical Conditions:</label>
            {['Asthma', 'BloodPressure', 'Cancer', 'Cholesterol', 'Diabetes', 'HeartDisease'].map(cond => (
              <div className="form-check" key={cond}>
                <input
                  type="checkbox"
                  id={`has${cond}`}
                  name={`has${cond}`}
                  className="form-check-input"
                  checked={formData[`has${cond}`]}
                  onChange={handleChange}
                />
                <label htmlFor={`has${cond}`} className="form-check-label">{`Has ${cond.replace(/([A-Z])/g, ' $1')}`}</label>
              </div>
            ))}
          </div>
          <div className="form-group mt-4">
            <h4>Healthy and Unhealthy Habits</h4>
            <div className="form-group">
              <label>Exercise Frequency:</label>
              {['Never', '1-2 days', '3-4 days', '5+ days'].map(frequency => (
                <div className="form-check" key={frequency}>
                  <input
                    type="radio"
                    id={frequency}
                    name="exerciseFrequency"
                    value={frequency}
                    className="form-check-input"
                    checked={formData.exerciseFrequency === frequency}
                    onChange={handleChange}
                    required 
                  />
                  <label htmlFor={frequency} className="form-check-label">{frequency}</label>
                </div>
              ))}
            </div>
            <div className="form-group mt-4">
              <label>Alcohol Consumption:</label>
              {['None', 'Occasional', 'Frequent'].map(consumption => (
                <div className="form-check" key={consumption}>
                  <input
                    type="radio"
                    id={consumption}
                    name="alcoholConsumption"
                    value={consumption}
                    className="form-check-input"
                    checked={formData.alcoholConsumption === consumption}
                    onChange={handleChange}
                  />
                  <label htmlFor={consumption} className="form-check-label">{consumption}</label>
                </div>
              ))}
            </div>
            <div className="form-group mt-4">
              <label>Smoking:</label>
              {['No', '0-1 pack per day', '1-2 packs per day', '2+ packs per day'].map(smoke => (
                <div className="form-check" key={smoke}>
                  <input
                    type="radio"
                    id={smoke}
                    name="smoke"
                    value={smoke}
                    className="form-check-input"
                    checked={formData.smoke === smoke}
                    onChange={handleChange}
                  />
                  <label htmlFor={smoke} className="form-check-label">{smoke}</label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>

        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default CombinedForm;
