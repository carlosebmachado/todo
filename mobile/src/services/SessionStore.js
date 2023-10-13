import * as SecureStore from 'expo-secure-store';


class Login {
  static async signin({ userId, username, name, token }) {
    await SecureStore.setItemAsync('@todo/userId', userId);
    await SecureStore.setItemAsync('@todo/username', username);
    await SecureStore.setItemAsync('@todo/name', name);
    await SecureStore.setItemAsync('@todo/token', token);
  }
  static async isConnected() {
    return await SecureStore.getItemAsync('@todo/token') !== null;
  }
  static async getData() {
    var userId = await SecureStore.getItemAsync('@todo/userId');
    var username = await SecureStore.getItemAsync('@todo/username');
    var name = await SecureStore.getItemAsync('@todo/name');
    var token = await SecureStore.getItemAsync('@todo/token');
    return { userId, username, name, token };
  }
  static async signout() {
    await SecureStore.deleteItemAsync('@todo/userId');
    await SecureStore.deleteItemAsync('@todo/username');
    await SecureStore.deleteItemAsync('@todo/name');
    await SecureStore.deleteItemAsync('@todo/token');
  }
}

export default Login;
