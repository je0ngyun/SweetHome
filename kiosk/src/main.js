import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import store from './store/store';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import { library as faLibrary } from '@fortawesome/fontawesome-svg-core';
import { faHome, faSearch, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

faLibrary.add(faHome, faSearch, faRedoAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

/*import io from 'socket.io-client';
const socket = io('http://localhost:80');
Vue.prototype.$socket = socket;*/
//socket.io 부분 병합시 주석제거
const env = require('./assets/env/env.json');
Vue.prototype.$axios = axios;
Vue.prototype.$serial = env.serial;
Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
