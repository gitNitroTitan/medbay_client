/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>MEDBAY</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href={`/physicians/user/${user.id}`}>
              <Nav.Link>Physicians</Nav.Link>
            </Link>
            <Link passHref href={`/records/user/${user.id}`}>
              <Nav.Link>Medications</Nav.Link>
            </Link>
            <Link passHref href="/user_medication">
              <Nav.Link>List Meds By User</Nav.Link>
            </Link>
            <NavDropdown title="Create" id="basic-nav-dropdown">
              <Link passHref href="/physicians/new">
                <NavDropdown.Item href="#action/3.1">Create Physician</NavDropdown.Item>
              </Link>
              <Link passHref href="/records/new">
                <NavDropdown.Item href="#action/3.2">
                  Create Med Record
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
            <img src={user.image_url} className="round-circle" alt="user profile pic" />
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
