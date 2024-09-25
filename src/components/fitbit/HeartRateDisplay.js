import React, { useEffect, useState } from 'react';
import { fetchHeartRateData } from './fitbitAPI';

const HeartRateDisplay = () => {
  const [heartRateData, setHeartRateData] = useState(null);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem('fitbitAccessToken');

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          const data = await fetchHeartRateData(accessToken);
          setHeartRateData(data);
        } catch (err) {
          setError(err.message || 'Error fetching heart rate data');
        }
      } else {
        setError('Access token is missing');
      }
    };

    fetchData();
  }, [accessToken]);

  if (error) return <p>Error: {error}</p>;

  const heartRateValues = heartRateData?.['activities-heart'] || [];

  return (
    <div>
      <h2>Heart Rate Data</h2>
      {heartRateValues.length > 0 ? (
        heartRateValues.map((entry, index) => (
          <div key={index}>
            <p>Date: {entry.dateTime}</p>
            <p>Heart Rate Zones:</p>
            <ul>
              {entry.value.heartRateZones.map((zone, i) => (
                <li key={i}>
                  {zone.name}: {zone.min} - {zone.max} bpm
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No heart rate data available.</p>
      )}
    </div>
  );
};

export default HeartRateDisplay;
