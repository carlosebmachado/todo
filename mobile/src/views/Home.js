import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { StyleSheet } from "react-native";

import api from '../services/api';

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
    await api.get(`/task/filter/${filter}/11:11:11:11:11:11`)
    .then(response =>{
      setTasks(response.data);
    })
    .catch(error => {

    });
    setLoad(false);
  }

  useEffect(() => {
    loadTasks();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Header isHome={true} showNotification={true} pressRight={notification} />

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

      <View style={styles.title}>
        <Text style={styles.titleText}>{filter === 'late' && 'OVERDUE '}TASKS</Text>
      </View>

      <ScrollView style={styles.cards} contentContainerStyle={{ alignItems: 'center' }}>
        {
          load ?
          <ActivityIndicator color={'#F9AA33'} size={50} />
          :
          tasks.map((t, i) => (
            <TaskCard key={i/*t.id*/} title={t.title} when={t.when} done={t.done} type={t.type} />
          ))
        }
      </ScrollView>

      <Footer icon={'add'} onPress={navigateTask}></Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#344955',
    alignItems: 'center'
  },
  titleText: {
    color: '#344955',
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
    alignItems:  'center',
    justifyContent: 'space-around'
  },
  filterTextActived: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#F9AA33'
  },
  filterTextInactived: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#344955',
    opacity: 0.5
  },
  cards: {
    width: '100%',
    marginTop: 30
  }
});
