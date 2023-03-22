import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Switch
} from 'react-native';
import styles from './styles';

// icons
import icons from '../../utils/typeicons'

import api from '../../services/api';

// components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DateTimeInput from '../../components/DateTimeInput';

export default function Task(props) {
  const [done, setDone] = useState(false);

  function navigateHome() {
    props.navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView behavior="margin" style={styles.container}>

      <Header pressLeft={navigateHome} />

      <ScrollView style={{width: '100%'}}>

        <ScrollView style={{marginVertical: 10}} horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            icons.map((icon, i) => (
              icon &&
              <TouchableOpacity key={i}>
                <Image source={icon} style={styles.imageIcon}/>
              </TouchableOpacity>
            ))
          }
        </ScrollView>

        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} maxLength={30} placeholder={'task title...'} />

        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.inputarea} maxLength={200} multiline={true} placeholder={'task description...'} />

        <DateTimeInput mode='date' />
        <DateTimeInput mode='time' />

        <View style={styles.inline}>
          <View style={styles.inputInline}>
            <Switch onValueChange={() => setDone(!done)} value={done} thumbColor={done ? '#F9AA33' : '#f0f0f0'} />
            <Text style={styles.switchLabel}>DONE</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.removeLabel}>DELETE</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <Footer icon={'save'}></Footer>

    </KeyboardAvoidingView>
  );
}
