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
              <el-button type="primary" size="mini" @click="bannerModify">编辑</el-button>
              <el-button type="danger" size="mini">删除</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="text-2xl">添加图片</div>
          <div
            class="text-center text-2xl border border-dotted mt-2"
            style="height:100px;line-height:100px;cursor: pointer;"
            @click="bannerModify"
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
              <el-button type="primary" size="mini" @click="configModify(item)">设置 / 查看</el-button>
            </div>
          </el-col>
        </template>
      </el-row>
    </el-card>

    <el-card class="mt-4">
      <div slot="header" class="clearfix">
        <span class="text-2xl">文档数据(Article)</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="articleModify">添加</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="articleModify(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="1"
        :page-size="100"
        layout="prev, pager, next, total, jumper"
        :total="400"
        class="mt-4"
      ></el-pagination>
    </el-card>

    <el-dialog title="图片添加/编辑" :visible.sync="dialogVisibleBanner" width="60%">
      <el-form :model="$store.state.formDataBanner" label-width="100px">
        <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="缩略图">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="分类">
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
        </el-form-item>

        <el-form-item label="图片说明">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        </el-form-item>

        <el-form-item label="点击跳转url">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleBanner = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>

    <el-dialog title="配置信息设置" :visible.sync="dialogVisibleConfig" width="60%">
      <el-form ref="formConfig" label-width="100px">
        <el-form-item label="配置项目">
          <el-input :placeholder="formItemConfig.title" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="配置类型">
          <el-input :placeholder="formItemConfig.type" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="配置数据">
          <template v-if="formItemConfig.type == 'text'">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
          </template>
          <template v-if="formItemConfig.type == 'img'">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleConfig = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>

    <el-dialog title="文档添加/编辑" :visible.sync="dialogVisibleArticle" width="60%">
      <el-form ref="formArticle" label-width="100px">
        <el-form-item label="标题">
          <el-input placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="分类">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleArticle = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Axios from "./../server/axios";

export default {
  components: {},
  data() {
    return {
      dialogVisibleBanner: false,
      dialogVisibleConfig: false,
      dialogVisibleArticle: false,
      formItemConfig: {},
      formItemArticle: {},
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
        },
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
  methods: {
    bannerModify() {
      this.dialogVisibleBanner = true;
    },
    configModify(data = {}) {
      this.formItemConfig = data;
      this.dialogVisibleConfig = true;
    },
    articleModify(data = {}) {
      this.dialogVisibleArticle = true;
    }
  }
};
</script>

<style>
</style>
