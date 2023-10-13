import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';

import api from '../services/api';
import constants from '../constants';
import SessionStore from '../services/SessionStore';
import Header from '../components/Header';


export default function Login(props) {
  const [isBusy, setIsBusy] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  async function onSigninClick() {
    if (!username) {
      ToastAndroid.showWithGravity(
        'You need to enter your username.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }
    if (!password) {
      ToastAndroid.showWithGravity(
        'You need to enter your password.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }

    setIsBusy(true);

    try {
      const response = await api('').post('/auth/login', {
        username,
        password
      });
      await SessionStore.signin({
        userId: response.data.userId,
        username: username,
        name: response.data.name,
        token: response.data.token
      });
      setIsConnected(true);
    } catch (error) {
      ToastAndroid.showWithGravity(
        'Wrong username or password.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }

    setIsBusy(false);
  }

  useEffect(() => {
    if (isConnected) {
      props.navigation.navigate('Home');
    }

    if (!isConnected) {
      SessionStore.getData()
        .then(response => {
          if (response.token) {
            props.navigation.navigate('Home');
          }
        });
    }

  }, [isConnected]);

  return (
    <>
      <Header />
      <View style={styles.container}>
        {isBusy && <ActivityIndicator color={constants.colors.primary} size={50} />}
        <Text style={styles.title}>LOGIN</Text>
        <TextInput value={username} onChangeText={setUsername} placeholder={'username...'} style={styles.input} />
        <TextInput value={password} onChangeText={setPassword} placeholder={'password...'} style={[styles.input, { marginBottom: 40 }]} />
        <Button title="Sign in" onPress={onSigninClick} color={constants.colors.primary} />
        <TouchableOpacity style={styles.createAccount} onPress={() => props.navigation.navigate('Register')}>
          <Text style={styles.createAccount}>Don't have an account?</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    marginTop: 50,
    padding: 20
  },
  createAccount: {
    color: constants.colors.primary,
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  title: {
    color: constants.colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20
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
    marginHorizontal: 10,
    marginBottom: 10
  },
});
