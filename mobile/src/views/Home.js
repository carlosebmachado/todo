import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, ToastAndroid } from 'react-native';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import api from '../services/api';
import constants from '../constants';
import SessionStore from '../services/SessionStore';

// components
import Header from '../components/Header';
import Footer from '../components/Footer';
import TaskCard from '../components/TaskCard';

import EmptyImage from '../assets/undraw_empty_re_opql.svg';


export default function Home(props) {
  const [filter, setFilterActivated] = useState('today');
  const [tasks, setTasks] = useState([]);
  const [load, setLoad] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState('');
  const [firstLoad, setFirstLoad] = useState(true);

  function notification() {
    setFilterActivated('late');
  }

  function logout() {
    SessionStore.signout();
    props.navigation.navigate('Login');
  }

  function navigateTask() {
    props.navigation.navigate('Task');
  }

  async function loadTasks() {
    setLoad(true);
    await api(token).get(`/task/filter/${filter}`)
      .then(response => {
        if (response.data.length === 0 && filter !== 'all' && firstLoad) {
          setFilterActivated('all');
          setFirstLoad(false);
          return;
        }
        setTasks(response.data);
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.showWithGravity(
          'Error loading tasks.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setTasks([]);
      })
      .finally(() => {
        setLoad(false);
      });
  }

  useEffect(() => {
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
  }, [filter, isConnected, token]);

  return (
    <View style={styles.container}>
      <Header isHome={true} showLeftIcon={true} showRightIcon={true} pressLeft={logout} pressRight={notification} />

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
            {
              tasks.length !== 0 ?
                tasks.map((t, i) =>
                  <TaskCard key={i} id={t._id} title={t.title} when={t.when} done={t.done} type={t.type} last={i === tasks.length - 1} onPress={() => props.navigation.navigate('Task', { id: t._id })} />
                )
                :
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', padding: 30 }}>
                  <Text style={{ marginBottom: 20 }}>No tasks found :(</Text>
                  <EmptyImage width={200} height={100} />
                </View>
            }
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
