import { useMsal } from '@azure/msal-react';

function handleLogout(instance) {
  instance.logoutPopup().catch((e) => {
    console.error(e);
  });
}

export const SignOutButton = () => {
  const { instance } = useMsal();

  return (
    <div className="NbText NbAccount" onClick={() => handleLogout(instance)}>
      Logout
    </div>
  );
};
