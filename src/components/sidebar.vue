<template>
  <div class="box">
    <div class="logo">
      <!-- <img src="@/assets/logo.png" alt="" /> -->
      <!-- 管理后台 -->
    </div>
    <el-menu
      default-active="/index"
      class="el-menu-vertical-demo"
      background-color="#343744"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/index" style="width: 190px">
        <i class="el-icon-document"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu
        style="width: 190px"
        index=""
        v-for="item in menus"
        :key="item.id"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.menuName }}</span>
        </template>

        <el-menu-item
          style="width: 190px"
          :index="i.path"
          v-for="i in item.children"
          :key="i.id"
          >{{ i.menuName }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      menus: [],
    };
  },
  methods: {},
  mounted() {
    this.menus = this.$store.state.userRouters;
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 190px;
  min-height: 100vh;
  max-height: 100%;
  background-color: #343744;
  overflow: hidden;
}

.el-submenu .el-menu-item {
  min-width: 100%;
}

.logo {
  text-align: center;
  background-color: rgb(52, 55, 68);
  padding: 46px 37px 67px 36px;
  color: white;
  // background-image: url("../assets/login-left.png");
  // background-repeat: no-repeat;
  // background-position: center;
  // background-size: 100%;
}

.logo img {
  width: 30px;
  height: 30px;
}
</style>
