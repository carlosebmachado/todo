import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

import api from '../services/api';
import SessionStore from '../utils/SessionStore';

import { BsBell } from 'react-icons/bs';
import ContentWrapper from './styled-components/ContentWrapperBase';
import constants from '../constants';


export default function Header(props) {
  const [token, setToken] = useState('');
  const [lateCount, setLateCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [logout, setLogout] = useState(false);

  async function handleLogout() {
    // localStorage.removeItem('@todo/macaddress');
    SessionStore.signout();
    setLogout(true);
    // window.location.reload();
    // useNavigate('/login');
  }

  // trigger loadTasks based on filterActivated
  useEffect(() => {
    async function lateVerify() {
      await api(token).get(`/task/filter/late`)
        .then(response => {
          setLateCount(response.data.length);
        })
    }

    if (!isConnected) {
      SessionStore.getData()
        .then(response => {
          if (!response.token) {
            return;
          }
          setIsConnected(true);
          setToken(response.token);
        });
    }

    if (isConnected && token) {
      lateVerify();
    }
  }, [isConnected, token]);

  return (
    <Container>
      {logout && <Redirect to="/login" />}
      <ContentWrapper>
        <LeftSide>
          <Link to={isConnected ? '/' : '/login'}>
            {/* <img src={logo} alt="Logo" /> */}
            <h1>ToDo</h1>
          </Link>
        </LeftSide>
        <RightSide>
          {
            isConnected ?
              <>
                <Link to="/">Home</Link>
                <span className="divider" />
                <Link to="/task">New Task</Link>
                <span className="divider" />
                <button onClick={handleLogout}>Logout</button>
              </>
              :
              <Link to="/login">login</Link>
          }
          {/* {
          isConnected ?
            <button onClick={handleLogout}>logout</button>
            :
            <Link to="/sync">sync</Link>
        } */}
          <span className="divider" />
          <button id="notification" onClick={props.clickNotification}>
            {/* <img src={bell} alt="Notification" /> */}
            <BsBell color={constants.colors.primary} size={19} />
            {
              lateCount > 0 &&
              <span>{lateCount}</span>
            }
          </button>
        </RightSide>
      </ContentWrapper>
    </Container >
  );
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  /* height: 70px; */
  padding-bottom: 20px;
  /* background-color: white; */
  /* border-bottom: 5px solid #F9AA33; */
  background: linear-gradient(180deg, white 0%, white 70%, ${constants.colors.light100} 100%);;
`

export const LeftSide = styled.div`
  display: flex;
  width: 50%;
  height: 70px;
  padding-left: 10px;
  
  a {
    align-self: center;
    text-decoration: none;
    color: ${constants.colors.primary};
    font-size: 14px;
    font-weight: bold;

    img {
      width: 100px;
    }
  }
`

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 50%;
  height: 70px;

  a {
    color: ${constants.colors.dark200};
    font-weight: bold;
    text-decoration: none;
    /* text-transform: uppercase; */
    margin: 0 10px;
    transition: all 0.3s ease;

    &:hover {
      color: ${constants.colors.dark100};
    }
  }

  #notification {
    transition: all 0.3s ease;
    background: none;
    border: none;
    cursor: pointer;

    svg {
      margin-top: 4px;
    }

    span {
      position: relative;
      top: -12px;
      right: 8px;
      background-color: white;
      color: ${constants.colors.secondary};
      font-size: 0.8rem;
      padding: 0 1px;
      border-radius: 50%;
    }

    &:hover {
      opacity: 0.75;
    }
  }

  .divider::after {
    content: "|";
    margin: 0 10px;
    color: ${constants.colors.dark300};
    opacity: 0.5;
  }

  button {
    font-size: 1rem;
    /* text-transform: uppercase; */
    background: none;
    border: none;
    font-weight: bold;
    color: ${constants.colors.dark200};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: ${constants.colors.dark100};
    }
  }
`
