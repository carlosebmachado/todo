import React, { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { format } from 'date-fns';

// icons
import icons from '../../utils/typeicons'

export default function TaskCard(props) {
  const date = useMemo(() => format(new Date(props.when), 'MM-dd-yyyy'), [props.when]);
  const hour = useMemo(() => format(new Date(props.when), 'HH:mm'), [props.when]);

  return (
    <TouchableOpacity style={[styles.card, props.done && styles.cardDone]}>
      <View style={styles.cardLeftSide}>
        <Image source={icons[props.type]} style={styles.cardIcon} />
        <Text style={styles.cardTitle}>{props.title}</Text>
      </View>
      <View style={styles.cardRightSide}>
        <Text style={styles.cardDate}>{date}</Text>
        <Text style={styles.cardTime}>{hour}</Text>
      </View>
    </TouchableOpacity>
  );
}
