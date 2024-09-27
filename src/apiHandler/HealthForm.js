import React, { useState } from 'react';
//import { analyzeHealthMetrics } from '../api';
import { analyzeHealthMetrics } from './CheckupApi';
const HealthForm = () => {
    const [file, setFile] = useState(null);
    const [metrics, setMetrics] = useState('*'); // Default to all metrics
    const [sex, setSex] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file); // Append the file
        formData.append('metrics', metrics);
        if (sex) formData.append('sex', sex);
        if (age) formData.append('age', age);
        if (height) formData.append('height', height);

        try {
            const data = await analyzeHealthMetrics(formData);
            setResponse(data);
            setError(null);
        } catch (err) {
            setError('Failed to analyze health metrics. Please try again.');
            setResponse(null);
        }
    };

    return (
        <div>
            <h1>Health Metrics Analyzer</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Upload File:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <div>
                    <label>Metrics (e.g., HR, BP, RI, *):</label>
                    <input
                        type="text"
                        value={metrics}
                        onChange={(e) => setMetrics(e.target.value)}
                    />
                </div>
                <div>
                    <label>Sex:</label>
                    <select value={sex} onChange={(e) => setSex(e.target.value)}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div>
                    <label>Height (m):</label>
                    <input
                        type="number"
                        step="0.01"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>
                <button type="submit">Analyze</button>
            </form>
            {response && (
                <div>
                    <h2>Results:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default HealthForm;
