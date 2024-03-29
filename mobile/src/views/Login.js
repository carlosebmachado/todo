import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from 'react-native';

import api from '../services/api';
import constants from '../constants';
import SessionStore from '../services/SessionStore';
import Header from '../components/Header';


export default function Login(props) {
  const refPasswordTextInput = useRef(null);
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
    isBusy ?
      <View style={styles.loadingView}>
        <ActivityIndicator color={constants.colors.primary} size={50} />
      </View>
      :
      <KeyboardAvoidingView behavior="margin" style={styles.view}>
        <Header />
        <View style={styles.container}>
          <Text style={styles.title}>LOGIN</Text>
          <TextInput value={username} onChangeText={setUsername} placeholder={'username...'} style={styles.input} onSubmitEditing={() => refPasswordTextInput.current.focus()} autoFocus={true} blurOnSubmit={false} />
          <TextInput value={password} onChangeText={setPassword} placeholder={'password...'} style={[styles.input, { marginBottom: 40 }]} secureTextEntry={true} ref={refPasswordTextInput} />
          <Button title="Sign in" onPress={onSigninClick} color={constants.colors.primary} />
          <View style={styles.createAccountView}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
              <Text style={styles.createAccountText}>Dont have an account?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    marginTop: 50,
    padding: 20
  },
  createAccountView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1
  },
  createAccountText: {
    color: constants.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    color: constants.colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20
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
