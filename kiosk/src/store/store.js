import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
const env = require('../assets/env/env.json');
export default new Vuex.Store({
  state: {
    devices: [],
  },
  mutations: {
    successGetDevices(state, payload) {
      state.devices = payload.devices;
    },
    failGetDevices() {
      console.log('서버연결 실패');
    },
  },
  actions: {
    initDevices({ commit }) {
      axios
        .get(`http://localhost:80/device/regist?serial=${env.serial}`)
        .then((res) => {
          commit('successGetDevices', res.data);
        })
        .catch((res) => {
          commit('failGetDevices', res);
        });
    },
  },
  getters: {
    devices(state) {
      return state.devices;
    },
  },
  modules: {},
});
