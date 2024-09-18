import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Medicalhistoryform.css';
import { useLocation } from 'react-router-dom';

const PatientForm = () => {
  const location=useLocation();
  const patientInfo = localStorage.getItem('patientInfo')!=null?JSON.parse(localStorage.getItem('patientInfo')):null;
  const doctor=location.state!=null?location.state.doctor:null;
  const hopsital=location.state!=null?location.state.hospital:null;
  const [formData, setFormData] = useState({
    //recordedDate: '',
    reason: '',
    medication: [],
    hasAsthma: false,
    hasBloodPressure: false,
    hasCancer: false,
    hasCholesterol: false,
    hasDiabetes: false,
    hasHeartDisease: false,
    exerciseFrequency: '',
    alcoholConsumption: '',
    smoke: '',
    patientId: patientInfo.patientId,
    doctorId: doctor.doctorId,
    hospitalName: hopsital.hospitalName,
    firstName:'',
    lastName:'',
    gender: '',
    height: '',
    weight: '',
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

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validation of form data before sending
      if (!formData.patientId || !formData.doctorId || !formData.hospitalName) {
        throw new Error('Patient ID, Doctor ID, and Hospital Name are required.');
      }

      // Prepare data for the first API call
      const medicalHistoryData = {
        patientId: formData.patientId,
        reason: formData.reason,
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
      const medicalHistoryResponse = await axios.post('https://localhost:44376/api/History/AddMedicalhistory', medicalHistoryData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Medical History Response:', medicalHistoryResponse);

      if (!medicalHistoryResponse.data.historyId) {
        throw new Error('Medical History ID not found in response');
      }


      // Prepare data for the second API call
      const appointmentData = {
        patientId: formData.patientId,
        doctorId: formData.doctorId,
        hospitalName: formData.hospitalName,
        patientName: formData.firstName+" "+formData.lastName,
        gender: formData.gender,
        height: parseInt(formData.height, 10),
        weight: parseInt(formData.weight, 10),
        dob: formData.dob,
        email: formData.email,
        appointmentDate: formData.appointmentDate,
        statusId: -1,
        reason: formData.reason,
      };

      // Second API call: Schedule appointment
      const appointmentResponse = await axios.post('https://localhost:44376/api/Appointment/schedule', appointmentData);
      console.log('Appointment Response:', appointmentResponse);

      setSuccessMessage('Form submitted successfully');
      setErrorMessage('');
      
      // Clear form fields
      setFormData({
        reason: '',
        medication: [],
        hasAsthma: false,
        hasBloodPressure: false,
        hasCancer: false,
        hasCholesterol: false,
        hasDiabetes: false,
        hasHeartDisease: false,
        exerciseFrequency: '',
        alcoholConsumption: '',
        smoke: '', 
        patientId: '',
        doctorId: '',
        hospitalName: '',
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
      console.log('Error details:', error.response?.data);
      setErrorMessage(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg);
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-4">
      <div className="form-container">
        <h1 className="text-center mb-4">Patient Details</h1>
        <form onSubmit={handleSubmit}>
          {/* Appointment Fields */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
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
            <div className="col-md-6">
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
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
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
            <div className="col-md-6">
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
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
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
            <div className="col-md-6">
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
          </div>

          {/* Medical History Fields */}
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="reason">Reason for Visit:</label>
              <textarea
                id="reason"
                name="reason"
                className="form-control"
                value={formData.reason}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="medication">Medication (comma-separated):</label>
              <input
                type="text"
                id="medication"
                name="medication"
                className="form-control"
                value={formData.medication.join(', ')}
                onChange={handleMedicationChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
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
                <label htmlFor="hasAsthma" className="form-check-label">Asthma</label>
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
                <label htmlFor="hasBloodPressure" className="form-check-label">High Blood Pressure</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="hasCancer"
                  name="hasCancer"
                  className="form-check-input"
                  checked={formData.hasCancer}
                  onChange={handleChange}
                />
                <label htmlFor="hasCancer" className="form-check-label">Cancer</label>
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
                <label htmlFor="hasCholesterol" className="form-check-label">High Cholesterol</label>
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
                <label htmlFor="hasDiabetes" className="form-check-label">Diabetes</label>
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
                <label htmlFor="hasHeartDisease" className="form-check-label">Heart Disease</label>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="exerciseFrequency">Exercise Frequency:</label>
              <select
                id="exerciseFrequency"
                name="exerciseFrequency"
                className="form-control"
                value={formData.exerciseFrequency}
                onChange={handleChange}
              >
                <option value="">Select Frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Never">Never</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="alcoholConsumption">Alcohol Consumption:</label>
              <select
                id="alcoholConsumption"
                name="alcoholConsumption"
                className="form-control"
                value={formData.alcoholConsumption}
                onChange={handleChange}
              >
                <option value="">Select Consumption</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Never">Never</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Do you smoke?</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="smokeYes"
                  name="smoke"
                  value="Yes"
                  className="form-check-input"
                  checked={formData.smoke === 'Yes'}
                  onChange={handleRadioChange}
                />
                <label htmlFor="smokeYes" className="form-check-label">Yes</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="smokeNo"
                  name="smoke"
                  value="No"
                  className="form-check-input"
                  checked={formData.smoke === 'No'}
                  onChange={handleRadioChange}
                />
                <label htmlFor="smokeNo" className="form-check-label">No</label>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
