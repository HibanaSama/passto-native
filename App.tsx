import React, {useEffect, useState} from 'react';
import {isLoggedIn as checkIsLoggedIn} from './utils/isLoggedIn.ts';
import LoginScreen from './pages/LoginScreen.tsx';
import PasswordScreen from './pages/PasswordScreen.tsx';

function App(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkIsLoggedIn().then(res => {
      setIsLoggedIn(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <></>;
  }

  if (!isLoggedIn) {
    return <LoginScreen setIsLoggedIn={setIsLoggedIn} />;
  }

  return <PasswordScreen />;
}

export default App;
