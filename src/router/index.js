import Router from 'vue-router'
import Vue from 'vue'
const Main = () => import('../views/Main')
const Login = () => import('../views/Login')
const Profile = () => import('../views/Profile')
const Colorization = () => import('../views/Colorization')
const Comics = () => import('../views/Comics')
const StyleTransfer = () => import('../views/StyleTransfer')
const SR = () => import('../views/SR')
const Enhance = () => import('../views/Enhance')
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
    {
        path: '/',
        redirect: '/home',
        name: '主页',
    },
    {
      path: '/home',
      name: 'home',
      component: Main
    },
    {
      path:'/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/colorization',
      name: 'colorization',
      component: Colorization
    },
    {
      path: '/comics',
      name: 'comics',
      component: Comics
    },
    {
      path: '/style',
      name: 'style',
      component: StyleTransfer
    },
    {
      path: '/sr',
      name: 'SR',
      component: SR
    },
    {
      path: '/enhance',
      name: 'enhance',
      component: Enhance
    },
  ]
})