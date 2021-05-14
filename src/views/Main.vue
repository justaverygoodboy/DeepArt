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
        titles:['AI彩色化','头像卡通化','超分辨率重建','图像风格迁移','图像增强'],
        briefs:['我们通过深度学习技术实现全自动的图像彩色化，让您的老照片充满色彩',
        '将你的头像转化成漫画风！通过深度学习技术体验有趣的漫画头像！',
        '将模糊的照片进行超分辨率重建',
        '想让你的照片充满艺术气息吗？这将赋予你大师的笔触！',
        '对图片进行智能图像增强'],
        links:['colorization','comics','sr','style','enhance'],
        bgImgs: ['https://i.loli.net/2021/05/02/AIE69TJiPs5zgaK.png',
                'https://i.loli.net/2021/05/04/7PizytJxApRvBCD.jpg',
                'https://i.loli.net/2021/05/02/PE7WNdeYqMkF6AT.jpg',
                'https://i.loli.net/2021/05/02/sUGVrmP8MtD3O5p.jpg',
                'https://i.loli.net/2021/05/02/R3nEhkALbVI5MXZ.jpg'],
      }
    },
  }
</script>
<style scoped>
@media screen and (max-width: 1350px) {
  .topics {
    display: none !important;
  }
  .AIproc {
    flex-direction: column !important;
  }
}
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
  user-select:none;
  color: #fff;
}
.banner {
  font-size: 2.5rem;
  letter-spacing: -0.1px;
  line-height: 1.4;
  text-shadow: 1px 1px 3px #d8d8d8;
  color: #fff;
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
