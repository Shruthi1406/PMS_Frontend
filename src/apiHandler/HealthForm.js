import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
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
        formData.append('file', file);
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
        <Container className="mt-5">
            <h1 className="mb-4">Health Metrics Analyzer</h1>
            <Form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
                <Form.Group controlId="formFile">
                    <Form.Label className='custom-label'>Upload File:</Form.Label>
                    <Form.Control 
                        type="file" 
                        onChange={handleFileChange} 
                        required 
                    />
                </Form.Group>
                
                <Form.Group controlId="formMetrics" className="mt-3">
                    <Form.Label className='custom-label'>Metrics (e.g., HR, BP, RI, *):</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={metrics} 
                        onChange={(e) => setMetrics(e.target.value)} 
                    />
                </Form.Group>
                
                <Form.Group controlId="formSex" className="mt-3">
                    <Form.Label className='custom-label'>Sex:</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={sex} 
                        onChange={(e) => setSex(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formAge" className="mt-3">
                    <Form.Label className='custom-label'>Age:</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group controlId="formHeight" className="mt-3">
                    <Form.Label className='custom-label'>Height (m):</Form.Label>
                    <Form.Control 
                        type="number" 
                        step="0.01" 
                        value={height} 
                        onChange={(e) => setHeight(e.target.value)} 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Analyze
                </Button>
            </Form>

            {response && (
                <div className="mt-4">
                    <h2>Results:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
        </Container>
    );
};

export default HealthForm;
