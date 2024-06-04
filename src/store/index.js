import { createStore } from "vuex";

export default createStore({
  state: {
    loginInfo: JSON.parse(sessionStorage.getItem("loginInfo")) || null,
    user: {
      empId: "EMP30001",
      deptCode: "3000",
      empName: "변우석",
      posCode: "1000",
    },
  },
  getters: {
    getLoginInfo(state) {
      return state.loginInfo;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    setLoginInfo(state, payload) {
      state.loginInfo = payload;
      sessionStorage.setItem("loginInfo", JSON.stringify(payload));
    },
    setLogout(state) {
      state.loginInfo = null;
      sessionStorage.removeItem("loginInfo");
    },
  },
  actions: {},
  modules: {},
});
