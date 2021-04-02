<template>
  <div class="AI-item">
    <div :style="{background:'url('+bgImg+') no-repeat',backgroundSize:'100% 100%'}" class="item-pic" id="colorization">
    </div>
    <div class="item-title">
      {{title}}
    </div>
    <div class="brief">
        {{brief}}
    </div>
    <div class="gotoBtn">
      <router-link tag="button" class="link" :to="{path:link}">
        Hava a Try Now
        <svg t="1616903957508" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2704" width="20" height="20"><path d="M878.08 512c0-38.4-15.36-79.36-43.52-110.08L547.84 117.76c-20.48-20.48-51.2-20.48-71.68 0s-20.48 51.2 0 71.68L744.96 460.8H215.04c-28.16 0-51.2 23.04-51.2 51.2s23.04 51.2 51.2 51.2h532.48L476.16 834.56c-20.48 20.48-20.48 51.2 0 71.68s51.2 20.48 71.68 0l286.72-286.72c30.72-30.72 43.52-69.12 43.52-107.52z" p-id="2705" fill="#ffffff"></path></svg>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
    name:'card',
    components: {},
    props: ['brief','title','link','bgImg'],
    methods:{
    }
}
</script>
<style scoped>
.item-pic {
  width: 240px;
  height: 200px;
  border-radius: 20px 20px 0 0;
}
.AI-item {
  background: white;
  border-radius: 20px;
  width: 240px;
  margin: 25px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);
}
.item-title{
  margin: 10px 0 10px 5px;
  color: black;
  font-size: 24px;
  font-weight: 600;
}
.brief {
    color: gray;
    margin: 0 0 10px 10px;
    height: 80px;
    width: 210px;
    font-size: 16px;
}
.link {
    color: white;
    text-decoration: none;
    background:linear-gradient(90deg,#0540c0, #0540c0,#0234a0);
    width: 200px;
    height: 40px;
    border-radius: 10px;
    outline: none;
    box-shadow: 2px 2px 4px #6489da;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.link:hover {
  background: #3273ff;
}
</style>