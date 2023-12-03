<template>
  <div class="login" id="login-app">
    <div class="login-box">
      <img
        style="border-top-left-radius: 10px; border-bottom-left-radius: 10px"
        src="@/assets/login-left.png"
        alt=""
      />
      <div class="login-form">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
          <div class="login-form-title">管理后台</div>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              type="text"
              auto-complete="off"
              placeholder="账号"
              maxlength="20"
              prefix-icon="el-icon-user"
            />
          </el-form-item>
          <el-form-item prop="password" style="margin-bottom: 10px">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              prefix-icon="el-icon-lock"
              maxlength="20"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <div class="rememberMe">
            <el-checkbox v-model="rememberMe">记住我</el-checkbox>
          </div>
          <el-form-item style="width: 100%">
            <el-button
              :loading="loading"
              class="login-btn"
              size="medium"
              style="width: 100%"
              @click.native.prevent="handleLogin"
            >
              <span v-if="!loading">登录</span>
              <span v-else>登录中...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { login } from "@/api/login";
import { setToken } from "@/utils/auth";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
      },
      loading: false,
    };
  },
  computed: {
    loginRules() {
      const validateUsername = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error("请输入用户名"));
        } else {
          callback();
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error("密码必须在6位以上"));
        } else {
          callback();
        }
        callback();
      };
      return {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      };
    },
  },
  created() {
    this.getCookie();
  },
  methods: {
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    async handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          // this.$router.push("/index");
          let res = await login(this.loginForm);
          if (String(res.code) == "200") {
            // Cookies.set("username", this.loginForm.username, { expires: 30 });
            // Cookies.set("password", encrypt(this.loginForm.password), {
            //   expires: 30,
            // });
            setToken(res.data.token);
            //跳转到主页
          } else {
            this.$message.error(res.msg);
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>

<style less>
.body {
  min-width: 1366px;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #333;
}
.login-box {
  width: 1000px;
  height: 474.38px;
  border-radius: 8px;
  display: flex;
}

.login-box img {
  width: 60%;
  height: auto;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
.login-form {
  background: #ffffff;
  width: 40%;
  border-radius: 0px 8px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form .el-form {
  width: 214px;
  height: 307px;
}
.login-form .el-form-item {
  margin-bottom: 30px;
}
.login-form .el-form-item.is-error .el-input__inner {
  border: 0 !important;
  border-bottom: 1px solid #fd7065 !important;
  background: #fff !important;
}
.login-form .input-icon {
  height: 32px;
  width: 18px;
  margin-left: -2px;
}
.login-form .el-input__inner {
  border: 0;
  border-bottom: 1px solid #e9e9e8;
  border-radius: 0;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  height: 32px;
  line-height: 32px;
}
.login-form .el-input__prefix {
  left: 0;
}
.login-form .el-input--prefix .el-input__inner {
  padding-left: 26px;
}
.login-form .el-input__inner::placeholder {
  color: #aeb5c4;
}
.login-form .el-form-item--medium .el-form-item__content {
  line-height: 32px;
}
.login-form .el-input--medium .el-input__icon {
  line-height: 32px;
}
.login-btn {
  border-radius: 17px !important;
  padding: 11px 20px !important;
  margin-top: 10px;
  font-weight: 500;
  font-size: 14px;
  border: none !important;
  background-color: #ffc200 !important;
}
.login-btn:hover,
.login-btn:focus {
  background: #fdd24c !important;
  /* color: #ffffff !important; */
  color: #333333 !important;
}
.login-form-title {
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}
.login-form-title .title-label {
  font-weight: 500;
  font-size: 20px;
  color: #333333;
  margin-left: 10px;
}

.rememberMe {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.rememberMe .el-checkbox {
  font-size: 12px;
}

.rememberMe .el-checkbox__label {
  font-size: 12px;
  color: #aeb5c4;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #aeb5c4 !important;
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #fdd24c !important;
  background-color: #fdd24c !important;
}
</style>
