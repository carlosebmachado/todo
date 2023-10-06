import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import api from '../services/api';
import SessionStore from '../utils/SessionStore';

import Header from '../components/Header';
// import Footer from '../components/Footer';
import FilterCard from '../components/FilterCard';
import TaskCard from '../components/TaskCard';
import ContentWrapperBase from '../components/styled-components/ContentWrapperBase';
// import FixedImageButton from '../components/FixedImageButton'
import constants from '../constants';


export default function Home(props) {
  const [token, setToken] = useState('');
  const [filterActivated, setFilterActivated] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [redirectSync, setRedirectSync] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  function notification() {
    setFilterActivated('late');
  }

  // function handleNewTaskClick(e) {
  //   e.preventDefault();
  // }

  useEffect(() => {
    async function loadTasks() {
      console.log('token call: ', token);
      await api(token).get(`/task/filter/${filterActivated}`)
        .then(response => {
          setTasks(response.data);
        })
    }

    if (!isConnected) {
      SessionStore.getData()
        .then(response => {
          console.log(response);
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
  }, [filterActivated, token, isConnected]);

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
        <TaskCard type={1} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={false} />
        <TaskCard type={2} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={true} />
        <TaskCard type={3} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={false} />
        <TaskCard type={4} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={false} />
        <TaskCard type={5} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={false} />
        <TaskCard type={6} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={false} />
        <TaskCard type={7} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={false} />
        <TaskCard type={8} title="Task loren ipsum dolor amet" when={new Date(Date.now())} done={true} />
      </CardWrapper>

      {/* <FixedImageButton onClick={handleNewTaskClick} /> */}

      {/* <Footer /> */}

    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  /* margin-bottom: 70px; */
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
`;

const CardWrapper = styled(ContentWrapperBase)`
  /* background-color: white; */
  flex-wrap: wrap;
  margin-top: 25px;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;
