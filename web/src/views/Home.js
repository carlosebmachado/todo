import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

import api from '../services/api';
import isConnected from '../utils/isConnected';

import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterCard from '../components/FilterCard';
import TaskCard from '../components/TaskCard';


export default () => {
  const [filterActivated, setFilterActivated] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [redirectSync, setRedirectSync] = useState(false);

  function notification() {
    setFilterActivated('late');
  }

  // trigger loadTasks based on filterActivated
  useEffect(() => {
    // load tasks from api to tasks state
    async function loadTasks() {
      await api.get(`/task/filter/${filterActivated}/${isConnected}`)
      .then(response => {
        setTasks(response.data);
      })
    }

    if (!isConnected) {
      // setRedirectSync(true);
    }

    loadTasks();
  }, [filterActivated]);

  return (
    <Container>
      {redirectSync && <Redirect to="/sync" />}

      <Header clickNotification={notification} />
  
      <FilterWrapper>
        <FilterCard title="All" actived={filterActivated === 'all'} onClick={() => setFilterActivated('all')} />
        <FilterCard title="Today" actived={filterActivated === 'today'} onClick={() => setFilterActivated('today')} />
        <FilterCard title="Week" actived={filterActivated === 'week'} onClick={() => setFilterActivated('week')} />
        <FilterCard title="Month" actived={filterActivated === 'month'} onClick={() => setFilterActivated('month')} />
        <FilterCard title="Year" actived={filterActivated === 'year'} onClick={() => setFilterActivated('year')} />
      </FilterWrapper>

      <Title>
        <h1>{filterActivated === 'late' ? 'overdue tasks' : 'tasks'}</h1>
      </Title>

      <CardWrapper>
        {
          tasks.map((t, i) => (
            <Link key={i.toString()} to={`/task/${t._id}`}>
              <TaskCard type={t.type} title={t.title} when={t.when} done={t.done} />
            </Link>
          ))
        }
      </CardWrapper>

      <Footer />

    </Container>
  );
}

export const Container = styled.div`
  width: 100%;
  margin-bottom: 70px;
  /* overflow: auto; */
`;

export const FilterWrapper = styled.div`
  width: 100%;
  height: 60px;
  margin-top: 30px;
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: space-around;
`

export const Title = styled.div`
  width: 100%;
  border-bottom: 1px solid #344955;
  text-align: center;
  margin-bottom: 30px;

  h1 {
    color: #344955;
    position: relative;
    top: 34px;
    text-transform: uppercase;
    background-color: white;
    font-size: 1.7rem;
    display: inline-block;
    padding: 0 20px;
  }
`

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  a {
    text-decoration: none;
  }

`
