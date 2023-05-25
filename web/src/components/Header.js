import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import api from '../services/api';

import logo from '../assets/logo.png';
import bell from '../assets/bell.png';
import ContentWrapper from './styled-components/ContentWrapperBase';


export default (props) => {
  const [lateCount, setLateCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

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
    <Container>
      <ContentWrapper>
        <LeftSide>
          <Link to={isConnected ? '/' : '/login'}>
            <img src={logo} alt="Logo" />
          </Link>
        </LeftSide>
        <RightSide>
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
            <img src={bell} alt="Notification" />
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
  height: 70px;
  background-color: #344955;
  border-bottom: 5px solid #F9AA33;
`

export const LeftSide = styled.div`
  display: flex;
  width: 50%;
  height: 70px;
  padding-left: 10px;
  
  a {
    align-self: center;
    
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
    color: white;
    font-weight: bold;
    text-decoration: none;
    text-transform: uppercase;
    margin: 0 10px;
    transition: all 0.3s ease;

    &:hover {
      color: #F9AA33;
    }
  }

  #notification {
    transition: all 0.3s ease;
    background: none;
    border: none;
    cursor: pointer;

    img {
      width: 22px;
    }

    span {
      position: relative;
      top: -12px;
      right: 10px;
      background-color: white;
      color: #F9AA33;
      padding: 0 4px;
      border-radius: 50%;
    }

    &:hover {
      opacity: 0.75;
    }
  }

  .divider::after {
    content: "|";
    margin: 0 10px;
    color: white;
    opacity: 0.5;
  }

  button {
    font-size: 1rem;
    text-transform: uppercase;
    background: none;
    border: none;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: #F9AA33;
    }
  }
`
