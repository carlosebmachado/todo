import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { StyleSheet } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import constants from '../constants';

export default function Footer(props) {
  return (
    <View style={styles.footer}>

      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <View style={styles.buttonImage}>
          {props.icon === 'add' ?
            <FontAwesome5 name="plus" size={48} color="white" />
            :
            <FontAwesome5 name="check" size={48} color="white" />
          }
        </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    position: 'relative',
    top: -20
  },
  buttonImage: {
    width: 75,
    height: 75,
    borderRadius: 75,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: constants.colors.primary,
    elevation: 5
  },
});
