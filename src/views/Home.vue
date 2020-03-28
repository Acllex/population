<template>
  <div class="bodys">
    <el-container class="container">
      <el-header>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">老年人口管理系统</el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="0">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>老年人口信息管理</span>
              </template>
              <el-menu-item index="0-1">
                <router-link :to="{name: 'seepeople'}">人口信息查看</router-link>
              </el-menu-item>
              <el-menu-item index="0-2">
                <router-link :to="{name: 'addpeople'}">人口信息添加</router-link>
              </el-menu-item>
              <el-menu-item index="0-3">
                <router-link :to="{name: 'addestate'}">小区信息添加</router-link>
              </el-menu-item>
              <el-menu-item index="0-4">
                <router-link :to="{name: 'querypeople'}">人口信息搜索</router-link>
              </el-menu-item>
            </el-submenu>
            
            
            
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside[data-v-fae5bece] {
  background-color: white;
}
.el-aside {
  background-color: rgb(84, 92, 100);
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.el-header {
  padding: 0;
}
a {
  color: white;
}
</style>