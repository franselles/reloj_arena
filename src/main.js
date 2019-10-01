import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import axios from 'axios';
import VueAxios from 'vue-axios';

// const baseURL = 'http://localhost:8080/api/';
const baseURL = '/api/';

axios.defaults.baseURL = baseURL;
axios.defaults.json = true;
Vue.use(VueAxios, axios);

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
