<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  background-color: #f3f4f7;
}

::-webkit-scrollbar {
  width: 6px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(144, 147, 153, 0.3);
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
</style>
