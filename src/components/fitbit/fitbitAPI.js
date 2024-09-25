// src/fitbitAPI.js

import axios from 'axios';

const CLIENT_ID = '23PLDK'; // Replace with your Fitbit Client ID
const CLIENT_SECRET = '515aa2a4b26bcd091f2895c171e83355'; // Replace with your Fitbit Client Secret
const REDIRECT_URI = 'http://localhost:3000/fitbit-callback';

export const getAuthorizationUrl = () => {
  return `https://api.fitbit.com/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=heartrate sleep profile oxygen_saturation respiratory_rate temperature weight&expires_in=31536000`;
};

export const getAccessToken = (hash) => {
  if (!hash) return null;
  const params = new URLSearchParams(hash.replace('#', ''));
  return params.get('access_token');
};

// Helper function to get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
};

export const fetchHeartRateData = async (accessToken) => {
  const response = await axios.get(`https://api.fitbit.com/1/user/-/activities/heart/date/${getCurrentDate()}.json`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const fetchBreathingRateData = async (accessToken) => {
  const response = await axios.get(`https://api.fitbit.com/1/user/-/br/date/${getCurrentDate()}.json`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const fetchSleepData = async (accessToken) => {
  const response = await axios.get(`https://api.fitbit.com/1/user/-/sleep/date/${getCurrentDate()}.json`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const fetchSpO2Data = async (accessToken) => {
  const response = await axios.get(`https://api.fitbit.com/1/user/-/spo2/date/today.json`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const fetchTemperatureData = async (accessToken) => {
  const response = await axios.get(`https://api.fitbit.com/1/user/-/temp/core/date/${getCurrentDate()}.json`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const fetchUserData = async (accessToken) => {
  const response = await axios.get('https://api.fitbit.com/1/user/-/profile.json', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};


