<template>
  <div class="box">
    <div class="left">用户管理</div>
    <div class="right">
      管理员
      <i class="el-icon-switch-button" @click="logout"></i>
    </div>
  </div>
</template>

<script>
import { removeToken } from "@/utils/auth";
export default {
  methods: {
    logout() {
      //是否确认退出
      this.$confirm("确认退出吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //清除token
          removeToken();
          //提示
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          //跳转到登录页面
          this.$router.push("/login");
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  height: 60px;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
}
.left {
  font-weight: 900;
}
.right {
  display: flex;
  align-items: center;
  margin-right: 34px;
  height: 100%;
  color: #333333;
  font-size: 14px;

  i {
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
