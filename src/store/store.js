import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    headerKey: 0
  },
  mutations:{
    updateKey(state){
      state.headerKey ++
    }
  }
})