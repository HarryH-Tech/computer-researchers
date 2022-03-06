import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import '../styles/Header.css';

const Header = () => {
  const { userLoggedInDetails, logout } = useContext(
    AuthContext
  ) as unknown as AuthContextType;

  const handleLogout = () => {
    logout();
    console.log(userLoggedInDetails);
  };

  // @ts-expect-error
  const localStorageUser = JSON.parse(localStorage.getItem('user'));

  return (
    <Navbar bg="primary" expand="sm">
      <Container>
        <div style={{ display: 'flex', alignItems: 'space-between' }}>
          <Navbar.Brand>
            <h1 id="title">List of Computer Researchers</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
        {localStorageUser ? (
          <div style={{ display: 'flex' }}>
            <Button id="home-button">
              <Link to="/">Home</Link>
            </Button>

            <Button onClick={handleLogout} id="logout-button">
              Logout
            </Button>
          </div>
        ) : (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {' '}
              <Link to="/register" className="link">
                Register
              </Link>{' '}
              <Link to="/" className="link">
                Login
              </Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
