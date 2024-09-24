import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, fetchHeartRateData } from './fitbitAPI';

const FitbitCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash; // Get the hash from the URL
    const accessToken = getAccessToken(hash);

    if (accessToken) {
      localStorage.setItem('fitbitAccessToken', accessToken);
      console.log('Access token stored:', accessToken);

      fetchHeartRateData(accessToken)
        .then(data => {
          console.log('Heart Rate Data:', data);
          // Handle the heart rate data as needed
        })
        .catch(err => console.error('Error fetching heart rate data:', err));

      navigate('/root'); // Redirect to the main page
    } else {
      console.error('No access token found');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default FitbitCallback;
