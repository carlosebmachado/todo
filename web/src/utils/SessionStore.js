class Login {
  static async signin({ username, token }) {
    localStorage.setItem('@todo/username', username);
    localStorage.setItem('@todo/token', token);
  }
  static async isConnected() {
    return localStorage.getItem('@todo/username') !== null && localStorage.getItem('@todo/token') !== null;
  }
  static async getData() {
    return {
      username: localStorage.getItem('@todo/username'),
      token: localStorage.getItem('@todo/token')
    };
  }
  static async signout() {
    localStorage.removeItem('@todo/username');
    localStorage.removeItem('@todo/token');
  }
}

export default Login;
