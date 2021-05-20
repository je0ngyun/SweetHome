import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import store from './store/store';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Moment from 'moment';
import { longClickDirective } from 'vue-long-click';
import { library as faLibrary } from '@fortawesome/fontawesome-svg-core';
import {
  faTrash,
  faInfoCircle,
  faRedoAlt,
  faPowerOff,
  faSun,
  faCloudSun,
  faCloud,
  faCloudMeatball,
  faCloudSunRain,
  faCloudShowersHeavy,
  faPooStorm,
  faSnowflake,
  faSmog,
  faSpinner,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import io from 'socket.io-client';
const env = require('./assets/env/env.json');

faLibrary.add(
  faTrash,
  faInfoCircle,
  faRedoAlt,
  faPowerOff,
  faSun,
  faCloudSun,
  faCloud,
  faCloudMeatball,
  faCloudSunRain,
  faCloudShowersHeavy,
  faPooStorm,
  faSnowflake,
  faSmog,
  faSpinner,
  faCog,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const longClickInstance = longClickDirective({ delay: 400, interval: 100000 });
Vue.directive('longclick', longClickInstance);

const socket = io(`${env.defaultURL}`);
Vue.prototype.$socket = socket;
Vue.prototype.$env = env;
Vue.prototype.$moment = Moment;
Vue.prototype.$axios = axios;
Vue.prototype.$serial = env.serial;
Vue.prototype.$defaultURL = env.defaultURL;
Vue.prototype.$weatherURL = env.weatherURL;
Vue.prototype.$apiKey = env.apiKey;
Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
