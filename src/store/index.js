import { createStore } from 'vuex';

export default createStore({
  state: {
    loginInfo: JSON.parse(sessionStorage.getItem('loginInfo')) || null,
  },
  getters: {
    getLoginInfo(state) {
      return state.loginInfo;
    },
  },
  mutations: {
    setLoginInfo(state, payload) {
      state.loginInfo = payload;
      sessionStorage.setItem('loginInfo', JSON.stringify(payload));
    },
    setLogout(state) {
      state.loginInfo = null;
      sessionStorage.removeItem('loginInfo');
    },
  },
  actions: {},
  modules: {},
});