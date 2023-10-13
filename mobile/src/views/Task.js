import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Switch
} from 'react-native';
import { StyleSheet } from "react-native";

import api from '../services/api';
import constants from '../constants';

// components
import Header from '../components/Header';
import Footer from '../components/Footer';
import DateTimeInput from '../components/DateTimeInput';
import TypeIcon, { CATEGORY_COUNT } from '../components/TypeIcon';

export default function Task(props) {
  const [done, setDone] = useState(false);

  function navigateHome() {
    props.navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView behavior="margin" style={styles.container}>

      <Header showLeftIcon={true} pressLeft={navigateHome} />

      <ScrollView style={{width: '100%'}}>

        <ScrollView style={{marginVertical: 10}} horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            new Array(CATEGORY_COUNT).fill(0).map((_, i) => (
              i > 0 &&
              <TouchableOpacity style={styles.categoryView} key={i}>
                <TypeIcon type={i} size={48} color="white" backgroundColor={constants.colors.primary} />
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
            <Switch onValueChange={() => setDone(!done)} value={done} thumbColor={done ? constants.colors.primary : '#f0f0f0'} />
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
  categoryView: {
    paddingHorizontal: 8,
    paddingVertical: 10
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
    borderBottomColor: constants.colors.primary,
    marginHorizontal: 10
  },
  inputarea: {
    fontSize: 18,
    padding: 10,
    width: '95%',
    borderWidth: 1,
    borderColor: constants.colors.primary,
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
    color: constants.colors.primary,
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
