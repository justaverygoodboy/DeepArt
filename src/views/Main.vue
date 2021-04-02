<template>
  <div>
    <div class="main">
    <div class="topics">
      <span class="title">AI DEEPART</span>
      <span class="banner">We use AI technology to Make Photo-Magics</span>
    </div>
      <div class="AIproc">
        <card v-for="(link,index) in links" :key="index" :title="titles[index]"
         :brief="briefs[index]"
         :link="link"
         :bgImg="bgImgs[index]"/>
      </div>
    </div>
  </div>
</template>

<script>

import Card from '../components/Card'
export default {
  name: 'Main',
  components: {Card},
  data() {
      return {
        titles:['AI彩色化','头像漫画化','超分辨率重建','图像风格迁移','AI图像增强'],
        briefs:['我们通过深度学习技术实现全自动的图像彩色化',
        '将你的头像转化成漫画风！',
        '将模糊的照片进行超分辨率重建',
        '想让你的照片充满艺术气息吗？',
        '通过AI将照片进行智能图像增强'],
        links:['colorization','comics','sr','style','deblur'],
        bgImgs: [require('../assets/car.png'),
                require('../assets/comicprofile.jpg'),
                require('../assets/godness.jpg'),
                require('../assets/styleprofile.jpg'),
                require('../assets/enhance.jpg')],
      }
    },
    methods: {
    },
  }
</script>
<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.topics {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 130px 0 20px 0;
}
.title {
  font-size: 1.1rem;
  letter-spacing: 1px;
  text-shadow: 1px 1px 3px #d8d8d8;
}
.banner {
  font-size: 2.5rem;
  letter-spacing: -0.1px;
  line-height: 1.4;
  text-shadow: 1px 1px 3px #d8d8d8;
}
.AIproc {
  display: flex;
  flex-direction: row;
  width: 100vw;
  align-items: center;
  justify-content: center;
  margin:0;
}
</style>
