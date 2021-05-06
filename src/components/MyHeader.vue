<template>
  <header>
      <router-link tag="div" id="logo" class="funcItem" :to="{path:'/'}">DEEPART.</router-link>
      <nav>
          <div id="products" @mouseleave="productLeave()" @mouseover="productShow()" class="nav-items">
              功能
              <transition name="slide-fade">
              <div ref="product" class="nitems" v-if="product">
                  <router-link class="funcItem" :to="{path:'colorization'}">AI彩色化</router-link>
                  <router-link class="funcItem" :to="{path:'comics'}">头像卡通化</router-link>
                  <router-link class="funcItem" :to="{path:'sr'}">超分辨率重建</router-link>
                  <router-link class="funcItem" :to="{path:'style'}">图像风格迁移</router-link>
                  <router-link class="funcItem" :to="{path:'enhance'}">图像增强</router-link>
              </div>
              </transition>
          </div>
          <div class="nav-items" @click="tips">关于我们</div>
          <div class="nav-items" @click="tips">下载</div>
      </nav>
    <router-link v-if="user.username === undefined" tag="button" class="login" :to="{path:'login'}">LOGIN</router-link>
    <div v-else class="profile" @mouseover="detailShow()">
        <img class="user" :src="user.avatar"/>
    </div>
    <div v-if="detail" class="userDetail" @mouseleave="detailLeave()">
        <div class="tri"></div>
        <div class="account">
            <div class="username">你好,<span>{{user.username}}</span></div>
            <div class="user-content">
                <div class="personal user-item" @click="tips"><svg class="Zi Zi--Profile" fill="currentColor" viewBox="0 0 24 24" width="22" height="22"><path d="M15.417 12.923c-.376.653-.837 1.281-.763 1.863.292 2.273 5.562 1.77 6.78 3.048.566.595.566.664.566 4.164-6.611-.07-13.363 0-20 0 .027-3.5 0-3.478.62-4.164 1.303-1.44 6.581-.715 6.78-3.133.045-.545-.38-1.114-.763-1.778C6.511 9.233 5.697 2 12 2s5.422 7.443 3.417 10.923z" fill-rule="evenodd"></path></svg> 个人中心</div>
                <div class="logout user-item" @click="logout()"><svg class="Zi Zi--Logout" fill="currentColor" viewBox="0 0 24 24" width="22" height="22"><path d="M2 11.999c0-2.756 1.154-5.417 3.167-7.3a1.266 1.266 0 0 1 1.73 1.847 7.396 7.396 0 0 0-2.367 5.453c0 4.119 3.35 7.47 7.47 7.47 4.119 0 7.47-3.351 7.47-7.47a7.41 7.41 0 0 0-2.279-5.37 1.266 1.266 0 0 1 1.76-1.819A9.923 9.923 0 0 1 22 12c0 5.513-4.486 10-10 10s-10-4.487-10-10zm8.699-.482V3.26a1.26 1.26 0 1 1 2.52 0v8.257a1.26 1.26 0 1 1-2.52 0z" fill-rule="evenodd"></path></svg> 登出</div>
            </div>
        </div>
    </div>
  </header>
</template>

<script>
export default {
    name:'MyHeader',
    data() {
        return {
            product: false,
            username: '',
            detail: false,
            token: '',
            user: {},
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
        },
        detailShow(){
            this.detail = true
        },
        detailLeave(){
            if (this.detail) {
                this.detail = false
            }
        },
        logout() {
            window.localStorage.removeItem('token')
            this.user = {}
            console.log(this.user.username)
            this.detail = false
        },
        validToken(token){
            this.$axios.get(this.$api.userUrl+'/api/user',{
                headers:{
                    Authorization: token
                }
            }).then((res)=>{
                this.user = res.data
                if (this.user.msg) //token失效，重新登录
                    this.$router.push({path:'/login'})
            })
        },
        tips() {
            this.$message.error('暂未开放，敬请期待噢~')
        }
    },
    mounted(){
        this.token = window.localStorage.getItem('token')
        this.validToken(this.token)
    }
}
</script>

<style>
@media screen and (max-width:450px) {
    .nav-items:nth-child(2){
        display: none!important;
    }
    .nav-items:nth-child(3){
        display: none!important;
    }
    .user{
        width: 45px!important;
        height: 45px!important;
    }
}
@media screen and (max-width:816px) {
    #logo {
        display: none;
    }
    .login {
        width: 70px!important;
    }
    nav {
        position: absolute;
        left: 20px;
    }
    .nav-items {
        width: 110px!important;
    }
}
nav {
    color: #fff;
    font-size: 18px;
}
.nitems {
    display: none;
}
.profile {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.user-content{
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
}
.user {
    cursor: pointer;
    display: flex;
    justify-content: center;
    position: absolute;
    right: 40px;
    background: #2E64FE;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    font-size: 46px;
    font-weight: 800;
    letter-spacing: 2px;
    outline: none;
}
.user-item:hover {
    background:#DBEAFE;
}
.user:hover {
    background: gold;
    color: purple;
    transition: all 0.3s;
    font-weight: 600;
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
    margin-top: 300px;
    font-weight: 600;
    font-size: 10px;
    border-radius: 0 0 10px 10px;
}
.funcItem {
    color: black;
    margin: 10px 0 5px 15px;
    text-decoration: none;
    font-size: 18px;
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
    color: #fff;
}
.login:hover {
    background: gold;
    color: purple;
    transition: all 0.3s;
    font-weight: 600;
}
.userDetail {
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 150px;
    position: absolute;
    right: 0;
    top: 80px;
    border-radius: 1%;
}
.balance {
    color: black;
    font-size: 22px;
    margin:10px 0 0 15px;
}
.logout {
    color: #2E64FE;
    font-size: 22px;
    cursor: pointer;
    text-align: center;
    padding: 5px 44px 5px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.logout:hover {
    color: #1a4fc0
}
.account {
    width: 100%;
    height: 120px;
    background: #fff;
    border-radius: 3%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.user-item {
    display: flex;
    align-items: center;
    justify-content: center;
}
.user-item svg {
    margin-right:8px;
}
.username {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 100%;
    font-size: 20px;
    padding: 6px 0 5px 18px;
}
.username span {
    font-weight: 600;
    margin-left: 5px;
}
.personal {
    color: #2E64FE;
    font-size: 22px;
    padding:5px 0 5px 0px;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.tri {
    width: 0;
    height: 0;
    border-width: 0 10px 10px;
    border-style: solid;
    border-color: transparent transparent #fff;
}
</style>