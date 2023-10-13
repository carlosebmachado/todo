import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { format } from 'date-fns';

import constants from '../constants';

// icons
import TypeIcon from './TypeIcon';


export default function TaskCard(props) {
  const [isChecked, setChecked] = React.useState(false);
  const date = useMemo(() => format(new Date(props.when), 'MM-dd-yyyy'), [props.when]);
  const hour = useMemo(() => format(new Date(props.when), 'HH:mm'), [props.when]);

  return (
    <View style={[styles.card, props.last && { borderBottomWidth: 0 }]}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? constants.colors.primary : undefined}
      />
      <TouchableOpacity style={styles.cardTouch}>
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
