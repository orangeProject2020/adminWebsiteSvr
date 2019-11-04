<template>
  <div>
    <div class="text-4xl p-4 border-b">
      网站栏目
      <el-button type="primary" class="float-right" @click="categoryAddBtnClick" size="small">添加栏目</el-button>
    </div>
    <el-table :data="$store.state.categorys" stripe style="width: 100%">
      <el-table-column label="栏目标题" width="180">
        <template slot-scope="scope">{{scope.row.html}}{{scope.row.title}}</template>
      </el-table-column>
      <el-table-column prop="name" label="标识"></el-table-column>
      <el-table-column prop="url" label="URL"></el-table-column>
      <el-table-column label="页面模板" prop="template"></el-table-column>
      <el-table-column label="跳转">
        <template slot-scope="scope">
          <template v-if="scope.row.is_redirect == 1">✔️</template>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="50"></el-table-column>
      <el-table-column fixed="right" label="状态" width="200">
        <template slot-scope="scope">
          <el-switch
            :value="true"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="正常"
            inactive-text="禁用"
            v-if="scope.row.status == 1"
            @change="categoryStatusUpdate(scope.row, 0)"
          ></el-switch>
          <el-switch
            :value="false"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="正常"
            inactive-text="禁用"
            v-if="scope.row.status == 0"
            @change="categoryStatusUpdate(scope.row, 1)"
          ></el-switch>
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
          <template v-if="scope.row.template && scope.row.is_redirect != 1">
            <router-link
              :to="{path: '/data', query: {id: scope.row.id , template: scope.row.template}}"
              class="text-blue-500"
            >栏目数据</router-link>
          </template>
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
              :label="item.html + item.title"
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
        <el-form-item label="是否跳转下一级">
          <el-radio v-model="categoryData.is_redirect" :label="redirectValue[0]">否</el-radio>
          <el-radio v-model="categoryData.is_redirect" :label="redirectValue[1]">是</el-radio>
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
        <el-form-item label="文章分页数目">
          <el-input-number
            v-model="categoryData.page_limit"
            :min="0"
            :max="100"
            placeholder="0为不分页"
          ></el-input-number>
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
      redirectValue: [0, 1],
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
        pid: 0,
        name: "",
        title: "",
        description: "",
        sort: 0,
        seo_title: "",
        seo_keywords: "",
        seo_description: "",
        template: "",
        template_article: "",
        page_limit: 0,
        is_redirect: 0
      },
      // categoryDataPid: 0,
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

    store.commit("subNavIndexSet", "1");
  },
  methods: {
    initPidCategorys(currentCategoryId = 0) {
      let categorys = this.$store.state.categorys;
      this.categorys = [
        {
          id: 0,
          name: "",
          title: "顶级栏目",
          html: ""
        }
      ];
      categorys.forEach(item => {
        let data = {
          id: item.id,
          name: item.name,
          title: item.title,
          html: item.html
        };
        if (item.id === currentCategoryId && currentCategoryId !== 0) {
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
      // this.categoryDataPid = 0;

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
        status: 1,
        page_limit: 0,
        is_redirect: 0
      };

      this.dialogVisible = true;
    },
    categoryUpdateBtnClick(data) {
      console.log("ethods categoryUpdateBtnClick data:", data);

      Object.keys(this.categoryData).forEach(key => {
        if (data.hasOwnProperty(key)) {
          this.categoryData[key] = data[key];
        }
      });
      let templates = this.$store.state.templates;
      console.log("methods categoryUpdateBtnClick templates:", templates);
      this.templatesCategory = templates.category;
      this.templatesArticle = templates.article;

      this.initPidCategorys(data.id);
      // this.categoryDataPid = data.pid;

      this.dialogVisible = true;
    },
    async categroyUpdate() {
      let categoryData = this.categoryData;
      categoryData.category = "category";
      // categoryData.pid = this.categoryDataPid;

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
      let categoryData = {};
      categoryData = Object.assign({}, categoryData, data);
      categoryData.status = status;
      let ret = await APIS.websiteDataUpdate(categoryData);
      console.log("methods categoryStatusUpdate websiteDataUpdate ret: ", ret);
      if (ret.code === 0) {
        await this.categorysReload();
        // this.dialogVisible = false;
      } else {
        this.$message.error(ret.message || "error");
      }
    }
  }
};
</script>