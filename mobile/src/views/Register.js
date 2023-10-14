import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from 'react-native';

import api from '../services/api';
import constants from '../constants';
import SessionStore from '../services/SessionStore';
import Header from '../components/Header';


export default function Login(props) {
  const refUserameTextInput = useRef(null);
  const refPasswordTextInput = useRef(null);
  const [isBusy, setIsBusy] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  async function onSigninClick() {
    if (!displayName) {
      ToastAndroid.showWithGravity(
        'You need to enter a display name.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }
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
      const response = await api('').post('/auth/register', {
        name: displayName,
        username,
        password
      });
      await SessionStore.signin({
        userId: response.data.userId,
        username: username,
        name: displayName,
        token: response.data.token
      });
      setIsConnected(true);
    } catch (error) {
      ToastAndroid.showWithGravity(
        'An error occurred while trying to register.',
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
          {isBusy && <ActivityIndicator color={constants.colors.primary} size={50} />}
          <Text style={styles.title}>REGISTER</Text>
          <Text style={styles.label}>Display name</Text>
          <TextInput value={displayName} onChangeText={setDisplayName} placeholder={'display name...'} style={styles.input} onSubmitEditing={() => refUserameTextInput.current.focus()} autoFocus={true} blurOnSubmit={false} />
          <Text style={styles.label}>Username</Text>
          <TextInput value={username} onChangeText={setUsername} placeholder={'username...'} style={styles.input} onSubmitEditing={() => refPasswordTextInput.current.focus()} ref={refUserameTextInput} blurOnSubmit={false} />
          <Text style={styles.label}>Password</Text>
          <TextInput value={password} onChangeText={setPassword} placeholder={'password...'} style={[styles.input, { marginBottom: 40 }]} secureTextEntry={true} ref={refPasswordTextInput} />
          <Button title="Register" onPress={onSigninClick} color={constants.colors.primary} />
          <View style={styles.signinView}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <Text style={styles.signinText}>Already have an account?</Text>
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
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    marginTop: 50,
    padding: 20
  },
  signinView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1
  },
  signinText: {
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
