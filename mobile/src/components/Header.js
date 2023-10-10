import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import api from '../services/api';
import constants from '../constants';

export default function Header(props) {
  const [lateCount, setLateCount] = useState(0);

  // trigger loadTasks based on filterActivated
  useEffect(() => {
    async function lateVerify() {
      // await api.get(`/task/filter/late`)
      //   .then(response => {
      //     setLateCount(response.data.length);
      //   })
    }

    lateVerify();
  }, []);

  return (
    <View style={styles.header}>

      <TouchableOpacity onPress={props.pressLeft} style={styles.leftIcon}>
        {props.isHome ?
          <FontAwesome5 name="qrcode" size={24} color={constants.colors.primary} />
          :
          <FontAwesome5 name="arrow-left" size={24} color={constants.colors.primary} />
        }

      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: 'bold', color: constants.colors.primary }}>ToDo</Text>

      {
        props.showNotification &&
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
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 13,
    bottom: 13
  },
  notificationText: {
    color: '#F9AA33',
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
