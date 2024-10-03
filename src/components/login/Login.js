import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../apiHandler/api';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const Login = ({ onClose }) => {
    const [loginData, setLoginData] = useState({
        Email: '',
        Password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [isUserValid, setIsUserValid] = useState(true);
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
                const response = await api.post('/Auth/login', loginData);
                console.log('receptionist logged in successfully:', response.data);
                if (response.data && response.data.isSuccess) {
                    setIsUserValid(true);
                    if (response.data.user.role === "PATIENT") {
                        console.log('Patient logged in successfully:', response.data);
                        localStorage.setItem('patientInfo', JSON.stringify(response.data.user));
                        localStorage.setItem('authToken', response.data.user.token);
                        navigate('/root');
                        setTimeout(() => {
                            localStorage.removeItem('authToken');
                            localStorage.removeItem('patientInfo');
                        }, 1800000);
                        onClose();
                    } else if (response.data.user.role === "RECEPTIONIST") {
                        console.log('receptionist logged in successfully:', response.data);
                        localStorage.setItem('receptionistInfo', JSON.stringify(response.data.user));
                        localStorage.setItem('recAuthToken', response.data.user.token);
                        window.open('/receptionist', '_blank');
                        setTimeout(() => {
                            localStorage.removeItem('recAuthToken');
                            localStorage.removeItem('receptionistInfo');
                            alert("Session timeout, Please login again.");
                            navigate("/root/login");
                        }, 1800000);
                        onClose();
                    } else {
                        console.log(response.data.error);
                        navigate("/root");
                    }
                }
            } catch (error) {
                setApiError(error.response ? error.response.data.message || 'An error occurred' : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="login-form" style={{ width: '50%' }}>
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
                    {apiError && <div className="alert alert-danger">{apiError}</div>}
                    {!isUserValid && <div className="alert alert-danger">Invalid Username or Password</div>}
                    
                    <div className="form-group">
                        <label className="custom-label" htmlFor="formEmail">Email</label>
                        <input
                            type="email"
                            name="Email"
                            className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
                            placeholder="Enter your email"
                            value={loginData.Email}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                            {errors.Email}
                        </div>
                    </div>

                    <div className="form-group mt-3">
                        <label className="custom-label" htmlFor="formPassword">Password</label>
                        <input
                            type="password"
                            name="Password"
                            className={`form-control ${errors.Password ? 'is-invalid' : ''}`}
                            placeholder="Enter your password"
                            value={loginData.Password}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                            {errors.Password}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    
                    <div>
                        <Link to="/root/PasswordReset">Forgot Password?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
