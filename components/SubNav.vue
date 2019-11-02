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
  </div>
</template>

<script>
export default {};
</script>