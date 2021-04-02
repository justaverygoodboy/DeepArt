<template>
<div id="load-container">
  <div class="loading">
      <span>图片生成中...</span>
  </div>
<div>
</template>

<script>
export default {
}
</script>

<style>
.load-container {
    background: #34495e;
    width: 100vw;
    width: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "montserrat",sans-serif;
    position: absolute;
}
.loading {
    width: 200px;
    height: 200px;
    box-sizing: border-box;
    border-radius: 50%;
    border-top: 10px solid #e74c3c;
    position: relative;
    animation: a1 2s linear infinite;
}
.loading::before,.loading::after {
    content: '';
    width: 200px;
    height: 200px;
    background: red;
    position: absolute;
    left: 0;
    top: -10px;
    box-sizing: border-box;
    border-radius: 50%;
}
.loading::before{
    border-top: 10px solidi #e67e22;
    transform: rotate(120deg);
}
.loading::after{
    border-top:10px solid #3498db;
    transform: rotate(240deg);
}
.loading span{
    position: absolute;
    width: 200px;
    height: 200px;
    color: #fff;
    text-align: center;
    line-height: 200px;
    animation: a2 2s linear infinite;
}

@keyframes a1 {
    to {
        transform: rotate(360deg);
    }
}
@keyframes a2 {
    to {
        transform:rotate(-360deg);
    }
}
</style>