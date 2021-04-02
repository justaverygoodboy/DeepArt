<template>
  <div class="index">
      <hello class="welcome"/>
      <div class="logo">DeepArt</div>
      <div class="container">
        <div class="login-container">
            <v-text-field 
              label="账号" 
              color="purple" 
              required id="user"
              v-model="user"
              ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
              label="密码"
              @click:append="show = !show"
            ></v-text-field>
            <my-btn id="login" @click.native="login">登录</my-btn>
        </div>
      </div>
  </div>
</template>

<script>
import Hello from '../components/Hello.vue'
import MyBtn from '../components/MyBtn'
export default {
    name: 'Login',
    components: { Hello,MyBtn },
    data() {
      return {
        user: '',
        password: '',
        show: false,
      }
    },
    methods: {
      login(){
        if(this.user === 'test' && this.password === '123'){
          console.log(this.user)
          console.log(this.password)
          this.$router.push({path:'/'})
        }
      }
    },
  }
</script>
<style scoped>
.index {
  width: 100vw;
  height: 80vh;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(40deg,#5000BE, #5c43ca, #e66465);
}
.welcome {
  position: absolute;
  left: -200px;
  transform: rotate(25deg);
}
.logo {
  font-size: 250px;
  color: gold;
  position: absolute;
  left: 150px;
  letter-spacing: 10px;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
}
.container {
  margin: 0 0 0 50vw;
  width: 450px;
  height: 350px;
  border-radius: 5%;
  box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.973)
}
.login-container {
  color: white;
  width: 210px;
  height: 210px;
}
.index {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
