import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import api from '../../apiHandler/api';
import { Navigate, useNavigate } from 'react-router-dom';

const RegisterPatient = ({ onClose }) => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    ContactNumber: '',
    Password: '',
    ConfirmPassword: '',
    Age: '',
    Gender: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate=useNavigate();
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.FirstName) newErrors.FirstName = 'First Name is required';
    if (!formData.LastName) newErrors.LastName = 'Last Name is required';
    if (!formData.Email) {
      newErrors.Email = 'Email is required';
    } else if (!emailRegex.test(formData.Email)) {
      newErrors.Email = 'Valid email is required';
    }
    if (!formData.ContactNumber) newErrors.ContactNumber = 'Contact Number is required';
    if (!formData.Password || formData.Password.length < 6) {
      newErrors.Password = 'Password must be at least 6 characters';
    }
    if (formData.Password !== formData.ConfirmPassword) {
      newErrors.ConfirmPassword = 'Passwords does not match';
    }
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
        const response = await api.post('/Auth/register/patient', formData);
        if(response.data.isSuccess)
        {
          console.log('Patient registered successfully:', response.data);
          onClose();  
          try {
            const loginData={
              Email: formData.Email,
              Password:  formData.Password
            };
            const response = await api.post('/Auth/login', loginData);
            console.log('receptionist logged in successfully:', response.data);
            if (response.data && response.data.isSuccess) {
              console.log('Patient logged in successfully:', response.data);
              localStorage.setItem('patientInfo', JSON.stringify(response.data.user)); 
              localStorage.setItem('authToken', response.data.user.token);
              navigate('/root');
              setTimeout(()=>{
                localStorage.removeItem('authToken');
                localStorage.removeItem('patientInfo');
              },1800000);
              onClose(); 
            }
            else
            {
              //setIsUserValid(false);
            }
    
          } catch (error) {
            setApiError(error.response ? error.response.data.message || 'An error occurred' : 'An error occurred');
          } finally {
            setLoading(false);
          }
        }
        
      } catch (error) 
        {
          if (error.response && typeof error.response.data === 'object') 
            {
            // Extract the relevant message to display
              const errorMessage = error.response.data.message || JSON.stringify(error.response.data);
              setApiError(errorMessage);
            } 
            else 
            {
              setApiError('An error occurred');
            } 
        }
        finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
        {apiError && <Alert variant="danger">{apiError}</Alert>}
        
        <Form.Group controlId="formFirstName">
          <Form.Label  className='custom-label'>First Name</Form.Label>
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
          <Form.Label className='custom-label'>Last Name</Form.Label>
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
          <Form.Label className='custom-label'>Email</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            placeholder="Enter your email"
            value={formData.Email}
            onChange={handleChange}
            isInvalid={!!errors.Email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formContactNumber" className="mt-3">
          <Form.Label className='custom-label'>Contact Number</Form.Label>
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
          <Form.Label className='custom-label'>Password</Form.Label>
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

        <Form.Group controlId="formConfirmPassword" className="mt-3">
          <Form.Label className='custom-label'>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="ConfirmPassword"
            placeholder="Confirm your password"
            value={formData.ConfirmPassword}
            onChange={handleChange}
            isInvalid={!!errors.ConfirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.ConfirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formAge" className="mt-3">
          <Form.Label className='custom-label'>Age</Form.Label>
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
          <Form.Label className='custom-label'>Gender</Form.Label>
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

        <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPatient;
