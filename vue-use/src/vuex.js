import Vue from 'vue';
import KVuex from './kvuex';

Vue.use(KVuex);

const store = new KVuex.Store({
  state: {
    username: '',
    password: '',
  },
  mutations: {
    SetUserName: (state, value) => {
      state.username = value;
    },
    SetPassword: (state, value) => {
      state.password = value
    }
  },
  actions: {
    SetUserName: ({commit}, value) => {
      commit('SetUserName', value)
    }
  },
  getters: {
    token: () => {
      return '123321999'
    }
  }
})

export default store;