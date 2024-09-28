// src/api.js
import axios from 'axios';

const API_URL = 'https://checkup-api.p.rapidapi.com/analysis';
const API_KEY = '35e98b4cf0msh3cbb8bb9f9dd849p112f65jsn3243f806b4d3'; // Replace with your actual API key

export const analyzeHealthMetrics = async (data) => {
    try {
        const response = await axios.post(API_URL, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'checkup-api.p.rapidapi.com'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error analyzing health metrics:", error);
        throw error;
    }
};
