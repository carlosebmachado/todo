import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import Footer from '../components/Footer';


export default () => {
  const [redirectHome, setRedirectHome] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  async function signin() {
    if (!username) {
      alert('You need to enter your username.');
    }
    if (!password) {
      alert('You need to enter your password.');
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

      {redirectHome && <Redirect to="/" />}

      <Header clickNotification={() => { }} />

      <Content>
        <h1>APP LOGIN</h1>
        <p>your activities will be synchronized with your smartphone</p>
        <Validation>
          <span>Enter the username and password</span>
          <input type="text" onChange={e => setUsername(e.target.value)} value={username} />
          <input type="password" onChange={e => setPassword(e.target.value)} value={password} />
          <button onClick={signin}>Sign in</button>
        </Validation>
      </Content>

      <Footer />

    </Container>
  );
}

export const Container = styled.div`
  width: 100%;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: #F9AA33;
    font-weight: lighter;
    font-size: 1.5rem;
  }
  
  p {
    color: #344955;
  }
`

export const Validation = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;

  span {
    text-transform: uppercase;
    font-weight: bold;
    color: #344955;
  }

  input {
    font-size: 1rem;
    padding: 10px;
    text-align: center;
    border: none;
    border-radius: 5px;
    border: 1px solid #F9AA33;
    margin-top: 10px;
    
    &:focus {
      outline: none;
    }

    &:last-of-type {
      margin-bottom: 20px;
    }
  }

  button {
    font-weight: bold;
    background-color: #F9AA33;
    color: white;
    font-size: 1.2rem;
    padding: 10px;
    border-radius: 30px;
    cursor: pointer;
    margin-top: 10px;
    border: none;
    text-transform: uppercase;

    &:hover {
      background-color: #344955;
    }
  }
`
