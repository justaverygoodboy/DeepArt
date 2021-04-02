import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const state = {
 logined: false,
 Loginedname: null,
 UserId: null,
}
var mutations={
 LOGIN(state,user) {
  // 登录
  // 先让登录状态变为登录了
  // 若只是改变state里的值，在强制刷新后会丢失，数据添加到sessionStorage里
  sessionStorage.setItem("Loginedname", user.Loginedname)  
  sessionStorage.setItem("UserId", user.UserId)  
  sessionStorage.setItem("logined", true) 
  state.Loginedname = user.Loginedname
  state.UserId = user.UserId
  state.logined = true
 },
 // 登出
 LOGOUT (state) {
  // 这个同理
  sessionStorage.removeItem("Loginedname")
  sessionStorage.removeItem("UserId")  
  sessionStorage.removeItem("logined")
  state.Loginedname = ''
  state.UserId = ''
  state.logined = false
 }
}
var getters={
  isLogin (state) {
      if (!state.logined) {    
          state.logined=sessionStorage.getItem('logined');   //从sessionStorage中读取状态
          state.Loginedname=sessionStorage.getItem('Loginedname');
          state.UserId=sessionStorage.getItem('UserId');
      }
      return state.logined
  }
}
export default new Vuex.Store({
 getters,
 state,
 mutations
})