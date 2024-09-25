import React from 'react';
import { getAuthorizationUrl } from './fitbitAPI';

const FitbitLogin = () => {
  const handleLogin = () => {
    window.location.href = getAuthorizationUrl();
  };

  return (
    <div>
      <h2>Login with Fitbit</h2>
      <button onClick={handleLogin}>Login with Fitbit</button>
    </div>
  );
};

export default FitbitLogin;
