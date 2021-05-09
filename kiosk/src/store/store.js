import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const publicIp = require('public-ip');

export default new Vuex.Store({
  state: {
    ip: null,
  },
  mutations: {
    successGetIp(state, payload) {
      console.log(payload);
      state.ip = payload + '';
    },
    failGetIp() {
      console.log('Ip 불러오기 실패');
    },
  },
  actions: {
    getIp({ commit }) {
      publicIp
        .v4()
        .then((ip) => {
          commit('successGetIp', ip);
        })
        .catch(() => {
          commit('failGetIp');
        });
    },
  },
});
