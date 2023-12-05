<template>
  <div class="box">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  // height: calc(100vh - 60px);
  background-color: #f3f4f7;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
