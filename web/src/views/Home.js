import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import api from '../services/api';

import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterCard from '../components/FilterCard';
import TaskCard from '../components/TaskCard';
import ContentWrapperBase from '../components/styled-components/ContentWrapperBase';
import FixedImageButton from '../components/FixedImageButton'


export default function Home(props) {
  const [filterActivated, setFilterActivated] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [redirectSync, setRedirectSync] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  function notification() {
    setFilterActivated('late');
  }

  function handleNewTaskClick(e) {
    e.preventDefault();
  }

  useEffect(() => {
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
  }, [filterActivated, isConnected]);

  return (
    <Container>
      {redirectSync && <Redirect to="/login" />}

      <Header clickNotification={notification} />

      <FilterWrapper>
        <FilterCard title="All" actived={filterActivated === 'all'} onClick={() => setFilterActivated('all')} />
        <FilterCard title="Today" actived={filterActivated === 'today'} onClick={() => setFilterActivated('today')} />
        <FilterCard title="Week" actived={filterActivated === 'week'} onClick={() => setFilterActivated('week')} />
        <FilterCard title="Month" actived={filterActivated === 'month'} onClick={() => setFilterActivated('month')} />
        <FilterCard title="Year" actived={filterActivated === 'year'} onClick={() => setFilterActivated('year')} />
      </FilterWrapper>

      {/* <Title>
        <h1>{filterActivated === 'late' ? 'overdue tasks' : 'tasks'}</h1>
      </Title> */}

      <CardWrapper>
        {
          tasks.map((t, i) => (
            <TaskCard key={i.toString()} id={t._id} type={t.type} title={t.title} when={t.when} done={t.done} />
          ))
        }
        <TaskCard type={1} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={false} />
        <TaskCard type={2} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={true} />
        <TaskCard type={3} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={false} />
        <TaskCard type={4} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={false} />
        <TaskCard type={5} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={false} />
        <TaskCard type={6} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={false} />
        <TaskCard type={7} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={false} />
        <TaskCard type={8} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={true} />
      </CardWrapper>

      <FixedImageButton onClick={handleNewTaskClick} />

      <Footer />

    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterWrapper = styled(ContentWrapperBase)`
  width: 100%;
  margin-top: 15px;
  margin-bottom: 5px;
  justify-content: space-around;
`;

const Title = styled.div`
  width: 100%;
  border-bottom: 1px solid #344955;
  text-align: center;
  margin-bottom: 30px;

  h1 {
    color: #344955;
    position: relative;
    top: 15px;
    text-transform: uppercase;
    background-color: white;
    font-size: 1.7rem;
    display: inline-block;
    padding: 0 20px;
  }
`;

const CardWrapper = styled(ContentWrapperBase)`
  flex-wrap: wrap;
  margin-top: 25px;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;
