import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import api from '../services/api';
import SessionStore from '../utils/SessionStore';
import constants from '../constants';

import Header from '../components/Header';
import FilterCard from '../components/FilterCard';
import TaskCard from '../components/TaskCard';
import ContentWrapperBase from '../components/styled-components/ContentWrapperBase';
import Loading from '../components/Loading';

import emptyImage from '../assets/undraw_empty_re_opql.svg';


export default function Home() {
  const [isBusy, setIsBusy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');
  const [filterActivated, setFilterActivated] = useState('today');
  const [tasks, setTasks] = useState([]);
  const [redirectSync, setRedirectSync] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  function notification() {
    setFilter('late');
  }

  function setFilter(filter) {
    setIsBusy(true);
    setFilterActivated(filter);
  }

  useEffect(() => {
    async function loadTasks() {
      api(token).get(`/task/filter/${filterActivated}`)
        .then(response => {
          if (response.data.length === 0 && filterActivated !== 'all' && firstLoad) {
            setFilterActivated('all');
            setFirstLoad(false);
            return;
          }
          setTasks(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setIsBusy(false);
        });
    }

    if (!isConnected) {
      SessionStore.getData()
        .then(response => {
          if (!response.token) {
            setRedirectSync(true);
            return;
          }
          setIsConnected(true);
          setToken(response.token);
        });
    }

    if (isConnected && token) {
      loadTasks();
    }
  }, [filterActivated, token, isConnected, isLoading, firstLoad]);

  return (
    <Container>
      {/* <Loading show={isBusy} opacity={.75} /> */}

      {redirectSync && <Redirect to="/login" />}

      <Header clickNotification={notification} />

      <FilterWrapper>
        <FilterCard title="All" actived={filterActivated === 'all'} onClick={() => setFilter('all')} />
        <FilterCard title="Today" actived={filterActivated === 'today'} onClick={() => setFilter('today')} />
        <FilterCard title="Week" actived={filterActivated === 'week'} onClick={() => setFilter('week')} />
        <FilterCard title="Month" actived={filterActivated === 'month'} onClick={() => setFilter('month')} />
        <FilterCard title="Year" actived={filterActivated === 'year'} onClick={() => setFilter('year')} />
      </FilterWrapper>

      <CardWrapper>
        {isLoading || isBusy ?
          <Loading size={24} fullScreen={false} />
          :
          tasks.length !== 0 ?
            tasks.map((t, i) => (
              <TaskCard key={i.toString()} id={t._id} type={t.type} title={t.title} when={t.when} done={t.done} />
            ))
            :
            <NoTasksWrapper>
              <h1>No tasks found :(</h1>
              <img width={250} src={emptyImage} alt="No tasks found" />
            </NoTasksWrapper>
        }
      </CardWrapper>

    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${constants.colors.light100};
`;

const FilterWrapper = styled(ContentWrapperBase)`
  width: 100%;
  margin-top: 15px;
  margin-bottom: 5px;
  justify-content: space-around;
  background-color: aliceblue;
`;

const CardWrapper = styled(ContentWrapperBase)`
  flex-wrap: wrap;
  margin-top: 25px;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;

const NoTasksWrapper = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: ${constants.colors.dark200};
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
`;
