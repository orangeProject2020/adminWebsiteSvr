<template>
  <div>
    <el-menu :default-active="$store.state.subNavIndex" mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/">页面栏目</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/data">页面数据</router-link>
      </el-menu-item>
    </el-menu>
    <nuxt />
  </div>
</template>

<script>
import Axios from "./../server/axios";
// import SubNav from "./../components/SubNav";
export default {
  components: {
    // SubNav
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      console.log("go back");
      this.$router.go(-1);
    }
  }
};
</script>

<style>
html,
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 62.5% !important;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100%;
}

#__nuxt,
#__layout {
  height: 100%;
}

#__layout > div {
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
