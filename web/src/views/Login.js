import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import api from '../services/api';
import SessionStore from '../utils/SessionStore';
import constants from '../constants';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import ErrorMessage, { errorMessageTimeout } from '../components/ErrorMessage';


export default function Login() {
  const [isBusy, setIsBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectHome, setRedirectHome] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  async function onSigninClick() {
    if (!username) {
      setErrorMessage('You need to enter your username.');
      setTimeout(() => {
        setErrorMessage('');
      }, errorMessageTimeout);
      return;
    }
    if (!password) {
      setErrorMessage('You need to enter your password.');
      setTimeout(() => {
        setErrorMessage('');
      }, errorMessageTimeout);
      return;
    }

    setIsBusy(true);

    try {
      const response = await api('').post('/auth/login', {
        username,
        password
      });
      await SessionStore.signin({
        userId: response.data.userId,
        username: username,
        name: response.data.name,
        token: response.data.token
      });
      setIsConnected(true);
    } catch (error) {
      setErrorMessage('Wrong username or password.');
      setTimeout(() => {
        setErrorMessage('');
      }, errorMessageTimeout);
      return;
    }

    setIsBusy(false);
  }

  useEffect(() => {
    if (isConnected) {
      setRedirectHome(true);
    }

    if (!isConnected) {
      SessionStore.getData()
        .then(response => {
          if (response.token) {
            setRedirectHome(true);
          }
        });
    }

  }, [isConnected]);

  return (
    <Container>
      <Loading show={isBusy} opacity={.75} />

      {redirectHome && <Redirect to="/home" />}

      <Header clickNotification={() => { }} />

      <Content>
        <h1>LOGIN</h1>
        <UserDataWrapper>
          <small>Enter login data</small>
          <input placeholder='username...' type="text" onChange={e => setUsername(e.target.value)} value={username} />
          <input placeholder='password...' type="password" onChange={e => setPassword(e.target.value)} value={password} />
          {errorMessage && <ErrorMessage error={errorMessage} />}
          <button onClick={onSigninClick}>Sign in</button>
          <a href="/register">Don't have an account?</a>
        </UserDataWrapper>
      </Content>

      <Footer />

    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-top: 20%;
    margin-bottom: 30px;
    color: ${constants.colors.primary};
    font-weight: lighter;
    font-size: 1.8rem;
  }
`;

export const UserDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  small {
    text-transform: uppercase;
    font-weight: bold;
    color: ${constants.colors.primary};
  }

  input {
    margin-top: 10px;
    font-size: 1.2rem;
    padding: 10px;
    border: none;
    color: #414141;
    border-bottom: 1px solid ${constants.colors.primary};
    border-radius: 8px;
    
    &:focus {
      outline: none;
      border-bottom: 2px solid ${constants.colors.primary};
    }

    &:last-of-type {
      margin-bottom: 20px;
    }
  }

  a {
    color: ${constants.colors.primary};
    text-decoration: none;
    margin-top: 20px;
  }

  button {
    font-weight: bold;
    background-color: ${constants.colors.primary};
    color: white;
    font-size: 1.2rem;
    padding: 10px;
    border-radius: 30px;
    cursor: pointer;
    margin-top: 10px;
    border: none;
    width: 100%;
    text-transform: uppercase;

    &:hover {
      background-color: ${constants.colors.secondary};
    }
  }
`;
