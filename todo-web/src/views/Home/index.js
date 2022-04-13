import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { Link, Redirect } from 'react-router-dom';

import api from '../../services/api';
import isConnected from '../../utils/isConnected';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterCard from '../../components/FilterCard';
import TaskCard from '../../components/TaskCard';


function Home() {
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
      setRedirectSync(true);
    }

    loadTasks();
  }, [filterActivated]);

  return (
    <S.Container>
      {redirectSync && <Redirect to="/sync" />}

      <Header clickNotification={notification} />
  
      <S.FilterWrapper>
        <FilterCard title="All" actived={filterActivated === 'all'} onClick={() => setFilterActivated('all')} />
        <FilterCard title="Today" actived={filterActivated === 'today'} onClick={() => setFilterActivated('today')} />
        <FilterCard title="Week" actived={filterActivated === 'week'} onClick={() => setFilterActivated('week')} />
        <FilterCard title="Month" actived={filterActivated === 'month'} onClick={() => setFilterActivated('month')} />
        <FilterCard title="Year" actived={filterActivated === 'year'} onClick={() => setFilterActivated('year')} />
      </S.FilterWrapper>

      <S.Title>
        <h1>{filterActivated === 'late' ? 'overdue tasks' : 'tasks'}</h1>
      </S.Title>

      <S.CardWrapper>
        {
          tasks.map((t, i) => (
            <Link key={i.toString()} to={`/task/${t._id}`}>
              <TaskCard type={t.type} title={t.title} when={t.when} done={t.done} />
            </Link>
          ))
        }
      </S.CardWrapper>

      <Footer />

    </S.Container>
  );
}

export default Home;
