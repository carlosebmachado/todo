import * as SecureStore from 'expo-secure-store';


class Login {
  static prefix = 'todo';
  static separator = '.';
  static userId = 'userId';
  static username = 'username';
  static name = 'name';
  static token = 'token';
  static keyUserId = `${this.prefix}${this.separator}${this.userId}`;
  static keyUsername = `${this.prefix}${this.separator}${this.username}`;
  static keyName = `${this.prefix}${this.separator}${this.name}`;
  static keyToken = `${this.prefix}${this.separator}${this.token}`;

  static async signin({ userId, username, name, token }) {
    await SecureStore.setItemAsync(this.keyUserId, userId);
    await SecureStore.setItemAsync(this.keyUsername, username);
    await SecureStore.setItemAsync(this.keyName, name);
    await SecureStore.setItemAsync(this.keyToken, token);
  }
  static async isConnected() {
    return await SecureStore.getItemAsync(this.keyToken) !== null;
  }
  static async getData() {
    var userId = await SecureStore.getItemAsync(this.keyUserId);
    var username = await SecureStore.getItemAsync(this.keyUsername);
    var name = await SecureStore.getItemAsync(this.keyName);
    var token = await SecureStore.getItemAsync(this.keyToken);
    return { userId, username, name, token };
  }
  static async signout() {
    await SecureStore.deleteItemAsync(this.keyUserId);
    await SecureStore.deleteItemAsync(this.keyUsername);
    await SecureStore.deleteItemAsync(this.keyName);
    await SecureStore.deleteItemAsync(this.keyToken);
  }
}

export default Login;
