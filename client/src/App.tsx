import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';

import Header from './components/Header';
import Researchers from './containers/Researchers';
import Researcher from './components/Researcher';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './components/NotFound';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Main.css';

export default function App() {
  const [user, setUser] = useState();
  const { userLoggedInDetails } = useContext(
    AuthContext
  ) as unknown as AuthContextType;

  // @ts-expect-error
  const localStorageUser = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Router>
        <Header />

        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={localStorageUser ? <Researchers /> : <Login />}
          />
          <Route path=":id" element={<Researcher />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
