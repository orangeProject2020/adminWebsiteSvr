<template>
  <div class>
    <el-card class="mt-4">
      <div slot="header" class="clearfix">
        <span class="text-2xl">广告横幅(Banner)</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class>
            <div class="text-2xl">图片名称</div>
            <div class="mt-2">
              <img src alt style="height:100px;width:100%;" />
            </div>
            <div class="text-right mt-2">
              <el-button type="primary" size="mini">编辑</el-button>
              <el-button type="danger" size="mini">删除</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="text-2xl">添加图片</div>
          <div
            class="text-center text-2xl border border-dotted mt-2"
            style="height:100px;line-height:100px;cursor: pointer;"
          >
            <p class="text-5xl">+</p>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mt-4">
      <div slot="header" class="clearfix">
        <span class="text-2xl">配置内容(Config)</span>
      </div>
      <el-row :gutter="20">
        <template v-for="item in $store.state.templateInfo.configs">
          <el-col :span="4">
            <div class="text-2xl border-b">{{item.title}}</div>
            <div class="mt-2" style="height:80px"></div>
            <div class="text-right mt-2">
              <el-button type="primary" size="mini">设置 / 查看</el-button>
            </div>
          </el-col>
        </template>
      </el-row>
    </el-card>

    <el-card class="mt-4">
      <div slot="header" class="clearfix">
        <span class="text-2xl">文档数据(Article)</span>
        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Axios from "./../server/axios";

export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  async fetch({ store, params }) {
    // let ret = await store.dispatch("getConfig", params);
    let ret = await Axios.post("/api/template/info", { name: "index" });
    console.log("get template ret:", ret);
    store.commit("templateInfoSet", ret.data);
    // return ret;
    // let ret = await store.dispatch("getTemplateByName", { name: "index" });
    // console.log("getTemplateByName ret", ret);
  },
  methods: {}
};
</script>

<style>
</style>
