class Login {
  static async signin({ userId, username, name, token }) {
    localStorage.setItem('@todo/userId', userId);
    localStorage.setItem('@todo/username', username);
    localStorage.setItem('@todo/name', name);
    localStorage.setItem('@todo/token', token);
  }
  static async isConnected() {
    return localStorage.getItem('@todo/token') !== null;
  }
  static async getData() {
    return {
      userId: localStorage.getItem('@todo/userId'),
      username: localStorage.getItem('@todo/username'),
      name: localStorage.getItem('@todo/name'),
      token: localStorage.getItem('@todo/token')
    };
  }
  static async signout() {
    localStorage.removeItem('@todo/userId');
    localStorage.removeItem('@todo/username');
    localStorage.removeItem('@todo/name');
    localStorage.removeItem('@todo/token');
  }
}

export default Login;
