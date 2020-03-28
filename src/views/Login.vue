<template>
  <div class="body">
    <el-form :model="form" class="loginf" :rules="rules" ref="form">
      <el-form-item label="用户名" prop="aname" class="form-group">
        <el-input type="text" v-model="form.aname" placeholder="用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="apassword" class="form-group">
        <el-input type="password" v-model="form.apassword" placeholder="Password" />
      </el-form-item>
      <el-form-item>
        <el-button @click="checkLogin()" class="fb" type="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {loginName} from "@/api/login";
export default {
  name: "login",
  data() {
    return {
      form: {
        aname: "",
        apassword: ""
      },
      rules: {
        aname: [
          { required: true, message: "名称必填", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        apassword: [
          { required: true, message: "密码必填", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    checkLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          loginName(this.form).then(res => {
            const { code, msg, token } = res.data;
            if (code == 200) {
              sessionStorage.setItem("token", "Bearer " + token);
              this.$message.success(msg);
              this.$router.push({ name: "home" });
            } else {
              this.$message.error(msg);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.body {
  position: absolute;
  bottom: 0;
  top: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: url('../assets/th.jpg') no-repeat; */
  background-size: cover;
}
.loginf {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 50px 50px 30px 50px;
  background-color: rgba(255, 255, 255, 0.9);
}
.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: initial;
  margin: 10px 0;
}
.el-form-item__label {
  color: white;
}
.form-group input {
  padding: 6px 12px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  outline: none;
}
.fb {
  margin: 30px 0;
  border: 1px solid #cccccc;
  border-radius: 10px;
  padding: 10px 50px;
  background-color: rgb(22, 220, 255);
  color: white;
  outline: none;
}
.fb:hover {
  background-color: #075eff;
  color: white;
}
.fb:active {
  box-shadow: inset 1px 1px 1px #9c9c9c;
}
</style>