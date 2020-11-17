import React from "react";
import { Collapse, Container, Nav, Navbar, NavbarToggler } from "reactstrap";
import { Link } from "react-router-dom";

function AppNavBar() {
  return (
    <>
      <Navbar className="sticky-top" expand="lg" color="dark" dark>
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            Daeun's Blog
          </Link>
          <NavbarToggler />
          <Collapse isOpen={true} navbar>
            <Nav className="ml-auto d-flex justify-content-around" navbar>
              {true ? (
                <h1 className="text-white">인증</h1>
              ) : (
                <h1 className="text-white">guest</h1>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavBar;
