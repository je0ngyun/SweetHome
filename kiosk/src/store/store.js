import Vue from 'vue';
import Vuex from 'vuex';
import isEmpty from 'is-empty';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    btnThemes: [],
    cardThemes: [],
  },
  getters: {
    getBtnTheme: (state) => (id) => {
      return state.btnThemes[id];
    },
    getCardTheme: (state) => (id) => {
      return state.cardThemes[id];
    },
  },
  mutations: {
    setBtnTheme(state, payload) {
      state.btnThemes.splice(payload.index, 1, payload.theme);
    },
    setCardTheme(state, payload) {
      state.cardThemes.splice(payload.index, 1, payload.theme);
    },
    initTheme(state, payload) {
      for (let i = 0; i < payload.numOfDevices; i++) {
        if (isEmpty(state.btnThemes[i])) {
          state.btnThemes[i] = {
            is_on: { color: '#4aba68', transition: 'all ease 1s 0s' },
            is_off: { color: '#ececec', transition: 'all ease 1s 0s' },
          };
          state.cardThemes[i] = { background: '#ffffff', color: '#000000' };
        }
      }
    },
  },
  actions: {},
});
