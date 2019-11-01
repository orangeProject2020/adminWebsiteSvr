<template>
  <div>
    <div class="text-4xl p-4 border-b">
      网站栏目
      <el-button type="primary" class="float-right" @click="categoryAddBtnClick">添加栏目</el-button>
    </div>
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

    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
      <el-form label-width="120px" :model="categoryData" :rules="formRules" ref="formCategory">
        <el-form-item label="上级栏目">
          <el-select v-model="categoryData.pid" placeholder="请选择">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="栏目标题" prop="title">
          <el-input placeholder="请输入栏目标题" v-model="categoryData.title"></el-input>
        </el-form-item>
        <el-form-item label="栏目标题" prop="name">
          <el-input placeholder="请输入栏目标识" v-model="categoryData.name"></el-input>
        </el-form-item>
        <el-form-item label="栏目简述/副标题">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="栏目简述 or 副标题"
            v-model="categoryData.description"
          ></el-input>
        </el-form-item>
        <el-form-item label="栏目排序">
          <el-input-number v-model="categoryData.sort" :min="0" :max="10000" placeholder="越小越优先"></el-input-number>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="栏目SEO标题">
          <el-input placeholder="请输入栏目SEO标题,默认使用标题" v-model="categoryData.seo_title"></el-input>
        </el-form-item>
        <el-form-item label="栏目SEO关键字">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入栏目SEO关键字"
            v-model="categoryData.seo_keyword"
          ></el-input>
        </el-form-item>
        <el-form-item label="栏目SEO描述">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入栏目SEO描述，默认使用栏目简述"
            v-model="categoryData.seo_description"
          ></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="上级栏目">
          <el-select v-model="categoryData.template" placeholder="请选择">
            <el-option
              v-for="item in templates"
              :key="item.name"
              :label="item.title"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="categroyUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import APIS from "./../assets/js/apis";
export default {
  data() {
    return {
      dialogVisible: false,
      formRules: {
        title: [
          { required: true, message: "请输入栏目标题", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入栏目标识", trigger: "blur" },
          { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "blur" }
        ]
      },
      categoryData: {},
      categorys: [
        {
          id: "0",
          name: "",
          title: "顶级栏目"
        }
      ],
      templates: []
    };
  },
  computed: {},
  async fetch({ store, params }) {
    let ret = await APIS.getCategoryData({ category: "category" });
    console.log("fetch getCategoryData ret:", ret);
    store.commit("categorysSet", ret.data.rows || []);
  },
  methods: {
    categoryAddBtnClick() {
      this.dialogVisible = true;
    },
    async categroyUpdate() {
      let categoryData = this.categoryData;
      categoryData.category = "category";

      console.log("categroyUpdate categoryData:", categoryData);

      let valid = await this.formValidata("formCategory");
      console.log("categroyUpdate valid:", valid);

      if (!valid) {
        return;
      }

      if (categoryData.id) {
      } else {
        let ret = await APIS.websiteDataCreate(categoryData);
        console.log("methods categroyUpdate websiteDataCreate ret: ", ret);
        if (ret.code === 0) {
          this.dialogVisible = true;

          await APIS.getCategoryData({ category: "category" });
          console.log("fetch getCategoryData ret:", ret);
          this.$store.commit("categorysSet", ret.data.rows || []);
        } else {
          this.$message.error(ret.message || "error");
        }
      }
    },
    formValidata(formName) {
      let ref = this.$refs[formName];
      return new Promise((r, j) => {
        ref.validate(valid => {
          if (valid) {
            r(true);
          } else {
            r(false);
          }
        });
      });
    }
  }
};
</script>