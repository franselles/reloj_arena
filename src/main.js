import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';

import axios from 'axios';
import VueAxios from 'vue-axios';

// const baseURL = 'http://localhost:8080/api/';
const baseURL = '/api/';

axios.defaults.baseURL = baseURL;
axios.defaults.json = true;
Vue.use(VueAxios, axios);

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
