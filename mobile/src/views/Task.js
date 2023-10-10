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
import { StyleSheet } from "react-native";

// icons
import icons from '../utils/typeicons'

import api from '../services/api';

// components
import Header from '../components/Header';
import Footer from '../components/Footer';
import DateTimeInput from '../components/DateTimeInput';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  imageIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 5
  },
  label: {
    color: '#707070',
    fontSize: 18,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 5
  },
  input: {
    fontSize: 18,
    padding: 10,
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: '#F9AA33',
    marginHorizontal: 10
  },
  inputarea: {
    fontSize: 18,
    padding: 10,
    width: '95%',
    borderWidth: 1,
    borderColor: '#F9AA33',
    borderRadius: 10,
    marginHorizontal: 10,
    height: 100,
    textAlignVertical: 'top'
  },
  inputInline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  inline: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 100
  },
  switchLabel: {
    fontWeight: 'bold',
    color: '#F9AA33',
    textTransform: 'uppercase',
    fontSize: 16,
    paddingLeft: 10
  },
  removeLabel: {
    fontWeight: 'bold',
    color: '#344955',
    textTransform: 'uppercase',
    fontSize: 16
  }
});
