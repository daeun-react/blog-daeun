import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Container,
  Form,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import LoginModal from "./auth/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "../redux/types";
import RegisterModal from "./auth/RegisterModal";

function AppNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth, user, userRole } = useSelector((state) => state.auth);
  console.log("userRole", userRole);

  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addPostClick = () => {};

  const authLink = (
    <>
      <NavItem>
        {userRole === "MainJuin" ? (
          <Form className="col mt-2">
            <Link
              to="post"
              className="btn btn-success block text-white px-3"
              onClick={addPostClick}
            >
              Add Post
            </Link>
          </Form>
        ) : null}
      </NavItem>
      <NavItem className="d-flex justify-content-centere">
        <Form className="col mt-2">
          {user && user.name ? (
            <Link to="#">
              <Button outline color="light" className="px-3" block>
                <strong>{user ? `Welocome ${user.name}` : ""}</strong>
              </Button>
            </Link>
          ) : (
            <Button outline color="light" className="px-3" block>
              <strong>No User!</strong>
            </Button>
          )}
        </Form>
      </NavItem>
      <NavItem>
        <Form className="col">
          <Link onClick={onLogout} to="#">
            <Button outline color="light" className="mt-2 " block>
              Logout
            </Button>
          </Link>
        </Form>
      </NavItem>
    </>
  );

  const guestLink = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  );

  return (
    <>
      <Navbar className="sticky-top" expand="lg" color="dark" dark>
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            Daeun's Blog
          </Link>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto d-flex justify-content-around" navbar>
              {isAuth ? authLink : guestLink}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavBar;
