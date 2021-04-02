<template>
    <div class="container">
        <div class="img-container">
          <p id="input-tag" style="margin-bottom: 20px;font-size:24px">输入图像</p>
          <div class="bigImg-div" v-loading="upLoading" id="upload" @click="toGetImg">
            <img class="bigImg" :src="upUrl" v-if="upUrl">
          </div>
          <div ref="styleSample" style="margin-top:20px;display:none">
            <p id="input-tag" style="margin-bottom: 20px;font-size:24px">参考风格图像</p>
            <div class="bigImg-div" id="upStyle" @click="toGetStyle">
              <img class="bigImg" :src="styleUrl" v-if="styleUrl">
            </div>
          </div>
        </div>
        <div class="function-buttons">
          <my-btn style="margin-top:50px" @click.native="denoise">图像去噪</my-btn>
          <my-btn @click.native="colorization">图像彩色化</my-btn>
          <my-btn @click.native="SR">超分辨率重建</my-btn>
          <my-btn @click.native="comicalize">头像漫画化</my-btn>
          <my-btn @click.native="stylify">图像风格化</my-btn>
        </div>
        <div class="img-result">
          <p id="output-tag" style="margin-bottom: 20px;font-size:24px">输出图像</p>
          <div class="bigImg-div" v-loading="resLoading">
            <img class="bigImg" :src="resUrl" v-if="resUrl">
          </div>
          <down-img :downUrl="resUrl" :exist="resUrl"/>
        </div>
      </div>
</template>
<script>
let inputElement = null
let styleElement = null
import MyBtn from '../components/MyBtn.vue'
import DownImg from '../components/DownImg'
export default {
    name:'Enhance',
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
      denoise() {
        let img = this.upUrl
        if (img === '') {
          return
        }
        this.loading = true
        let _this = this
        this.$axios.post('http://localhost:8000/comicalize/',{
          'img': img,
        }).then((res)=>{
          _this.resUrl = res.data
          _this.loading = false
        }).catch((err)=>{console.log(err)})
      },
      comicalize() {
        let img = this.upUrl
        if (img === '') {
          return
        }
        this.loading = true
        let _this = this
        this.$axios.post('http://localhost:8000/comicalize/',{
          'img': img,
        }).then((res)=>{
          _this.resUrl = res.data
          _this.loading = false
        }).catch((err)=>{console.log(err)})
      },
      stylify() {
        let stylify = this.$refs.styleSample
        stylify.style.display = ""
        stylify.style.position = "absolute"
        let img = this.upUrl
        if (img === '') {
          return
        }
        this.loading = true
        let _this = this
        this.$axios.post('http://localhost:8000/stylify/',{
          'img': img,
        }).then((res)=>{
          _this.resUrl = res.data
          _this.loading = false
        }).catch((err)=>{console.log(err)})
      },
      SR() {
        let img = this.upUrl
        if (img === '') {
          return
        }
        this.loading = true
        let _this = this
        this.$axios.post('http://localhost:8000/sr/',{
          'img': img,
        }).then((res)=>{
          _this.resUrl = res.data
          _this.loading = false
        }).catch((err)=>{console.log(err)})
      },
      colorization() {
        let img = this.upUrl
        if (img === '') {
          return
        }
        this.loading = true
        let _this = this
        this.$axios.post('http://localhost:8000/colorization/',{
          'img': img,
        }).then((res)=>{
          _this.resUrl = res.data
          _this.loading = false
        }).catch((err)=>{console.log(err)})
      }
    }
}
</script>
<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  margin: 10px;
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
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
#upload,#upStyle{
  background: url('../assets/upload.svg') no-repeat 50% 50%;
}
#upload:hover,#upStyle:hover {
  background: url('../assets/uploadActive.svg') no-repeat 50% 50%;
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