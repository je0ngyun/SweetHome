import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    devices: [],
  },
  mutations: {
    successGetDevices(state, payload) {
      state.devices = payload.devices;
    },
    failGetDevices(payload) {
      console.log(payload);
    },
  },
  actions: {
    initDevices({ commit }) {
      axios
        .get(`http://localhost:80/device/regist?serial=9830`)
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
