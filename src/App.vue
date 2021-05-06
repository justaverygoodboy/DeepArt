<template>
  <div id="app">
    <my-header :key="this.$store.state.headerKey"/>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader'
export default {
  components:{MyHeader}
}
</script>

<style>
@media screen and (max-width:600px) {
  #app {
    height: auto !important;
    background-size:cover!important; 
  }
}
* {
  font-family: '微软雅黑' , 'Helvetica Neue' , Arial , sans-serif ;
  margin: 0;
  padding: 0;
  caret-color: transparent;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: url('https://i.loli.net/2021/05/02/lcfKIVxuaBb2ENe.jpg') no-repeat 50%;
  height: 100vh;
  overflow: hidden;
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
</style>
