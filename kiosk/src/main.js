import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import store from './store/store';

const env = require('./assets/env/env.json');

/*import io from 'socket.io-client';
const socket = io('http://localhost:80');
Vue.prototype.$socket = socket;*/
//socket.io 부분 병합시 주석제거

Vue.prototype.$axios = axios;
Vue.prototype.$serial = env.serial;
Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
