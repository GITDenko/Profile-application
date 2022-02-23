import { useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';

function handleLogin(instance) {
  instance.loginPopup(loginRequest).catch((e) => {
    console.error(e);
  });
}

export const SignInButton = () => {
  const { instance } = useMsal();

  return (
    <div className="NbText NbAccount" onClick={() => handleLogin(instance)}>
      Login
    </div>
  );
};
