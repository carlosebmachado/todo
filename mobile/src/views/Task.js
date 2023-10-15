import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Switch,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import { StyleSheet } from "react-native";

import api from '../services/api';
import constants from '../constants';
import SessionStore from '../services/SessionStore';

// components
import Header from '../components/Header';
import Footer from '../components/Footer';
import DateTimeInput from '../components/DateTimeInput';
import TypeIcon, { CATEGORY_COUNT } from '../components/TypeIcon';

export default function Task(props) {
  const refDescriptionTextInput = useRef(null);
  const [isBusy, setIsBusy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');
  const [type, setType] = useState(0);
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [when, setWhen] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const taskId = props.navigation.state.params && props.navigation.state.params.id;

  function navigateHome() {
    props.navigation.navigate('Home');
  }

  // save task
  async function handleSave() {
    // data validation
    if (!type) {
      ToastAndroid.showWithGravity(
        'The Task type is missing.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }
    if (!title) {
      ToastAndroid.showWithGravity(
        'The Task title is missing.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }

    setIsBusy(true);

    var taskBody = {
      type,
      title,
    };

    if (description) {
      taskBody.description = description;
    }

    if (when) {
      var strDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      var strHour = `${hour.getHours().toString().padStart(2, '0')}:${hour.getMinutes().toString().padStart(2, '0')}`;
      taskBody.when = `${strDate}T${strHour}:00.000`;
    }

    // console.log(taskBody);

    // if id has setted, update
    if (taskId) {
      await api(token).put(`/task/${taskId}`, taskBody)
        .then(() => {
          props.navigation.navigate('Home');
        })
        .catch(error => {
          console.log(error);
          alert('Error updating task.');
        })
        .finally(() => {
          setIsBusy(false);
        });
      // else insert
    } else {
      await api(token).post('/task', taskBody)
        .then(() => {
          props.navigation.navigate('Home');
        })
        .catch(error => {
          console.log(error);
          alert('Error inserting task');
        })
        .finally(() => {
          setIsBusy(false);
        });
    }
  }

  async function handleDelete() {
    const confirm = window.confirm('Do you really want to remove the task?');
    if (confirm) {
      await api(token).delete(`/task/${taskId}`)
        .then(() => {
          props.navigation.navigate('Home');
        })
        .catch(error => {
          console.log(error);
          alert('Error deleting task');
        })
        .finally(() => {
          setIsBusy(false);
        });
    }
  }

  useEffect(() => {
    async function loadTask() {
      if (!taskId) {
        setIsLoading(false);
        return;
      }

      if (!isConnected || !token) {
        return;
      }

      if (!isLoading) {
        return;
      }

      await api(token).get(`/task/${taskId}`)
        .then(response => {
          setType(response.data.type);
          setTitle(response.data.title);
          setDone(response.data.done);
          setDescription(response.data.description);
          setDate(format(new Date(response.data.when), 'yyyy-MM-dd'));
          setHour(format(new Date(response.data.when), 'HH:mm'));
        })
        .catch(error => {
          console.log(error);
          ToastAndroid.showWithGravity(
            'Error loading task',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (!isConnected) {
      SessionStore.getData()
        .then(response => {
          if (!response.token) {
            props.navigation.navigate('Login');
            return;
          }
          setIsConnected(true);
          setToken(response.token);
        })
        .catch(error => {
          console.log(error);
          props.navigation.navigate('Login');
        });
    }

    loadTask();
  }, [taskId, isConnected, isLoading, token]);

  return (
    isLoading || isBusy ?
      <View style={styles.loadingView}>
        <ActivityIndicator color={constants.colors.primary} size={50} />
      </View>
      :
      <KeyboardAvoidingView behavior="margin" style={styles.container}>

        <Header showLeftIcon={true} pressLeft={navigateHome} />

        <ScrollView style={{ width: '100%' }}>

          <ScrollView style={{ marginVertical: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>
            {
              new Array(CATEGORY_COUNT).fill(0).map((_, i) => (
                i > 0 &&
                <TouchableOpacity style={styles.categoryView} key={i} onPress={() => setType(i)}>
                  <TypeIcon type={i} size={48} color="white" backgroundColor={type === i ? constants.colors.secondary : constants.colors.primary} />
                </TouchableOpacity>
              ))
            }
          </ScrollView>

          <Text style={styles.label}>Title</Text>
          <TextInput value={title} onChangeText={setTitle} style={styles.input} maxLength={30} placeholder={'task title...'} onSubmitEditing={() => refDescriptionTextInput.current.focus()} blurOnSubmit={false} />

          <Text style={styles.label}>Description</Text>
          <TextInput value={description} onChangeText={setDescription} style={styles.inputarea} maxLength={200} multiline={true} placeholder={'task description...'} />

          <View style={[styles.inputInline, { paddingHorizontal: 10, marginBottom: 0 }]}>
            <Switch onValueChange={() => setWhen(!when)} value={when} thumbColor={when ? constants.colors.primary : '#f0f0f0'} />
            <Text style={styles.switchLabel}>WHEN?</Text>
          </View>
          {when &&
            <>
              <DateTimeInput mode='date' value={date} onValueChange={setDate} />
              <DateTimeInput mode='time' value={hour} onValueChange={setHour} />
            </>
          }

          <View style={styles.inline}>
            <View style={styles.inputInline}>
              <Switch onValueChange={() => setDone(!done)} value={done} thumbColor={done ? constants.colors.primary : '#f0f0f0'} />
              <Text style={styles.switchLabel}>DONE</Text>
            </View>

            {taskId &&
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.removeLabel}>DELETE</Text>
              </TouchableOpacity>
            }

          </View>

        </ScrollView>

        <Footer icon={'save'} onPress={handleSave}></Footer>

      </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  categoryView: {
    paddingHorizontal: 8,
    paddingVertical: 10
  },
  imageIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 5
  },
  label: {
    color: '#707070',
    fontSize: 18,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 5
  },
  input: {
    fontSize: 18,
    padding: 10,
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: constants.colors.primary,
    marginHorizontal: 10
  },
  inputarea: {
    fontSize: 18,
    padding: 10,
    width: '95%',
    borderWidth: 1,
    borderColor: constants.colors.primary,
    borderRadius: 10,
    marginHorizontal: 10,
    height: 100,
    textAlignVertical: 'top'
  },
  inputInline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  inline: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 100
  },
  switchLabel: {
    fontWeight: 'bold',
    color: constants.colors.primary,
    textTransform: 'uppercase',
    fontSize: 16,
    paddingLeft: 10
  },
  removeLabel: {
    fontWeight: 'bold',
    color: '#344955',
    textTransform: 'uppercase',
    fontSize: 16
  }
});
