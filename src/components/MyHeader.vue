<template>
  <header>
      <router-link tag="div" id="logo" class="funcItem" :to="{path:'/'}">DEEPART.</router-link>
      <nav>
          <div id="products" @mouseleave="productLeave()" @mouseover="productShow()" class="nav-items">
              功能
              <transition name="slide-fade">
              <div ref="product" class="nitems" v-if="product">
                  <router-link class="funcItem" :to="{path:'deblur'}">图像去噪</router-link>
                  <router-link class="funcItem" :to="{path:'colorization'}">图像彩色化</router-link>
                  <router-link class="funcItem" :to="{path:'comics'}">头像漫画化</router-link>
                  <router-link class="funcItem" :to="{path:'sr'}">超分辨率重建</router-link>
                  <router-link class="funcItem" :to="{path:'style'}">图像风格迁移</router-link>
              </div>
              </transition>
          </div>
          <div class="nav-items">关于我们</div>
      </nav>
      <router-link tag="button" class="login" :to="{path:'login'}">LOGIN</router-link>
  </header>
</template>

<script>
export default {
    name:'MyHeader',
    data() {
        return {
            product: false,
        }
    },
    methods: {
        productShow(){
            let show = this.product
            if(show === false)
                this.product = !show
        },
        productLeave(){
            let show = this.product
            if(show === true)
                this.product = !show
        }
    }
}
</script>

<style>
* {
    color: white;
    font-size: 18px;
}
.nitems {
    display: none;
}
#logo {
    font-family: 'Courier New', Courier, monospace;
    font-size: 32px;
    letter-spacing: 3px;
    font-weight: 900;
    cursor: pointer;
    left: 50px;
    position: absolute;
    color: white;
}
header {
    width: 100vw;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    user-select: none;
}
nav {
    display: flex;
}
.slide-fade-enter-active {
  transition: all .1s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.nitems {
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background: white;
    height: 220px;
    width: 160px;
    position: absolute;
    margin-top: 250px;
    font-weight: 600;
    font-size: 10px;
    border-radius: 0 0 10px 10px;
}
.funcItem {
    color: black;
    margin: 10px 0 5px 15px;
    text-decoration: none;
}
.funcItem:hover {
    color: #2E64FE;
}
.nav-items {
    cursor: pointer;
    margin: 2px 0 2px 0;
    height: 80px;
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 3px;
}
.nav-items:hover{
    background:linear-gradient(#1a4fc0,#1452fc, #1a5ae2,#1a5be6);
}
.login {
    position: absolute;
    right: 20px;
    background: #2E64FE;
    width: 7vw;
    height: 55px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 2px;
    outline: none;
}
.login:hover {
    background: gold;
    color: purple;
    transition: all 0.3s;
    font-weight: 600;
}
</style>