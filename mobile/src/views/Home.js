import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import api from '../services/api';
import constants from '../constants';

// components
import Header from '../components/Header';
import Footer from '../components/Footer';
import TaskCard from '../components/TaskCard';


export default function Home(props) {
  const [filter, setFilterActivated] = useState('today');
  const [tasks, setTasks] = useState([]);
  const [load, setLoad] = useState(false);

  function notification() {
    setFilterActivated('late');
  }

  function navigateTask() {
    props.navigation.navigate('Task');
  }

  async function loadTasks() {
    setLoad(true);
    await api('').get(`/task/filter/${filter}`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {

      })
      .finally(() => {
        setLoad(false);
      });
  }

  useEffect(() => {
    loadTasks();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Header isHome={true} showLeftIcon={true} showRightIcon={true} pressRight={notification} />

      <View style={styles.filter}>
        <TouchableOpacity onPress={() => setFilterActivated('all')}>
          <Text style={filter === 'all' ? styles.filterTextActived : styles.filterTextInactived}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterActivated('today')}>
          <Text style={filter === 'today' ? styles.filterTextActived : styles.filterTextInactived}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterActivated('month')}>
          <Text style={filter === 'month' ? styles.filterTextActived : styles.filterTextInactived}>Month</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterActivated('week')}>
          <Text style={filter === 'week' ? styles.filterTextActived : styles.filterTextInactived}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterActivated('year')}>
          <Text style={filter === 'year' ? styles.filterTextActived : styles.filterTextInactived}>Year</Text>
        </TouchableOpacity>
      </View>

      {load ?
        <ActivityIndicator color={constants.colors.primary} size={50} />
        :
        <ScrollView style={styles.cards} contentContainerStyle={{ alignItems: 'center' }}>
          <View style={styles.cardWrapper}>
            <>
              {tasks.map((t, i) => (
                <TaskCard key={i} id={t._id} title={t.title} when={t.when} done={t.done} type={t.type} last={i === tasks.length() - 1} />
              ))}
              <TaskCard id="1" title="Teste 1" when="2023-10-10" done={false} type={1} />
              <TaskCard id="1" title="Teste 1" when="2023-10-10" done={true} type={2} />
              <TaskCard id="1" title="Teste 1" when="2023-10-10" done={false} type={3} />
              <TaskCard id="1" title="Teste 1" when="2023-10-10" done={false} type={4} />
              <TaskCard id="1" title="Teste 1" when="2023-10-10" done={false} type={5} />
              <TaskCard id="1" title="Teste 1" when="2023-10-10" done={false} type={6} />
              <TaskCard id="1" title="Teste 1" when="2023-10-10" done={false} type={7} />
              <TaskCard id="1" title="Teste 1" when="2023-10-10" done={true} type={2} />
              <TaskCard id="1" title="Teste 1" when="2023-10-10" done={false} type={7} />
              <TaskCard id="1" title="Teste 1" when="2023-10-10" done={true} type={2} />
              <TaskCard id="1" title="Teste 1" when="2023-10-10" done={false} type={7} />
              <TaskCard id="1" title="Teste 1" when="2023-10-10" done={true} type={2} />
              <TaskCard id="1" title="Teste 1" when="2023-10-10" done={false} type={7} />
              <TaskCard id="1" title="Teste 1" when="2023-10-10" done={false} type={8} last={true} />
            </>
          </View>
        </ScrollView>
      }

      <Footer icon={'add'} onPress={navigateTask}></Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: constants.colors.light100
  },
  cardWrapper: {
    flexWrap: 'wrap',
    width: '95%',
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    marginBottom: 120,
    elevation: 5,
    backgroundColor: 'white'
  },
  title: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: constants.colors.dark500,
    alignItems: 'center'
  },
  titleText: {
    color: constants.colors.dark500,
    fontSize: 18,
    position: 'relative',
    top: 11,
    backgroundColor: 'white',
    paddingHorizontal: 10
  },
  filter: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  filterTextActived: {
    fontWeight: 'bold',
    fontSize: 18,
    color: constants.colors.primary
  },
  filterTextInactived: {
    fontWeight: 'bold',
    fontSize: 18,
    color: constants.colors.dark100,
  },
  cards: {
    flex: 1,
    width: '100%',
    padding: 10
  }
});
