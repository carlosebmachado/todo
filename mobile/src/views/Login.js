import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TextInput } from 'react-native';

// import api from '../services/api';
import constants from '../constants';
// import SessionStore from '../services/SessionStore';
import Header from '../components/Header';


export default function Login() {
  const [isBusy, setIsBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectHome, setRedirectHome] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  async function onSigninClick() {
    if (!username) {
      // setErrorMessage('You need to enter your username.');
      setTimeout(() => {
        setErrorMessage('');
      }, errorMessageTimeout);
      return;
    }
    if (!password) {
      // setErrorMessage('You need to enter your password.');
      setTimeout(() => {
        setErrorMessage('');
      }, errorMessageTimeout);
      return;
    }

    setIsBusy(true);

    try {
      // const response = await api('').post('/auth/login', {
      //   username,
      //   password
      // });
      // await SessionStore.signin({
      //   userId: response.data.userId,
      //   username: username,
      //   name: response.data.name,
      //   token: response.data.token
      // });
      setIsConnected(true);
    } catch (error) {
      // setErrorMessage('Wrong username or password.');
      setTimeout(() => {
        setErrorMessage('');
      }, errorMessageTimeout);
      return;
    }

    setIsBusy(false);
  }

  useEffect(() => {
    // if (isConnected) {
    //   setRedirectHome(true);
    // }

    // if (!isConnected) {
    //   SessionStore.getData()
    //     .then(response => {
    //       if (response.token) {
    //         setRedirectHome(true);
    //       }
    //     });
    // }

  }, [isConnected]);

  return (
    <>
      <Header />
      <View style={styles.container}>
        { isBusy && <ActivityIndicator color={constants.colors.primary} size={50} />}
        <View style={styles.content}>
          <Text style={[styles.title, styles.alignSelfCenter]}>LOGIN</Text>
          <View>
            <TextInput style={styles.input} maxLength={30} placeholder={'username...'} />
            <TextInput style={[styles.input, {marginBottom:40}]} maxLength={30} placeholder={'password...'} />
              <Button title="Sign in" onPress={onSigninClick} color={constants.colors.primary} />
            <Text style={[styles.alignSelfCenter, {marginTop:50}]}>Don't have an account?</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    marginTop: 50,
    padding: 20
  },
  content: {
    display: 'flex',
    flexDirection: 'column'
  },

  alignSelfCenter: {
    alignSelf: 'center'
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


// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// export const Content = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   h1 {
//     margin-top: 20%;
//     margin-bottom: 30px;
//     color: ${constants.colors.primary};
//     font-weight: lighter;
//     font-size: 1.8rem;
//   }
// `;

// export const UserDataWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   small {
//     text-transform: uppercase;
//     font-weight: bold;
//     color: ${constants.colors.primary};
//   }

//   input {
//     margin-top: 10px;
//     font-size: 1.2rem;
//     padding: 10px;
//     border: none;
//     color: #414141;
//     border-bottom: 1px solid ${constants.colors.primary};
//     border-radius: 8px;
    
//     &:focus {
//       outline: none;
//       border-bottom: 2px solid ${constants.colors.primary};
//     }

//     &:last-of-type {
//       margin-bottom: 20px;
//     }
//   }

//   a {
//     color: ${constants.colors.primary};
//     text-decoration: none;
//     margin-top: 20px;
//   }

//   button {
//     font-weight: bold;
//     background-color: ${constants.colors.primary};
//     color: white;
//     font-size: 1.2rem;
//     padding: 10px;
//     border-radius: 30px;
//     cursor: pointer;
//     margin-top: 10px;
//     border: none;
//     width: 100%;
//     text-transform: uppercase;

//     &:hover {
//       background-color: ${constants.colors.secondary};
//     }
//   }
// `;
