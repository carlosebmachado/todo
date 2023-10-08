import React, { useMemo, useState, useEffect } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import api from '../services/api';
import constants from '../constants';
import types from '../utils/typenames';
import SessionStore from '../utils/SessionStore';

import Checkbox from './Checkbox';
import TypeIcons from './styled-components/TypeIcon';
import TypeIconWrapper from './styled-components/TypeIconWrapper';
import Loading from './Loading';


export default function TaskCard({ id, type, title, when, done, ...props }) {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [taskDone, setTaskDone] = useState(done);
  const date = useMemo(() => format(new Date(when), 'yyyy-MM-dd'), [when]);
  const hour = useMemo(() => format(new Date(when), 'HH:mm'), [when]);

  async function handleDone(_) {
    if (!id) {
      return;
    }
    if (!isConnected || !token) {
      return;
    }
    var curDone = !taskDone;
    setTaskDone(!curDone);
    await api(token).patch(`/task/${id}/${curDone}`)
      .then((response) => {
        setTaskDone(response.data.done);
      })
      .catch(error => {
        alert('Error updating task');
      });
    _.preventDefault();
  }

  useEffect(() => {
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

  }, [isConnected]);

  return (
    <Container>
      <Checkbox onChange={handleDone} checked={taskDone} />
      <ContentWrapper>
        <Link to={`/task/${id}`}>
          <h3>{title}</h3>
        </Link>
        <BottomWrapper>
          <DateWrapper>
            <span>{date}</span>
            <span>{hour}</span>
          </DateWrapper>
          <TypeWrapper>
            <span>{types[type]}</span>
            <TypeIconWrapper>
              <TypeIcons size={15} type={type} />
            </TypeIconWrapper>
          </TypeWrapper>
        </BottomWrapper>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  border: none;
  border-bottom: 1px solid #ccc;
  /* cursor: pointer; */
  transition: all 0.3s ease;

  &:last-of-type {
    border-bottom: none;
  }

`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: row;
  margin-left: 10px;

  h3 {
    color: #707070;
    font-size: 1rem;
    margin: 5px 10px 5px 0;
  }

  & > a {
    text-decoration: none;
  }
`;

const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  span {
    color: ${constants.colors.dark200};
    font-size: 0.8rem;
    margin-right: 10px;
  }
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const TypeWrapper = styled.div`
  display: flex;
  align-items: center;
`;
