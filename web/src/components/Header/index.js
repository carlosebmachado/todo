import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import isConnected from '../../utils/isConnected';

import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';


function Header(props) {
  const [lateCount, setLateCount] = useState(0);

  async function handleLogout() {
    localStorage.removeItem('@todo/macaddress');
    window.location.reload();
  }

  // trigger loadTasks based on filterActivated
  useEffect(() => {
    async function lateVerify() {
      await api.get(`/task/filter/late/${isConnected}`)
        .then(response => {
          setLateCount(response.data.length);
        })
    }

    lateVerify();
  }, []);

  return (
    <S.Container>
      <S.LeftSide>
        <Link to={isConnected ? '/' : '/sync'}>
          <img src={logo} alt="Logo" />
        </Link>
      </S.LeftSide>
      <S.RightSide>
        {
          isConnected ?
            <>
              <Link to="/">home</Link>
              <span className="divider" />
              <Link to="/task">new task</Link>
              <span className="divider" />
              <button onClick={handleLogout}>logout</button>
            </>
            :
            <Link to="/sync">sync</Link>
        }
        {/* {
          isConnected ?
            <button onClick={handleLogout}>logout</button>
            :
            <Link to="/sync">sync</Link>
        } */}
        <span className="divider" />
        <button id="notification" onClick={props.clickNotification}>
          <img src={bell} alt="Notification" />
          {
            lateCount > 0 &&
            <span>{lateCount}</span>
          }
        </button>
      </S.RightSide>
    </S.Container>
  );
}

export default Header;
