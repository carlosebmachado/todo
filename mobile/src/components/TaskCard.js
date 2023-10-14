import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { format } from 'date-fns';

import constants from '../constants';
import api from '../services/api';
import SessionStore from '../services/SessionStore';

// icons
import TypeIcon from './TypeIcon';


export default function TaskCard(props) {
  const [taskDone, setTaskDone] = useState(props.done);
  const date = useMemo(() => format(new Date(props.when), 'MM-dd-yyyy'), [props.when]);
  const hour = useMemo(() => format(new Date(props.when), 'HH:mm'), [props.when]);
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState('');

  async function handleDone(_) {
    if (!props.id) {
      return;
    }
    if (!isConnected || !token) {
      return;
    }
    var curDone = !taskDone;
    setTaskDone(!curDone);
    await api(token).patch(`/task/${props.id}/${curDone}`)
      .then((response) => {
        setTaskDone(response.data.done);
      })
      .catch(_ => {
        ToastAndroid.showWithGravity(
          'Error updating task',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
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
    <View style={[styles.card, props.last && { borderBottomWidth: 0 }]}>
      <Checkbox
        style={styles.checkbox}
        value={taskDone}
        onValueChange={handleDone}
        color={taskDone ? constants.colors.primary : undefined}
      />
      <TouchableOpacity style={styles.cardTouch} onPress={props.onPress}>
        <Text style={styles.cardTitle}>{props.title}</Text>
        <View style={styles.cardRightSide}>
          <View style={styles.timeWrapper}>
            <Text style={styles.cardDate}>{date}</Text>
            <Text style={styles.cardTime}>{hour}</Text>
          </View>
          <TypeIcon type={props.type} size={34} color="white" backgroundColor={constants.colors.primary} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: constants.colors.light100
  },
  checkbox: {
    alignSelf: 'center',
    height: 24,
    width: 24
  },
  cardTouch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },
  cardRightSide: {
    display: 'flex',
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  cardIcon: {
    width: 40,
    height: 40
  },
  cardTitle: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: constants.colors.dark300
  },
  timeWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 10
  },
  cardDate: {
    color: constants.colors.primary,
    fontWeight: 'bold',
    fontSize: 16
  },
  cardTime: {
    color: constants.colors.dark100
  },
  cardDone: {
    opacity: 0.5
  }
});
