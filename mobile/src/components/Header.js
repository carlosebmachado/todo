import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import api from '../services/api';
import constants from '../constants';
import SessionStore from '../services/SessionStore';


export default function Header(props) {
  const [lateCount, setLateCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState('');

  // trigger loadTasks based on filterActivated
  useEffect(() => {
    async function lateVerify() {
      await api(token).get(`/task/filter/late`)
      .then(response => {
        setLateCount(response.data.length);
      })
      .catch(error => {
        console.log(error);
      });
    }

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

    if (isConnected && token) {
      lateVerify();
    }
  }, [isConnected, token]);

  return (
    <View style={styles.header}>

      {
        props.showLeftIcon &&
        <TouchableOpacity onPress={props.pressLeft} style={styles.leftIcon}>
          {props.isHome ?
            <FontAwesome5 style={{ transform: [{ rotate: '180deg' }] }} name="sign-out-alt" size={24} color={constants.colors.primary} />
            :
            <FontAwesome5 name="arrow-left" size={24} color={constants.colors.primary} />
          }

        </TouchableOpacity>
      }

      <Text style={{ fontSize: 24, fontWeight: 'bold', color: constants.colors.primary }}>ToDo</Text>

      {
        props.showRightIcon &&
        <TouchableOpacity style={styles.notification} onPress={props.pressRight}>
          <FontAwesome5 name="bell" size={24} color={constants.colors.primary} />
          {
            lateCount > 0 &&
            <View style={styles.notificationTextBackground}>
              <Text style={styles.notificationText}>{lateCount}</Text>
            </View>
          }
        </TouchableOpacity>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 70,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1
  },
  logo: {
    width: 100,
    height: 30
  },
  notification: {
    position: 'absolute',
    right: 20
  },
  notificationImage: {
    width: 25,
    height: 30
  },
  notificationTextBackground: {
    width: 17,
    height: 17,
    backgroundColor: constants.colors.danger,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 10,
    bottom: 10
  },
  notificationText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold'
  },
  leftIcon: {
    position: 'absolute',
    left: 20
  },
  leftIconImage: {
    width: 30,
    height: 30
  }
});
