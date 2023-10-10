import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from "react-native";

// icons
import iconAdd from '../assets/add.png';
import iconConfirm from '../assets/confirm.png';

export default function Footer(props) {
  return (
    <View style={styles.footer}>
      
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Image source={props.icon === 'add' ? iconAdd : iconConfirm} style={styles.buttonImage} />
      </TouchableOpacity>

      <Text style={styles.text}>Organizing your life</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 70,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#344955',
    borderTopWidth: 3,
    borderTopColor: '#F9AA33',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    position: 'relative',
    top: -25
  },
  buttonImage: {
    width: 80,
    height: 80
  },
  text: {
    position: 'relative',
    top: -22,
    color: 'white'
  }
});
