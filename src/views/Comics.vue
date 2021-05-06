<template>
<div class="bg">
    <div class="func-title">Turn On Your Cartoon Switch</div>
    <div class="container">
        <div class="img-container">
          <p id="input-tag" style="margin-bottom: 20px;font-size:24px">输入图像</p>
          <div class="bigImg-div" v-loading="upLoading" id="upload" @click="toGetImg">
            <img class="bigImg" :src="upUrl" v-if="upUrl">
          </div>
        </div>
        <div class="function-buttons">
          <my-btn @click.native="comics" :disabled="generating">{{generate}}</my-btn>
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
let styleElement = null
import MyBtn from '../components/MyBtn.vue'
import DownImg from '../components/DownImg'
export default {
    name:'comics',
    components:{MyBtn,DownImg},
    data() {
      return {
        upUrl: '',
        resUrl: '',
        resLoading: false,
        upLoading: false,
        generating: false,
        generate: '生成'
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
      toGetStyle() {
        if (styleElement === null) {
          styleElement = document.createElement('input')
          styleElement.setAttribute('type', 'file')
          styleElement.setAttribute('id','upStyle')
          styleElement.style.display = 'none'
          if (window.addEventListener) {
            styleElement.addEventListener('change', this.uploadFile, false)
          } else {
            styleElement.attachEvent('onchange', this.uploadFile)
          }
          document.body.appendChild(styleElement)
          }
          styleElement.click()
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
      comics() {
        this.checkUser()
        let img = this.upUrl
        if (img === '') {
          return
        }
        this.resLoading = true
        this.generate = '生成中'
        this.generating = true
        let _this = this
        this.$axios.post(this.$api.funcUrl+'/comics/',{
          'img': img,
        }).then((res)=>{
          _this.resUrl = res.data
          _this.resLoading = false
          _this.generating = false
          _this.generate = '生成'
        }).catch(()=>{
          _this.resLoading = false
          _this.generate = '生成'
          _this.generating = false
          this.$message.error('啊欧，服务器开小差去了，生成失败')})
      }
    }
}
</script>
<style scoped>
@media screen and (max-width:816px){
  .container {
    flex-direction: column;
    height: 950px!important;
    margin: 0!important;
    padding:0px!important;
  }
  .func-title {
    display: none;
  }
  .bg {
   height: 105vh!important; 
  }
  .container {
    height: 100%!important;
  }
}
.bg {
  width: 100vw;
  height: 91.5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('https://i.loli.net/2021/05/02/7IPLbFGyhjfnAr2.jpg') no-repeat;
  background-size: 100% 100%;
}
.func-title {
  font-size: 36px;
  letter-spacing: 5px;
  color: black;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.911);
  margin: 40px;
  width: 950px;
  height: 500px;
  border-radius: 20px;
  box-shadow: 2px 3px 4px grey;
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