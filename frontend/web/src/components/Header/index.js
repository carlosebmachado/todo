import React from 'react';
import * as S from './styles';

import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';


function Header() {
  return (
    <S.Container>
      <S.LeftSide>
        <img src={logo} alt="Logo" />
      </S.LeftSide>
      <S.RightSide>
        <a href="#">home</a>
        <span className="divider" />
        <a href="#">new task</a>
        <span className="divider" />
        <a href="#">sync</a>
        <span className="divider" />
        <a href="#" id="notification">
          <img src={bell} alt="Notification" />
          <span>3</span>
        </a>
      </S.RightSide>
    </S.Container>
  );
}

export default Header;
