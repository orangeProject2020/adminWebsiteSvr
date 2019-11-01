<template>
  <div>
    <div class="text-4xl p-4 border-b">
      网站栏目
      <el-button type="primary" class="float-right" @click="categoryAddBtnClick">添加栏目</el-button>
    </div>
    <el-table :data="$store.state.categorys" stripe style="width: 100%">
      <el-table-column label="栏目标题" width="180">
        <template slot-scope="scope">{{scope.row.html}}{{scope.row.title}}</template>
      </el-table-column>
      <el-table-column prop="name" label="标识"></el-table-column>
      <el-table-column prop="sort" label="排序" width="50"></el-table-column>
      <el-table-column fixed="right" label="状态" width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.status == 1">
            <span class="text-green-400 cursor-pointer" @click="categoryStatusUpdate(scope.row)">正常</span>
          </template>
          <template v-if="scope.row.status == 0">
            <span class="text-red-400 cursor-pointer" @click="categoryStatusUpdate(scope.row)">禁用</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="categoryUpdateBtnClick(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="categoryStatusUpdate(scope.row, -1)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label width="100">
        <template slot-scope="scope">
          <!-- <el-button type="link" size="small">栏目数据</el-button> -->
          <router-link :to="{path: '/data', query: {id: scope.row.id}}">栏目数据</router-link>
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
              :disabled="item.disabled"
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
        <el-form-item label="栏目页模板">
          <el-select v-model="categoryData.template" placeholder="请选择">
            <el-option
              v-for="item in templatesCategory"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详情页模板">
          <el-select v-model="categoryData.template_article" placeholder="请选择">
            <el-option
              v-for="item in templatesArticle"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
      categoryData: {
        id: 0,
        pid: "",
        name: "",
        title: "",
        description: "",
        sort: 0,
        seo_title: "",
        seo_keywords: "",
        seo_description: "",
        templates: "",
        template_article: ""
      },
      categorys: [],
      templatesCategory: [],
      templatesArticle: []
    };
  },
  computed: {},
  async fetch({ store, params }) {
    let categoryRet = await APIS.getCategoryData({ category: "category" });
    console.log("fetch getCategoryData categoryRet:", categoryRet);
    store.commit("categorysSet", categoryRet.data.rows || []);

    let templatesRet = await APIS.getTemplates();
    console.log("fetch getTemplates templatesRet:", templatesRet);
    store.commit("templatesSet", templatesRet.data);
  },
  methods: {
    initPidCategorys(currentCategoryId = 0) {
      let categorys = this.$store.state.categorys;
      this.categorys = [
        {
          id: 0,
          name: "",
          title: "顶级栏目"
        }
      ];
      categorys.forEach(item => {
        let data = {
          id: item.id,
          name: item.name,
          title: item.title
        };
        if (item.id === currentCategoryId) {
          data.disabled = true;
        }
        this.categorys.push(data);
      });
    },
    categoryAddBtnClick() {
      let templates = this.$store.state.templates;
      console.log("methods categoryAddBtnClick templates:", templates);
      this.templatesCategory = templates.category;
      this.templatesArticle = templates.article;

      this.initPidCategorys();

      this.categoryData = {
        id: 0,
        pid: "",
        name: "",
        title: "",
        description: "",
        sort: 0,
        seo_title: "",
        seo_keywords: "",
        seo_description: "",
        template: "",
        template_article: "",
        status: 1
      };

      this.dialogVisible = true;
    },
    categoryUpdateBtnClick(data) {
      console.log("ethods categoryUpdateBtnClick data:", data);

      Object.keys(this.categoryData).forEach(key => {
        if (data[key]) {
          this.categoryData[key] = data[key];
        }
      });
      let templates = this.$store.state.templates;
      console.log("methods categoryUpdateBtnClick templates:", templates);
      this.templatesCategory = templates.category;
      this.templatesArticle = templates.article;

      this.initPidCategorys(data.id);

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
        let ret = await APIS.websiteDataUpdate(categoryData);
        console.log("methods categroyUpdate websiteDataUpdate ret: ", ret);
        if (ret.code === 0) {
          await this.categorysReload();
          this.dialogVisible = false;
        } else {
          this.$message.error(ret.message || "error");
        }
      } else {
        let ret = await APIS.websiteDataCreate(categoryData);
        console.log("methods categroyUpdate websiteDataCreate ret: ", ret);
        if (ret.code === 0) {
          await this.categorysReload();
          this.dialogVisible = false;
        } else {
          this.$message.error(ret.message || "error");
        }
      }
    },
    async categorysReload() {
      let ret = await APIS.getCategoryData({ category: "category" });
      console.log("method getCategoryData ret:", ret);
      await this.$store.commit("categorysSet", ret.data.rows || []);
      return true;
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
    },
    async categoryStatusUpdate(data, status = 0) {
      try {
        let confirmRet = await this.$confirm(
          "是否进行此项操作?",
          "更改栏目状态",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        );

        console.log(
          "methods categoryStatusUpdate confirm confirmRet",
          confirmRet
        );

        if (confirmRet == "confirm") {
          Object.keys(this.categoryData).forEach(key => {
            if (data[key]) {
              this.categoryData[key] = data[key];
            }
          });
          console.log(
            "methods categoryStatusUpdate categoryData:",
            this.categoryData
          );
          if (status === 0) {
            this.categoryData.status = this.categoryData.status === 0 ? 1 : 0;
          } else {
            this.categoryData.status = -1;
          }

          console.log(
            "methods categoryStatusUpdate categoryData:",
            this.categoryData
          );
          let ret = await APIS.websiteDataUpdate(this.categoryData);
          console.log(
            "methods categoryStatusUpdate websiteDataUpdate ret: ",
            ret
          );
          if (ret.code === 0) {
            await this.categorysReload();
            // this.dialogVisible = false;
          } else {
            this.$message.error(ret.message || "error");
          }
        } else {
          this.$message.error("取消操作");
        }
      } catch (err) {
        console.log(err);
      }

      // .then(async () => {

      //   // if (ret.code === 0) {
      //   //   await this.categorysReload();
      //   //   // this.dialogVisible = false;
      //   // } else {
      //   //   this.$message.error(ret.message || "error");
      //   // }
      // })
      // .catch(() => {
      //   // console.error("categoryStatusUpdate err", err);
      //   this.$message.error("取消操作！");
      // });
    }
  }
};
</script>