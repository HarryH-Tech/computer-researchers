import React, { useContext, FormEvent, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import ErrorMessage from '../utils/ErrorMessage';
import Loading from '../utils/Loading';

const Login = () => {
  const {
    attemptLogin,
    userLoginDetails,
    userLoading,
    setUserLoginDetails,
    userErrorMessage,
    setUserErrorMessage,
  } = useContext(AuthContext) as unknown as AuthContextType;

  /*
   Remove error message on page load so if user 
   is shown error message then clicks on 
   Register, the error message is removed 
   when they navigate back to Login 
  */
  useEffect(() => {
    setUserErrorMessage('');
  }, []);

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (!userLoginDetails.email || !userLoginDetails.password) {
      setUserErrorMessage('Please enter an email and password.');
    } else {
      attemptLogin(userLoginDetails);
    }
  };

  const handleFormInput = (e: FormEvent<HTMLInputElement>): void => {
    setUserLoginDetails({
      ...userLoginDetails,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <>
      <Card
        style={{
          width: '75%',
          margin: '3rem auto',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <Form onSubmit={(e) => handleLogin(e)}>
          <h1>Login</h1>
          <div className="container">
            <div className="input-container">
              <input
                onChange={handleFormInput}
                type="email"
                id="email"
                placeholder="Email..."
                className="input"
                name="email"
              />
            </div>

            <div className="input-container">
              <input
                onChange={handleFormInput}
                type="password"
                id="password"
                placeholder="Password..."
                className="input"
                name="name"
              />
            </div>
          </div>
          {userErrorMessage && <ErrorMessage />}
          {userLoading && <Loading />}
          <br />
          <Button type="submit" disabled={false} size="lg">
            Login
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default Login;
