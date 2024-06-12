import { getFlightList, updateFlight, addFlight } from '@/api/sales/FlightApi';

const state = {
  flights: [],
  empId: sessionStorage.getItem('loginInfo') ? JSON.parse(sessionStorage.getItem('loginInfo')).empId : 'EMP30002',
};

const getters = {
  flights: (state) => state.flights,
  empId: (state) => state.empId,
};

const mutations = {
  setFlights(state, flights) {
    state.flights = flights;
  },
  updateFlight(state, updatedFlight) {
    const index = state.flights.findIndex(f => f.flight_code === updatedFlight.flight_code);
    if (index !== -1) {
      state.flights.splice(index, 1, updatedFlight);
    }
  },
  addFlight(state, newFlight) {
    state.flights.push(newFlight);
  },
};

const actions = {
  async fetchFlights({ commit, state }) {
    try {
      const params = { empId: state.empId };
      const data = await getFlightList(params);
      commit('setFlights', data);
    } catch (error) {
      console.error('Error fetching flight list:', error);
    }
  },
  async updateFlight({ commit }, flight) {
    try {
      await updateFlight(flight.flight_code, flight);
      commit('updateFlight', flight);
    } catch (error) {
      console.error('Error updating flight:', error);
    }
  },
  async addFlight({ commit, state }, flight) {
    try {
      await addFlight(state.empId, flight);
      commit('addFlight', flight);
    } catch (error) {
      console.error('Error adding flight:', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
