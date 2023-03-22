import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

// icons
import iconAdd from '../../assets/add.png';
import iconConfirm from '../../assets/confirm.png';

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
