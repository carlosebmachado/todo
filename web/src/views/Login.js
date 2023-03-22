import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import QrCode from 'qrcode.react';
import styled from 'styled-components';

import isConnected from '../../utils/isConnected';

import Header from '../../components/Header';
import Footer from '../../components/Footer';


export default () => {
  const [redirectHome, setRedirectHome] = useState(false);
  const [mac, setMac] = useState('');

  async function saveMac() {
    if (!mac) {
      alert('You need to enter the generated code.');
    } else {
      await localStorage.setItem('@todo/macaddress', mac);
      // setRedirectHome(true);
      window.location.reload();
    }
  }

  function handleClickNotification() {
    setRedirectHome(true);
  }

  useEffect(() => {
    if (isConnected) {
      setRedirectHome(true);
    }

  }, [isConnected]);

  return (
    <Container>

      {redirectHome && <Redirect to="/" />}

      <Header clickNotification={handleClickNotification} />

      <Content>
        <h1>CAPTURE THE QR CODE THROUGH THE APP</h1>
        <p>your activities will be synchronized with your smartphone</p>
        <QRCodeArea>
          <QrCode value="getmacaddress" size={350} />
        </QRCodeArea>
        <Validation>
          <span>Enter the code generated on your cell phone</span>
          <input type="text" onChange={e => setMac(e.target.value)} value={mac} />
          <button onClick={saveMac}>sync</button>
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

export const QRCodeArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
    
    &:focus {
      outline: none;
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
