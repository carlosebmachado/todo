import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import QrCode from 'qrcode.react';
import * as S from './styles';

import isConnected from '../../utils/isConnected';

import Header from '../../components/Header';
import Footer from '../../components/Footer';


function Sync() {
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
    <S.Container>

      {redirectHome && <Redirect to="/" />}

      <Header clickNotification={handleClickNotification} />

      <S.Content>
        <h1>CAPTURE THE QR CODE THROUGH THE APP</h1>
        <p>your activities will be synchronized with your smartphone</p>
        <S.QRCodeArea>
          <QrCode value="getmacaddress" size={350} />
        </S.QRCodeArea>
        <S.Validation>
          <span>Enter the code generated on your cell phone</span>
          <input type="text" onChange={e => setMac(e.target.value)} value={mac} />
          <button onClick={saveMac}>sync</button>
        </S.Validation>
      </S.Content>

      <Footer />

    </S.Container>
  );
}

export default Sync;
