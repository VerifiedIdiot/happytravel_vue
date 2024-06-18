import axios from 'axios';

const API_URL = '/auth';

class AuthApi {
  static login(username, password) {
    return axios.post(`${API_URL}/login`, { username, password });
  }

  static logout() {
    return axios.post(`${API_URL}/logout`);
  }
}

export default AuthApi;
