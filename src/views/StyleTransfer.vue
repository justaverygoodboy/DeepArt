<template>
<div class="bg">
    <div class="func-title">赋予你的图像不同的风格</div>
    <div class="container-s">
      <div class="img-container">
        <p id="input-tag" style="margin-bottom: 20px;font-size:24px">输入图像</p>
        <div class="bigImg-div" v-loading="upLoading" id="upload" @click="toGetImg">
          <img class="bigImg" :src="upUrl" v-if="upUrl">
        </div>
      </div>
      <div class="styleChooser">
        <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          选择风格<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(style,index) in styles" :key=index :command="style.type">{{style.type}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
      <div class="style-container">
        <p id="style-tag" style="margin-bottom: 20px;font-size:24px">风格图像</p>
        <div class="bigImg-div" v-loading="styleLoading">
          <img class="bigImg" :src="styleUrl" v-if="styleUrl">
        </div>
      </div>
      <div class="func-btn">
        <my-btn @click.native="styleTransfer" :disabled="generating">{{generate}}</my-btn>
      </div>
      <div class="img-result">
        <p id="output-tag" style="margin-bottom: 20px;font-size:24px">输出图像</p>
        <div class="bigImg-div" v-loading="resLoading">
          <img class="bigImg" :src="resUrl" v-if="resUrl">
        </div>
        <down-img :downUrl="resUrl" :exist="resUrl"/>
      </div>
    </div>
</div>
</template>
<script>
let inputElement = null
import DownImg from '../components/DownImg'
import MyBtn from '../components/MyBtn'
export default {
    name:'style',
    components:{MyBtn,DownImg},
    data() {
      return {
        upUrl: '',
        resUrl: '',
        styleUrl: '',
        resLoading: false,
        upLoading: false,
        styleLoading: false,
        styles:[{"type":"candy","url":"https://i.loli.net/2021/05/02/iGCIP2jRm1E5UvD.jpg"},
                {"type":"cubist","url":"https://i.loli.net/2021/05/02/TSfNvrgZuP2mwDs.jpg"},
                {"type":"mosaic","url":"https://i.loli.net/2021/05/02/K3km6byhWTEP7lp.jpg"},
                {"type":"muse","url":"https://i.loli.net/2021/05/02/6CZJiOMRYH7hlFx.jpg"},
                {"type":"rain","url":"https://i.loli.net/2021/05/02/tm6ILMzJB5uQYHd.jpg"},
                {"type":"scream","url":"https://i.loli.net/2021/05/02/EkfxgUN3SAbqrnV.jpg"},
                {"type":"shipwreck","url":"https://i.loli.net/2021/05/02/AFZwQmsdUToHBIb.jpg"},
                {"type":"starry","url":"https://i.loli.net/2021/05/02/gGsnY6FQUXyzE3h.jpg"},
                {"type":"udnie","url":"https://i.loli.net/2021/05/02/D9IZb7FqTPWkraQ.jpg"},
                {"type":"wave","url":"https://i.loli.net/2021/05/02/TtOqNlYm9rZUsok.jpg"}],
        chooseStyle: '',
        generate: '生成',
        generating: false
      }
    },
    methods: {
      toGetImg() {
        if (inputElement === null) {
          inputElement = document.createElement('input')
          inputElement.setAttribute('type', 'file')
          inputElement.setAttribute('id','upImg')
          inputElement.style.display = 'none'
          if (window.addEventListener) {
            inputElement.addEventListener('change', this.uploadFile, false)
          } else {
            inputElement.attachEvent('onchange', this.uploadFile)
          }
          document.body.appendChild(inputElement)
          }
          inputElement.click()
      },
      uploadFile(el) {
        if (el && el.target && el.target.files && el.target.files.length > 0) {
          const files = el.target.files[0]
          el.target.id === 'upImg'?this.upLoading = true:this.styleLoading = true
          if (files.type.indexOf('image') === -1) { 
            this.$message.error('请选择图片文件')
          } else {
            const that = this;
            const reader = new FileReader(); 
            reader.readAsDataURL(el.target.files[0])
            if(el.target.id === 'upImg'){
              reader.onload = function() { 
                that.upUrl = this.result
                that.upLoading = false
              }
            } else {
              reader.onload = function() { 
                that.styleUrl = this.result
                that.styleLoading = false
              }
            }
          }
        }
      },
      checkUser() {
        let token = window.localStorage.getItem('token')
        if (token === null){
          this.$router.push({path:'/login'})
          return
        }
      },
      styleTransfer() {
        this.checkUser()
        let img = this.upUrl
        let type = this.chooseStyle
        if (img === ''||type === '') {
          return
        }
        this.resLoading = true
        this.generate = '生成中'
        this.generating = true
        let _this = this
        this.$axios.post(this.$api.funcUrl+'/style/',{
          'img': img,
          'type': type
        }).then((res)=>{
          _this.resUrl = res.data
          _this.resLoading = false
          _this.generate = '生成'
          _this.generating = false
        }).catch(()=>{
          _this.resLoading = false
          _this.generate = '生成'
          _this.generating = false
          this.$message.error('啊欧，服务器开小差去了！')})
      },
      handleCommand(command) {
        for(let i=0;i<this.styles.length;i++){
          if (this.styles[i].type === command){
            this.styleUrl = this.styles[i].url
            this.chooseStyle = this.styles[i].type
            break
          }
        }
      }
    }
}
</script>
<style scoped>
@media screen and (max-width:816px){
  .container-s {
    flex-direction: column;
    height: 100%!important;
    margin: 0!important;
    padding:0px!important;
  }
  .func-title {
    display: none;
  }
  .bg {
   height: 160vh!important; 
  }
  .el-dropdown-link {
    width: 100px;
    height: 50px;
  }
  .styleChooser {
    margin:30px!important;
  }
}
.bg {
  width: 100vw;
  height: 91.5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('https://i.loli.net/2021/05/02/aspjkoAPzdL6RM1.jpg') no-repeat;
  background-size: 100% 100%;
}
.func-title {
  font-size: 36px;
  letter-spacing: 5px;
  color: #fff;
}
.plus {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
.container-s {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.911);
  margin: 30px 0 0 0;
  width: 1550px!important;
  height: 500px;
  border-radius: 20px;
  box-shadow: 2px 3px 4px #8a8a8a;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  background: #5000BE;
  font-size: 16px;
  padding: 16px;
  margin: 40px;
  width: 100px;
  height: 50px;
}
.el-dropdown-menu__item {
  color: black;
  font-size: 18px;
}
.el-dropdown-menu__item:hover {
  background: #DDD6FE!important;
  color: black!important;
}
.style-container {
  margin: 0 0 0 10px;
}
.function-buttons {
  display: flex;
  flex-direction: column;
}
.alert-box-item {
  overflow: hidden;
}
.bigImg-div {
  width: 300px;
  height: 300px;
  border: 1px solid #bfbfbf;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
#input-tag,#output-tag {
  color: black; 
}
#upload,#upStyle{
  background: url('https://i.loli.net/2021/05/03/zicJGHnqhvUI6Tp.png') no-repeat 50% 50%;
}
#upload:hover{
  background: url('https://i.loli.net/2021/05/03/qFwy3agTfBGrCSQ.png') no-repeat 50% 50%;
}
.bigImg-div:hover {
  border: 1px solid #5000BE;
}
.bigImg {
  display: block;
  width: 300px;
  height: 300px;
}
</style>