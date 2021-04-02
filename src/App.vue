<template>
  <div id="app">
    <my-header/>
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
* {
  margin: 0;
  padding: 0;
  caret-color: transparent;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: url('./assets/bg.jpg') no-repeat 50%;
  height: 100vh;
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
