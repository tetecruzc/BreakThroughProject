import Vue from 'vue'
import Vuex from 'vuex'
import users from '@/store/users/users';
import profiles from '@/store/profiles/profiles';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users,
    profiles
  }
})
