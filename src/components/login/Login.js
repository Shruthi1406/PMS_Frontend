import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    Email: '',
    Password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();  

  const validate = () => {
    const newErrors = {};

    if (!loginData.Email) newErrors.Email = 'Email is required';
    if (!loginData.Password || loginData.Password.length < 6) newErrors.Password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setApiError(null);
      try {
        const response = await axios.post('https://localhost:44376/api/Patient/PatientLogin', loginData);
        console.log('User logged in successfully:', response.data);
        navigate('/dashboard'); 
      } catch (error) {
        setApiError(error.response ? error.response.data.message || 'An error occurred' : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container className="mt-5 w-50">
      <h2 className="text-center mb-4">Login</h2>
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
        {apiError && <Alert variant="danger">{typeof apiError === 'string' ? apiError : 'An error occurred'}</Alert>}
        
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            placeholder="Enter your email"
            value={loginData.Email}
            onChange={handleChange}
            isInvalid={!!errors.Email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            placeholder="Enter your password"
            value={loginData.Password}
            onChange={handleChange}
            isInvalid={!!errors.Password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Password}
          </Form.Control.Feedback>
        </Form.Group>

        <div className='d-flex justify-content-between mt-3'>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <Form.Label>Not registered? <Link to="/register">Click here to Register</Link></Form.Label>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
