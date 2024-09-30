import React, { useState, useEffect } from 'react';
import '../password/password.css';

const PasswordReset = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setEmail(urlParams.get('email'));
        setToken(urlParams.get('token'));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        setLoading(true); // Set loading state
        try {
            const response = await fetch('http://localhost:3000/api/password/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token, password }),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("Password reset successful!");
                // Optionally redirect to login page
                // window.location.href = "/login";
            } else {
                setMessage(result.message || "Error resetting password.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="password-reset-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit} className="password-reset-form">
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter new password"
                        className="form-input"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm new password"
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
            {message && (
                <p className={message.includes("successful") ? 'success' : 'error'}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default PasswordReset;
