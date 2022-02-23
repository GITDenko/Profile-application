import "./index.css";
import "semantic-ui-css/semantic.min.css";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./views/Home/Home";
import PrintView from "./views/Print/PrintView";
import Profile from "./views/Profile/Profile";
import Roles from "./views/AdminTags/Roles";
import Skills from "./views/AdminTags/Skills";
// Authentication
import "bootstrap/dist/css/bootstrap.min.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./components/authentication/authConfig";
import { AuthenticatedTemplate } from "@azure/msal-react";

// TODO set routes depending on admin or user
const msalInstance = new PublicClientApplication(msalConfig);
ReactDOM.render(
  <MsalProvider instance={msalInstance}>
    <BrowserRouter>
      <NavBar />
      <AuthenticatedTemplate>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/*" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/roles" element={<Roles />} />
          <Route exact path="/skills" element={<Skills />} />
          <Route exact path="/print" element={<PrintView />} />
        </Routes>
      </AuthenticatedTemplate>
    </BrowserRouter>
  </MsalProvider>,
  document.getElementById("root")
);

reportWebVitals();
