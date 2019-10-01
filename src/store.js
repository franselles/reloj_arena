import Vue from 'vue';
import Vuex from 'vuex';

import horarioStore from './modules/horario.store.js';
import loginStore from './modules/login.store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    horarioStore,
    loginStore
  }
});
