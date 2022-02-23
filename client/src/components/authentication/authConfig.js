export const msalConfig = {
  auth: {
    clientId: "b66b1758-5e8e-48c6-b786-34de0792f86e",
    authority:
      "https://login.microsoftonline.com/7f60e2bc-b303-477e-9259-272cb12aec3a",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};
// Scopes
export const loginRequest = {
  scopes: [
    "api://f0f06431-4b42-4a5d-b7c5-a80c2566c29b/Employees.Read.All.Profiles",
  ],
};
