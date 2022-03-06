import React, { FC, useState, createContext, ReactNode } from 'react';
import axios from 'axios';

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<ReactNode> = ({ children }) => {
  const [userRegisterDetails, setUserRegisterDetails] = useState<IUserRegister>(
    {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  );

  const [userLoginDetails, setUserLoginDetails] = useState<IUserLogin>({
    email: '',
    password: '',
  });

  const [userLoggedInDetails, setUserLoggedInDetails] = useState({
    username: '',
    token: '',
    role: 0,
  });
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [userErrorMessage, setUserErrorMessage] = useState<string>('');
  const [userSuccessMessage, setUserSuccessMessage] = useState<string>('');

  const attemptLogin = async (loginUserDetails: IUserLogin) => {
    setUserLoading(true);
    console.log(userLoginDetails);
    const response = await axios.post(
      process.env.REACT_APP_AUTH_URL + '/login',
      {
        loginUserDetails,
      }
    );
    setUserLoading(false);
    if (response.data.error) {
      setUserErrorMessage(response.data.error);
    } else {
      console.log(response.data);
      const localData = {
        token: response.data.token,
        role: response.data.user.role,
        username: response.data.user.username,
      };
      localStorage.setItem('user', JSON.stringify(localData));

      setUserLoginDetails({
        email: '',
        password: '',
      });
      setUserErrorMessage('');

      setUserLoggedInDetails({
        token: response.data.token,
        username: response.data.user.username,
        role: response.data.user.role,
      });
    }
  };

  const attemptRegister = async (formDetails: any) => {
    setUserLoading(true);
    const response = await axios.post(
      process.env.REACT_APP_AUTH_URL + '/register',
      {
        formDetails,
      }
    );

    // If Register Attempt Was Unsuccessful Show Why
    if (!response.data.success) {
      setUserLoading(false);
      if (response.data.errorType === 'duplicate email') {
        setUserErrorMessage(response.data.message);
      } else {
        setUserErrorMessage(response.data.message);
      }
    }

    // If Register Attempt Was Successful
    else if (response.data.success) {
      setUserLoading(false);
      setUserSuccessMessage(response.data.message);
    }
  };

  //LOGOUT
  const logout = () => {
    axios.post(process.env.REACT_APP_AUTH_URL + '/logout');
    setUserLoggedInDetails({
      username: '',
      token: '',
      role: 0,
    });
    localStorage.removeItem('user');
    console.log('LOGOUT');
  };

  return (
    <AuthContext.Provider
      value={{
        userRegisterDetails,
        userLoginDetails,
        userLoggedInDetails,
        userErrorMessage,
        userLoading,
        userSuccessMessage,
        setUserRegisterDetails,
        setUserLoginDetails,
        setUserLoggedInDetails,
        attemptLogin,
        attemptRegister,
        setUserErrorMessage,
        setUserLoading,
        setUserSuccessMessage,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
