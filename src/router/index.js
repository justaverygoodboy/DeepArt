import Router from 'vue-router'
import Vue from 'vue'
import Login from "../views/Login"
import Main from "../views/Main"
import colorization from '../views/Colorization'
import Comics from '../views/Comics'
import Style from '../views/StyleTransfer'
import SR from '../views/SR'
import Deblur from '../views/Deblur'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
    {
        path: '/',
        name: 'main',
        component: Main
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/colorization',
      name: 'colorization',
      component: colorization
    },
    {
      path: '/comics',
      name: 'comics',
      component: Comics
    },
    {
      path: '/style',
      name: 'style',
      component: Style
    },
    {
      path: '/sr',
      name: 'SR',
      component: SR
    },
    {
      path: '/deblur',
      name: 'deblur',
      component: Deblur
    },
  ]
})