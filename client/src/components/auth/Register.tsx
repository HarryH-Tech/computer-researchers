import React, { useContext, FormEvent, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import ErrorMessage from '../utils/ErrorMessage';
import SuccessMessage from '../utils/SuccessMessage';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import '../../styles/Register.css';

const Register = () => {
  const [formDetails, setFormDetails] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    show: false,
    number: false,
    length: false,
    capital: false,
  });

  const {
    userErrorMessage,
    userSuccessMessage,
    userLoading,
    userRegisterDetails,
    setUserRegisterDetails,
    setUserLoading,
    setUserErrorMessage,
    attemptRegister,
    // @ts-expect-error
  } = useContext(AuthContext) as unknown as AuthContextType;

  const { username, email, password, confirmPassword } = formDetails;
  const { show, number, length, capital } = passwordRequirements;

  /*
   Remove error message on page load so if user 
   is shown error message then clicks on 
   Login, the error message is removed 
   when they navigate back to Register 
  */
  useEffect(() => {
    setUserErrorMessage('');
  }, []);

  const handleRegister = (e: any) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setUserErrorMessage(
        'Please ensure all fields are filled in before signing up.'
      );
    } else if (password !== confirmPassword) {
      setUserErrorMessage('Passwords do not match.');
    } else {
      setUserErrorMessage('');
      attemptRegister(formDetails);
      console.log('register');
    }
  };

  // Helper functions to see if password contains number + capital letter
  function containsNumber(string: string) {
    return /\d/.test(string);
  }

  function containsCapitalLetter(string: string) {
    return /[A-Z]/.test(string);
  }

  const handleFormInput = (e: FormEvent<HTMLInputElement>): void => {
    console.log('input');
    setFormDetails({
      ...formDetails,
      [e.currentTarget.id]: e.currentTarget.value,
    });

    if (e.currentTarget.id === 'password') {
      setPasswordRequirements({
        show: true,
        number: containsNumber(e.currentTarget.value),
        length: e.currentTarget.value.length > 6,
        capital: containsCapitalLetter(e.currentTarget.value),
      });
    }
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
        <Form onSubmit={(e) => handleRegister(e)}>
          <h1>Register</h1>
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
                type="text"
                id="username"
                placeholder="Username..."
                className="input"
                name="username"
              />
            </div>

            {show && (
              <div>
                <p>Password must:</p>
                <ul>
                  <li className={`list-item ${number ? 'green' : 'red'}`}>
                    Contain A Number
                  </li>
                  <li className={`list-item ${capital ? 'green' : 'red'}`}>
                    Contain At Least 1 Capital Letter
                  </li>
                  <li className={`list-item ${length ? 'green' : 'red'}`}>
                    Be longer than 6 letters
                  </li>
                </ul>
              </div>
            )}
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

            <div className="input-container">
              <input
                onChange={handleFormInput}
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password..."
                className="input"
                name="confirmPassword"
              />
            </div>
          </div>
          {userSuccessMessage && <SuccessMessage />}
          {userErrorMessage && <ErrorMessage />}
          {userLoading && 'LOADING'}

          <Button type="submit" disabled={false} size="lg">
            Register
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default Register;
