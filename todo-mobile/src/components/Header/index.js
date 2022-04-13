import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

import api from '../../services/api';

// icons
import iconLogo from '../../assets/logo.png';
import iconBell from '../../assets/bell.png';
import iconQrcode from '../../assets/qrcode.png';
import iconBack from '../../assets/back.png';

export default function Header(props) {
  const [lateCount, setLateCount] = useState(0);

  // trigger loadTasks based on filterActivated
  useEffect(() => {
    async function lateVerify() {
      await api.get(`/task/filter/late/11:11:11:11:11:11`)
        .then(response => {
          setLateCount(response.data.length);
        })
    }

    lateVerify();
  }, []);

  return (
    <View style={styles.header}>
      
      <TouchableOpacity onPress={props.pressLeft} style={styles.leftIcon}>
        <Image source={props.isHome ? iconQrcode : iconBack} style={styles.leftIconImage} />
      </TouchableOpacity>

      <Image source={iconLogo} style={styles.logo} />

      {
        props.showNotification &&
        <TouchableOpacity style={styles.notification} onPress={props.pressRight}>
          <Image source={iconBell} style={styles.notificationImage} />
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
