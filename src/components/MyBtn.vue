<template>
  <button :disabled="disabled"><slot></slot></button>
</template>

<script>
export default {
    name: 'MyBtn',
    props: ['disabled']
}
</script>

<style scoped>
button {
  border: 1px solid #5000BE;
  background: #5000BE;
  color: white;
  width: 100px;
  height: 50px;
  margin: 10px 50px 10px 50px;
  border-radius: 1px;
  cursor: pointer;
  outline: none;
}
button:hover {
  background: transparent;
  color: #5000BE;
  font-weight: 700;
  border: 1px solid #5000BE;
  transition: all 0.15s
}
</style>