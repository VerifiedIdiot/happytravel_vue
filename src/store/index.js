// src/store/index.js
import { createStore } from 'vuex';
// 데이터 유지를 위해 import
import createPersistedState from 'vuex-persistedstate';

import { getMyPageUserInfo, getNotices, getAttendance, getLeaveTravel } from '@/api/mypage/MyPageApi';

export default createStore({
  state: {
    loginInfo: {
      empId: '',
      empName: '',
      deptCode: '',
      posCode: '',
    },
    userDetails: null,
    notifications: [],
    attendance: null,
    salary: null,
    leaveTravel: null,
    departments: [],
    positions: [],
  },
  getters: {
    isAuthenticated(state) {
      return !!state.loginInfo.empId;
    },
    getLoginInfo(state) {
      return state.loginInfo;
    },
    getDeptName: (state) => (deptCode) => {
      const dept = state.departments.find((d) => d.deptCode === deptCode);
      return dept ? dept.deptName : '';
    },
    getPosName: (state) => (posCode) => {
      const pos = state.positions.find((p) => p.posCode === posCode);
      return pos ? pos.posName : '';
    },
  },
  mutations: {
    setLoginInfo(state, loginInfo) {
      state.loginInfo = loginInfo;
    },
    setLogout(state) {
      state.loginInfo = {
        empId: '',
        empName: '',
        deptCode: '',
        posCode: '',
      };
    },
    setUserDetails(state, userDetails) {
      state.userDetails = userDetails;
    },
    setNotifications(state, notifications) {
      state.notifications = notifications;
    },
    setAttendance(state, attendance) {
      state.attendance = attendance;
    },
    setLeaveTravel(state, leaveTravel) {
      state.leaveTravel = leaveTravel;
    },
    setDepartments(state, departments) {
      state.departments = departments;
    },
    setPositions(state, positions) {
      state.positions = positions;
    },
  },
  actions: {
    async fetchAllData({ commit, state }) {
      try {
        const empId = state.loginInfo.empId;
        const deptCode = state.loginInfo.deptCode;

        // 현재 날짜 계산
        const todayfomat = new Date();
        const yyyy = todayfomat.getFullYear();
        const mm = String(todayfomat.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const dd = String(todayfomat.getDate()).padStart(2, '0');
        const today = `${yyyy}-${mm}-${dd}`; // 날짜 형식을 "YYYY-MM-DD"로 변경

        // 유저 정보 조회
        if (!state.userDetails) {
          const userDetails = await getMyPageUserInfo(empId);
          commit('setUserDetails', userDetails);
        }
        // 공지사항 리스트 조회
        if (state.notifications.length === 0) {
          const notifications = await getNotices(deptCode);
          console.log('Fetched notifications: ', notifications);
          commit('setNotifications', notifications);
        }
        // 출퇴근 조회
        if (!state.attendance) {
          const attendance = await getAttendance(empId, today);
          console.log('attendance: ', attendance);
          commit('setAttendance', attendance);
        }
        // 근태 신청 조회
        if (!state.leaveTravel) {
          const leaveTravel = await getLeaveTravel(empId);
          console.log('leaveTravel: ', leaveTravel);
          commit('setLeaveTravel', leaveTravel);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  plugins: [
    createPersistedState({
      key: 'vuex-session',
      storage: window.sessionStorage, 
      paths: ['loginInfo'], 
    }),
    createPersistedState({
      key: 'vuex',
      storage: window.localStorage, 
      paths: ['loginInfo'], 
    }),
  ],
});
