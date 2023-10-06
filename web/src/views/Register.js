import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import api from '../services/api';
import SessionStore from '../utils/SessionStore';

import Header from '../components/Header';
import Footer from '../components/Footer';
import constants from '../constants';


export default function Register() {
  const [redirectHome, setRedirectHome] = useState(false);
  const [name, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  async function onRegisterClick() {
    if (!name) {
      alert('You need to enter your full name.');
      return;
    }
    if (!username) {
      alert('You need to enter your username.');
      return;
    }
    if (!password) {
      alert('You need to enter your password.');
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        name,
        username,
        password
      });
      await SessionStore.signin({
        userId: response.data.userId,
        username: username,
        name: name,
        token: response.data.token
      });
    } catch (error) {
      alert('Error on register.');
      return;
    }

    setIsConnected(true);
  }

  useEffect(() => {
    if (isConnected) {
      setRedirectHome(true);
    }

  }, [isConnected]);

  return (
    <Container>

      {redirectHome && <Redirect to="/login" />}

      <Header clickNotification={() => { }} />

      <Content>
        <h1>REGISTER</h1>
        <UserDataWrapper>
          <small>Enter register data</small>
          <input placeholder='full name...' type="text" onChange={e => setFullName(e.target.value)} value={name} />
          <input placeholder='username...' type="text" onChange={e => setUsername(e.target.value)} value={username} />
          <input placeholder='password...' type="password" onChange={e => setPassword(e.target.value)} value={password} />
          <a href="/login">Already have an account?</a>
          <button onClick={onRegisterClick}>REGISTER</button>
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
    }

    &:last-of-type {
      margin-bottom: 20px;
    }
  }

  a {
    color: ${constants.colors.primary};
    text-decoration: none;
    margin-bottom: 20px;
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
