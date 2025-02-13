import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../apiHandler/api';

const ReceptionistLogin = ({ onClose }) => {
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
        const response = await api.post('/Receptionist/Login', loginData);
        console.log('User logged in successfully:', response.data);
        if (response.data && response.data.isLogged) {
          localStorage.setItem('authToken', response.data.token);
          navigate('/receptionist');
          setTimeout(()=>{
            localStorage.removeItem('authToken');
          },60000);
          onClose();  
        }
      } catch (error) {
        setApiError(error.response ? error.response.data.message || 'An error occurred' : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
        {apiError && <Alert variant="danger">{apiError}</Alert>}
        
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

        <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
    </Container>
  );
};

export default ReceptionistLogin;
