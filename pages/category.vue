<template>
  <div>
    <div class="text-4xl p-4 border-b">网站栏目</div>
    <el-table :data="categorys" stripe style="width: 100%">
      <el-table-column prop="title" label="栏目标题" width="180"></el-table-column>
      <el-table-column prop="name" label="标识"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small">查看</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categorys: [
        {
          id: 1,
          name: "about",
          title: "关于我们"
        }
      ]
    };
  },
  async fetch({ store, params }) {}
};
</script>