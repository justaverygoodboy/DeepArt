<template>
<div class="bg">
    <div class="func-title">赋予你的图像不同的风格</div>
    <div class="container">
      <div class="img-container">
        <p id="input-tag" style="margin-bottom: 20px;font-size:24px">输入图像</p>
        <div class="bigImg-div" v-loading="upLoading" id="upload" @click="toGetImg">
          <img class="bigImg" :src="upUrl" v-if="upUrl">
        </div>
      </div>
      <div class="plus">
        <svg t="1617030800255" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2038" width="78" height="78"><path d="M810.666667 469.333333h-256V213.333333c0-25.6-17.066667-42.666667-42.666667-42.666666s-42.666667 17.066667-42.666667 42.666666v256H213.333333c-25.6 0-42.666667 17.066667-42.666666 42.666667s17.066667 42.666667 42.666666 42.666667h256v256c0 25.6 17.066667 42.666667 42.666667 42.666666s42.666667-17.066667 42.666667-42.666666v-256h256c25.6 0 42.666667-17.066667 42.666666-42.666667s-17.066667-42.666667-42.666666-42.666667z" p-id="2039" fill="#8a8a8a"></path></svg>
      </div>
      <div class="style-container">
        <p id="input-tag" style="margin-bottom: 20px;font-size:24px">风格图像</p>
        <div class="bigImg-div" v-loading="styleLoading" id="upload" @click="toGetStyle">
          <img class="bigImg" :src="styleUrl" v-if="styleUrl">
        </div>
      </div>
      <div class="function-buttons">
        <my-btn @click.native="colorization">风格迁移</my-btn>
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
      colorization() {
        let img = this.upUrl
        if (img === '') {
          return
        }
        this.resLoading = true
        let _this = this
        this.$axios.post('http://localhost:8000/style/',{
          'img': img,
        }).then((res)=>{
          _this.resUrl = res.data
          _this.resLoading = false
        }).catch((err)=>{console.log(err)})
      }
    }
}
</script>
<style scoped>
.bg {
  width: 100vw;
  height: 91.5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('../assets/style.jpg') no-repeat;
  background-size: 100% 100%;
}
.func-title {
  font-size: 36px;
  letter-spacing: 5px;
}
.plus {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.911);
  margin: 40px;
  width: 1500px;
  height: 500px;
  border-radius: 20px;
  box-shadow: 2px 3px 4px #8a8a8a;
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
  background: url('../assets/upImgg.png') no-repeat 50% 50%;
}
#upload:hover{
  background: url('../assets/upImg.png') no-repeat 50% 50%;
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