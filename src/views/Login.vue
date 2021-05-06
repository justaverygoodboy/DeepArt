<template>
  <div class="index">
      <hello class="welcome"/>
      <div class="logo">DeepArt</div>
      <div class="container">
        <div v-if="!register">
          <div class="login-container">
            <v-text-field
              label="邮箱" 
              color="purple" 
              required id="email"
              v-model="email"
              :error-messages = "emerr"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
              label="密码"
              :error-messages = "pderr"
              @click:append="show = !show"
            ></v-text-field>
            <my-btn id="login" @click.native="login" :disabled="logining">{{logState}}</my-btn>
          </div>
          <div class="regi_forg">
            <div @click="registerUser" class="register">注册用户</div>
            <div @click="tips" class="forget">忘记密码</div>
          </div>
        </div>
        <div v-else class="reg-content">
          <div class="return" @click="returnLogin">
            返回
          </div>
          <v-text-field 
            label="用户名" 
            color="purple" 
            required id="username"
            v-model="username"
            :error-messages = "unerr"
          ></v-text-field>
          <v-text-field 
            label="邮箱" 
            color="purple" 
            required id="email"
            v-model="email"
            :error-messages = "remerr"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="密码"
            @click:append="show = !show"
            :error-messages = "rpderr"
          ></v-text-field>
          <my-btn id="register" @click.native="regi">注册</my-btn>
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
        email: '',
        username: '',
        register: false,
        password: '',
        show: false,
        emerr: '',
        pderr: '',
        remerr: '',
        rpderr: '',
        unerr:'',
        logState:'登录',
        logining: false
      }
    },
    methods: {
      login(){
        if(this.email !== '' && this.password !== ''){
          this.logState = '登陆中...'
          this.logining = true
          this.$axios.post(this.$api.userUrl+'/api/token',{
            email:this.email,
            password:this.password
          }).then((res)=>{
            if(res.data.msg){
              this.pderr = '密码错误'
              this.logState = '登陆'
              this.logining = false
              setTimeout(()=>{this.pderr=''},1000)
              return
            }
            let token = res.data.token
            window.localStorage.setItem('token',token)
            this.$axios.get(this.$api.userUrl+'/api/login',{
              headers:{
                Authorization:token
              }
            }).then((res)=>{
              if (res.data.msg !== "invalid" || res.data.msg !== "expired"){
                this.$store.commit('updateKey')
                this.$router.push({path:'/home'})
              }
            }).catch(()=>{
              this.logState = '登陆'
              this.logining = false
              this.$message.error('啊欧，服务器开小差去了')})
          }).catch(()=>{
            this.logState = '登陆'
            this.logining = false 
            this.$message.error('啊欧，服务器开小差去了')})
        }
        else if(this.email === ''){
          this.emerr = '邮箱为空'
          setTimeout(()=>{this.emerr=''},1000)
        }else if(this.password === ''){
          this.pderr = '密码为空'
          setTimeout(()=>{this.pderr=''},1000)
        }
      },
      regi(){
        if(this.email!==''&&this.password!==''&&this.username!==''){
          this.$axios.post(this.$api.userUrl+'/api/register',{
            username:this.username,
            password:this.password,
            email:this.email
          }).then((res)=>{
            if(res.data.msg === "success"){
              this.returnLogin()      
            }else{
              this.remerr = '邮箱已经被注册'
              setTimeout(()=>{this.remerr=''},1000)
            }
          })
        }
        else if (this.username===''){
          this.unerr = '用户名为空'
          setTimeout(()=>{this.unerr=''},1000)
        }
        else if (this.email === ''){
          this.remerr = '邮箱为空'
          setTimeout(()=>{this.remerr=''},1000)
        }else {
          this.rpderr = '密码为空'
          setTimeout(()=>{this.rpderr=''},1000)
        }
      },
      registerUser(){
        this.register = true
      },
      returnLogin(){
        this.register = false
      },
      tips(){
        this.$message.error('哈哈，还没做这个功能，请期待~')
      }
    },
  }
</script>
<style scoped>
@media screen and (max-width:1600px) {
  .index {
    display: flex !important;
    align-items: center;
    justify-content: center;
    flex-direction: column !important;
  }
  .welcome {
    display: none;
  }
  .logo{
    font-size: 100px !important;
    top: 25%;
    left: 42% !important;
    margin-top:-100px;
    margin-left:-100px;
  }
  .container {
    margin:0 !important;
  }
}
@media screen and (max-width:550px){
  .logo {
    font-size: 48px!important;
    left:42%!important;
  }
}
.v-messages {
  color: red!important;
  font-size: 16px!important;
}
.v-messages__message {
  color: red!important;
  font-size: 16px!important;
}
.index {
  width: 100vw;
  height: 80vh;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(40deg,#5000BE, #5c43ca, #e66465);
}
.alert {
  color: red;
  z-index: 3;
}
.reg-content {
  position: relative;
  margin-top: 30px;
}
.welcome {
  position: absolute;
  left: -200px;
  transform: rotate(25deg);
}
.regi_forg {
  display: flex;
  width: 100%;
  margin-top: 20px;
  justify-content: space-around;
}
.register {
  color: #5000BE;
  font-size: 14px;
  cursor: pointer;
}
.forget {
  color: #5000BE;
  font-size: 14px;
  cursor: pointer;
}
.return {
  color: #5000BE;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 10px;
  position: absolute;
  top:-30px;
  left:-80px;  
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
  width: 420px;
  height: 350px;
  border-radius: 5%;
  box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
