import React, { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from "react-native";
import { format } from 'date-fns';

import constants from '../constants';

// icons
import TypeIcon from './TypeIcon';

export default function TaskCard(props) {
  const date = useMemo(() => format(new Date(props.when), 'MM-dd-yyyy'), [props.when]);
  const hour = useMemo(() => format(new Date(props.when), 'HH:mm'), [props.when]);

  return (
    <TouchableOpacity style={[styles.card, props.done && styles.cardDone]}>
      <View style={styles.cardLeftSide}>
        <TypeIcon type={props.type} size={48} color="white" backgroundColor={constants.colors.primary} />
        <Text style={styles.cardTitle}>{props.title}</Text>
      </View>
      <View style={styles.cardRightSide}>
        <Text style={styles.cardDate}>{date}</Text>
        <Text style={styles.cardTime}>{hour}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '95%',
    height: 70,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  cardLeftSide: {
    flexDirection: 'row',
    alignItems: 'center'
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
  cardRightSide: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
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
