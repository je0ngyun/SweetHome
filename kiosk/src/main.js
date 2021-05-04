import Vue from 'vue';
import App from './App.vue';
import io from 'socket.io-client';
import axios from 'axios';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

const socket = io('http://localhost:80');
Vue.prototype.$socket = socket;
Vue.prototype.$axios = axios;
Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
