// src/components/VitalSignsDisplay.js

import React, { useEffect, useState } from 'react';
import {
  fetchHeartRateData,
  fetchBreathingRateData,
  fetchSleepData,
  fetchSpO2Data,
  fetchTemperatureData,
  fetchUserData,
} from './fitbitAPI';

const VitalSignsDisplay = () => {
  const [data, setData] = useState({
    heartRate: null,
    breathingRate: null,
    sleep: null,
    spO2: null,
    temperature: null,
    user: null,
    devices: null,
  });
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem('fitbitAccessToken');

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          const heartRate = await fetchHeartRateData(accessToken);
          const breathingRate = await fetchBreathingRateData(accessToken);
          const sleep = await fetchSleepData(accessToken);
          const spO2 = await fetchSpO2Data(accessToken);
          const temperature = await fetchTemperatureData(accessToken);
          const user = await fetchUserData(accessToken);

          setData({
            heartRate,
            breathingRate,
            sleep,
            spO2,
            temperature,
            user,
          });
        } catch (err) {
          setError(err.message || 'Error fetching data');
        }
      } else {
        setError('Access token is missing');
      }
    };

    fetchData();
  }, [accessToken]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Vital Signs Data</h2>

      {/* <h3>Heart Rate Data</h3>
      <pre>{JSON.stringify(data.heartRate, null, 2)}</pre> */}

      <h3>Breathing Rate Data</h3>
      <pre>{JSON.stringify(data.breathingRate, null, 2)}</pre>

      <h3>Sleep Data</h3>
      <pre>{JSON.stringify(data.sleep, null, 2)}</pre>

      <h3>SpO2 Data</h3>
      <pre>{JSON.stringify(data.spO2, null, 2)}</pre>

      <h3>Temperature Data</h3>
      <pre>{JSON.stringify(data.temperature, null, 2)}</pre>

      <h3>User Data</h3>
      <pre>{JSON.stringify(data.user, null, 2)}</pre>

    </div>
  );
};

export default VitalSignsDisplay;
