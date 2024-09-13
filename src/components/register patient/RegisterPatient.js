import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../apiHandler/api';
const RegisterPatient = () => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    PatientEmail: '',
    ContactNumber: '',
    Password: '',
    DeviceName: '',
    Age: '',
    Gender: '',
  });

  const [errors, setErrors] = useState({});
  
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.FirstName) newErrors.FirstName = 'First Name is required';
    if (!formData.LastName) newErrors.LastName = 'Last Name is required';
    if (!formData.PatientEmail) {
      newErrors.PatientEmail = 'Email is required';
    } else if (!emailRegex.test(formData.PatientEmail)) {
      newErrors.PatientEmail = 'Valid email is required';
    }
    if (!formData.ContactNumber) newErrors.ContactNumber = 'Contact Number is required';
    if (!formData.Password || formData.Password.length < 6) newErrors.Password = 'Password must be at least 6 characters';
    if (!formData.DeviceName) newErrors.DeviceName = 'Device Name is required';
    if (!formData.Age || formData.Age <= 0) newErrors.Age = 'Age must be a positive number';
    if (!formData.Gender) newErrors.Gender = 'Gender is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setApiError(null);
      try {
        const response = await api.post('/Patient/RegisterPatient', formData);
        console.log('Patient registered successfully:', response.data);

      } catch (error) {
        setApiError(error.response ? error.response.data : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container className="mt-5 w-50">
      <h2 className="text-center mb-4">Register Patient</h2>
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
        {apiError && <Alert variant="danger">{apiError}</Alert>}
        
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="FirstName"
            placeholder="Enter your first name"
            value={formData.FirstName}
            onChange={handleChange}
            isInvalid={!!errors.FirstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.FirstName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formLastName" className="mt-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="LastName"
            placeholder="Enter your last name"
            value={formData.LastName}
            onChange={handleChange}
            isInvalid={!!errors.LastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.LastName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="PatientEmail"
            placeholder="Enter your email"
            value={formData.PatientEmail}
            onChange={handleChange}
            isInvalid={!!errors.PatientEmail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.PatientEmail}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formContactNumber" className="mt-3">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="text"
            name="ContactNumber"
            placeholder="Enter your contact number"
            value={formData.ContactNumber}
            onChange={handleChange}
            isInvalid={!!errors.ContactNumber}
            minLength={10}
            maxLength={10}
          />
          <Form.Control.Feedback type="invalid">
            {errors.ContactNumber}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            placeholder="Enter your password"
            value={formData.Password}
            onChange={handleChange}
            isInvalid={!!errors.Password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDeviceName" className="mt-3">
          <Form.Label>Device Name</Form.Label>
          <Form.Control
            type="text"
            name="DeviceName"
            placeholder="Enter your device name"
            value={formData.DeviceName}
            onChange={handleChange}
            isInvalid={!!errors.DeviceName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.DeviceName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formAge" className="mt-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="Age"
            placeholder="Enter your age"
            value={formData.Age}
            onChange={handleChange}
            isInvalid={!!errors.Age}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Age}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formGender" className="mt-3">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            isInvalid={!!errors.Gender}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.Gender}
          </Form.Control.Feedback>
        </Form.Group>

        <div className='d-flex justify-content-between'>
          <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
          <Form.Label className='mt-3'>Already registered?<Link to="/login">Click here to login</Link></Form.Label>
        </div>
      </Form>
    </Container>
  );
};

export default RegisterPatient;
