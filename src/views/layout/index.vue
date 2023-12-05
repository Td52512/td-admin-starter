<template>
  <div class="app">
    <Sidebar></Sidebar>
    <div class="right">
      <Header></Header>
      <Content></Content>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar.vue";
import Header from "@/components/header.vue";
import Content from "@/components/content.vue";
export default {
  name: "App",
  data() {
    return {};
  },

  components: {
    Sidebar,
    Header,
    Content,
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.app {
  height: 100%;
  display: flex;
}

.right {
  width: calc(100vw - 190px);
}
</style>
