import { Nav, Navbar, Container } from "react-bootstrap";
import "./NavBar.css";
import { useIsAuthenticated, AuthenticatedTemplate } from "@azure/msal-react";
import { SignInButton } from "../authentication/SignInButton";
import { SignOutButton } from "../authentication/SignOutButton";

const NavBar = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div>
      <Navbar className="Navbar" expand="lg">
        <Container>
          <Navbar.Brand href="/Home">
            <img
              className="Logo"
              src={require("../../images/logo.png").default}
              alt=""
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <AuthenticatedTemplate>
                <Nav.Link href="/Home">
                  <p className="NbText">Library</p>
                </Nav.Link>
                <Nav.Link href="/Profile">
                  <p className="NbText">My Profile</p>
                </Nav.Link>
                <Nav.Link href="/Roles">
                  <p className="NbText">Roles</p>
                </Nav.Link>
                <Nav.Link href="/Skills">
                  <p className="NbText">Skills</p>
                </Nav.Link>
              </AuthenticatedTemplate>
              <Nav.Item>
                {isAuthenticated ? <SignOutButton /> : <SignInButton />}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
