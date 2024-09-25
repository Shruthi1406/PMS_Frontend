// src/components/FitbitCallback.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAccessToken,
  fetchHeartRateData,
  fetchBreathingRateData,
  fetchSleepData,
  fetchSpO2Data,
  fetchTemperatureData,
  fetchUserData,
} from './fitbitAPI';

const FitbitCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash; // Get the hash from the URL
    const accessToken = getAccessToken(hash);

    if (accessToken) {
      localStorage.setItem('fitbitAccessToken', accessToken);
      console.log('Access token stored:', accessToken);

      // Fetch all relevant data
      Promise.all([
        fetchHeartRateData(accessToken),
        fetchBreathingRateData(accessToken),
        fetchSleepData(accessToken),
        fetchSpO2Data(accessToken),
        fetchTemperatureData(accessToken),
        fetchUserData(accessToken),
      ])
        .then(([heartRateData, breathingRateData, sleepData, spO2Data, temperatureData, userData, devicesData]) => {
          // You can save all data to context or state management if needed
          console.log('Heart Rate Data:', heartRateData);
          console.log('Breathing Rate Data:', breathingRateData);
          console.log('Sleep Data:', sleepData);
          console.log('SpO2 Data:', spO2Data);
          console.log('Temperature Data:', temperatureData);
          console.log('User Data:', userData);
          console.log('Devices Data:', devicesData);

          // Optionally navigate to the main page after data fetching
          navigate('/vital-signs'); // Redirect to vital signs display
        })
        .catch(err => console.error('Error fetching data:', err));
    } else {
      console.error('No access token found');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default FitbitCallback;
