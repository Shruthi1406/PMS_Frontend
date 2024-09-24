
import axios from 'axios';

const CLIENT_ID = '23PLDK'; // Replace with your Fitbit Client ID
const CLIENT_SECRET = '515aa2a4b26bcd091f2895c171e83355'; // Replace with your Fitbit Client Secret
const REDIRECT_URI = 'http://localhost:3000/fitbit-callback';


export const getAuthorizationUrl = () => {
  return `https://api.fitbit.com/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=heartrate&expires_in=31536000`;
};

export const getAccessToken = (hash) => {
    if (!hash) return null; // Check if hash exists
    const params = new URLSearchParams(hash.replace('#', '')); // Remove the '#' and parse
    return params.get('access_token');
  };
  

export const fetchHeartRateData = async (accessToken) => {
  const response = await axios.get('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
