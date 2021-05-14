<template>
<div id="profile">
  <div class="profile-bg">
  </div>
  <div class="self-bg">
    <div class="pro-title">
      PROFILE
    </div>
    <div class="profile-container">
      <div class="ava-name">
        <div class="avatar">
        </div>
        <div class="profile-name">
          Name
        </div>
        </div>
        <div class="info-zone">   
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name:'profile',
  data() {
    return {
      avatar:"",
      username:"",
    }
  },
}
</script>

<style scoped>
  #profile {
    position: relative;
    background: #fff;
    min-height: 92vh;
    z-index: 1;
  }
  .profile-bg{
    width: 100vw;
    height: 391px;
    background: #062B4B;
  }
  .self-bg {
    position: absolute;
    top: 50px;
    left: 30vw;
  }
  .pro-title{
    color:#E6E5E5;
    font-size: 80px;
  }
  .profile-container {
    width: 950px;
    min-height: 862px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
</style>