<template>
  <div class>
    <el-card
      class="mt-4"
      v-if="$store.state.templateInfo.configs && $store.state.templateInfo.configs.length"
    >
      <div slot="header" class="clearfix">
        <span class="text-2xl">配置内容(Config)</span>
      </div>
      <el-table :data="$store.state.templateInfo.configs" style="width: 100%">
        <el-table-column prop="title" label="配置名称" width="180"></el-table-column>
        <el-table-column prop="type" label="配置类型" width="180"></el-table-column>
        <el-table-column label="配置数据">
          <template slot-scope="scope">
            <template
              v-if="$store.state.dataConfigs.hasOwnProperty(scope.row.name)"
            >{{$store.state.dataConfigs[scope.row.name].value}}</template>
            <template v-else>-</template>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="configModify(scope.row)" type="primary" size="mini">编辑 / 查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="mt-4">
      <div slot="header" class="clearfix">
        <span class="text-2xl">广告横幅(Banner)</span>
        <el-button style="float: right;" type="primary" size="small" @click="bannerModify">添加图片</el-button>
      </div>
      <el-table :data="$store.state.dataBanners" style="width: 100%">
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.thumb || scope.row.cover" alt style="height:60px;" />
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              :value="true"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="正常"
              inactive-text="禁用"
              v-if="scope.row.status == 1"
              @change="bannerDataStatusUpdate(scope.row, 0)"
            ></el-switch>
            <el-switch
              :value="false"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="正常"
              inactive-text="禁用"
              v-if="scope.row.status == 0"
              @change="bannerDataStatusUpdate(scope.row, 1)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="bannerModify(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="bannerDataStatusUpdate(scope.row, -1)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card
      class="mt-4"
      v-if="$store.state.templateInfo.articles && $store.state.templateInfo.articles.length"
    >
      <div slot="header" class="clearfix">
        <span class="text-2xl">文档数据(Article)</span>
        <el-button style="float: right;" type="primary" size="small" @click="articleModify">添加文档</el-button>
      </div>
      <el-table :data="$store.state.dataArticles" style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="添加时间" width="180">
          <template slot-scope="scope">{{dateFormat(scope.row.create_time)}}</template>
        </el-table-column>
        <el-table-column label="排序" prop="sort"></el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              :value="true"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="正常"
              inactive-text="禁用"
              v-if="scope.row.status == 1"
              @change="articleDataStatusUpdate(scope.row, 0)"
            ></el-switch>
            <el-switch
              :value="false"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="正常"
              inactive-text="禁用"
              v-if="scope.row.status == 0"
              @change="articleDataStatusUpdate(scope.row, 1)"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="articleModify(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini" @click="articleDataStatusUpdate(scope.row, -1)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="$store.state.dataArticlesPagination.page"
        :page-size="$store.state.dataArticlesPagination.limit"
        layout="prev, pager, next, total, jumper"
        :total="$store.state.dataArticlesPagination.total"
        class="mt-4"
      ></el-pagination>
    </el-card>

    <el-dialog title="图片添加/编辑" :visible.sync="dialogVisibleBanner" width="60%">
      <el-form label-width="100px">
        <el-form-item label="图片">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formItemBanner.cover"></el-input>
        </el-form-item>

        <el-form-item label="缩略图">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formItemBanner.thumb"></el-input>
        </el-form-item>

        <el-form-item
          label="分类"
          v-if="$store.state.templateInfo.banners && $store.state.templateInfo.banners.length"
        >
          <template v-for="item in $store.state.templateInfo.banners">
            <el-radio v-model="formItemBanner.document_category" :label="item.name">{{ item.title }}</el-radio>
          </template>
        </el-form-item>

        <el-form-item label="图片说明">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formItemBanner.content"></el-input>
        </el-form-item>

        <el-form-item label="点击跳转url">
          <el-input placeholder="请输入内容跳转url" v-model="formItemBanner.url"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="formItemBanner.sort" :min="0" :max="10000" placeholder="越小越优先"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleBanner = false">取 消</el-button>
        <el-button type="primary" @click="bannerDataUpdate">确 定</el-button>
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
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="dataConfigValue"></el-input>
          </template>
          <template v-if="formItemConfig.type == 'img'">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="dataConfigValue"></el-input>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <input type="hidden" v-model="formItemConfig.id" />
        <el-button @click="dialogVisibleConfig = false">取 消</el-button>
        <el-button type="primary" @click="configDataUpdate">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="文档添加/编辑" :visible.sync="dialogVisibleArticle" width="60%">
      <el-form
        ref="formArticle"
        label-width="100px"
        :rules="formRulesArticle"
        :model="formItemArticle"
      >
        <el-form-item label="标题" prop="title">
          <el-input placeholder="请输入标题" v-model="formItemArticle.title"></el-input>
        </el-form-item>

        <el-form-item label="分类" prop="document_category">
          <el-select v-model="formItemArticle.document_category" placeholder="请选择">
            <el-option
              v-for="item in $store.state.templateInfo.articles"
              :key="item.name"
              :label="item.title"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="简述">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入简述"
            v-model="formItemArticle.description"
          ></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="formItemArticle.content"></el-input>
        </el-form-item>

        <el-form-item label="排序">
          <el-input-number v-model="formItemArticle.sort" :min="0" :max="10000" placeholder="越小越优先"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <input type="hidden" v-model="formItemArticle.id" />
        <el-button @click="dialogVisibleArticle = false">取 消</el-button>
        <el-button type="primary" @click="articleUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import Axios from "./../server/axios";
import APIS from "./../assets/js/apis";
import UTILS from "./../assets/js/utils";
export default {
  components: {},
  data() {
    return {
      pageID: 0,
      dataConfigId: 0,
      dataConfigValue: "",
      dialogVisibleBanner: false,
      dialogVisibleConfig: false,
      dialogVisibleArticle: false,
      formItemConfig: {},
      formItemBanner: {},
      formItemArticle: {},
      formRulesArticle: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入文章内容", trigger: "blur" }
          // { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "blur" }
        ],
        document_category: [
          { required: true, message: "请输入分类", trigger: "blur" }
        ]
      }
    };
  },
  async fetch({ store, route, params }) {
    console.log("fetch route:", route);
    let query = route.query || {};
    let id = query.id || 0;
    let template = query.template || "";
    if (template === "") {
      template = "index";
    }

    // 获取模板配置
    let templateInfoRet = await APIS.getTemplateInfo({ name: template });
    console.log("getch getTemplateInfo templateInfoRet:", templateInfoRet);
    store.commit("templateInfoSet", templateInfoRet.data);
    let templateInfo = templateInfoRet.data;

    if (!id) {
      let categoryRet = await APIS.getCategoryData({ category: "index" });
      console.log("getch categoryRet ret:", categoryRet);
      if (categoryRet.data && categoryRet.data.count == 0) {
        // id = categoryRet.data.rows[0].id;
        // 生成 首页
        let categoryIndexCreateRet = await APIS.websiteDataCreate({
          name: "index",
          title: "首页",
          category: "index"
        });
        console.log("getch categoryIndexCreateRet:", categoryIndexCreateRet);
        id = categoryIndexCreateRet.data.id;
      } else {
        id = categoryRet.data.rows[0].id;
      }
    }
    console.log("getch pid", id);
    store.commit("dataPidSet", id);

    // 页面配置数据设置
    if (templateInfo.configs && templateInfo.configs.length) {
      let configsDataRet = await APIS.getDocumentData({
        pid: id,
        type: "config"
      });
      console.log("getch configsDataRet:", configsDataRet);
      let configsData = configsDataRet.data.rows;
      store.commit("dataConfigsSet", configsData);
    }

    // 获取banner数据
    let bannersDataRet = await APIS.getDocumentData({
      pid: id,
      type: "banner"
    });
    console.log("getch bannerssDataRet:", bannersDataRet);
    let bannersData = bannersDataRet.data.rows;
    store.commit("dataBannnersSet", bannersData);

    // 获取文档数据
    let page = 1;
    let limit = 10;
    let articlesDataRet = await APIS.getDocumentData({
      pid: id,
      type: "article",
      page: page,
      limit: limit
    });
    console.log("getch articlesDataRet:", articlesDataRet);
    let articleRows = articlesDataRet.data.rows || [];
    let articlePagination = {
      page: page,
      limit: limit,
      total: articlesDataRet.data.count
    };
    store.commit("dataArticlesSet", articleRows);
    store.commit("dataArticlesPaginationSet", articlePagination);

    store.commit("subNavIndexSet", "2");
  },
  methods: {
    ...UTILS,
    bannerModify(data = {}) {
      let bannerData = {};
      bannerData.id = data.id || 0;
      bannerData.cover = data.cover || "";
      bannerData.thumb = data.thumb || "";
      bannerData.content = data.content || "";
      bannerData.url = data.url || "";
      bannerData.sort = data.sort || 0;
      bannerData.document_category = data.document_category || "";

      this.formItemBanner = bannerData;
      this.dialogVisibleBanner = true;
    },
    async bannerDataStatusUpdate(data, status = 1) {
      let bannerData = {};
      bannerData = Object.assign({}, bannerData, data);
      console.log("bannerDataStatusUpdate bannerData", bannerData);
      bannerData.status = status;
      console.log("bannerDataStatusUpdate bannerData", bannerData);
      let updateRet = await APIS.websiteDataUpdate(bannerData);
      console.log("bannerDataStatusUpdate updateRet", updateRet);
      if (updateRet.code == 0) {
        await this.bannerDataReload();
      } else {
        this.$message.error(updateRet.message || "error");
      }
    },
    async bannerDataReload() {
      let bannersDataRet = await APIS.getDocumentData({
        pid: this.$store.state.dataPid,
        type: "banner"
      });
      console.log("getch bannerssDataRet:", bannersDataRet);
      let bannersData = bannersDataRet.data.rows;
      this.$store.commit("dataBannnersSet", bannersData);
    },
    async bannerDataUpdate(status = 1) {
      let bannerData = this.formItemBanner;
      bannerData.pid = this.$store.state.dataPid;
      bannerData.category = "document";
      bannerData.document_type = "banner";
      bannerData.name = "banner_" + Date.now();
      bannerData.title = "banner_" + Date.now();
      bannerData.status = status;

      console.log("methods bannerDataUpdate data:", bannerData);

      let updateRet;
      if (bannerData.id) {
        updateRet = await APIS.websiteDataUpdate(bannerData);
      } else {
        updateRet = await APIS.websiteDataCreate(bannerData);
      }

      console.log("methods bannerDataUpdate updateRet:", updateRet);
      if (updateRet.code == 0) {
        await this.bannerDataReload();
        this.dialogVisibleBanner = false;
      } else {
        this.$message.error(updateRet.message || "error");
      }
    },
    configModify(data = {}) {
      this.formItemConfig = data;
      let dataConfigs = this.$store.state.dataConfigs;
      if (dataConfigs.hasOwnProperty(data.name)) {
        this.dataConfigId = dataConfigs[data.name].id;
        this.dataConfigValue = dataConfigs[data.name].value;
      } else {
        this.dataConfigId = 0;
        this.dataConfigValue = "";
      }
      this.dialogVisibleConfig = true;
    },
    async configDataUpdate() {
      let configData = {};
      configData.id = this.dataConfigId;
      configData.pid = this.$store.state.dataPid;
      configData.category = "document";
      configData.name = this.formItemConfig.name;
      configData.title = this.formItemConfig.title;
      configData.document_type = "config";
      configData.content = this.dataConfigValue;

      console.log("methods configDataUpdate configData:", configData);

      let updateRet;
      if (configData.id) {
        updateRet = await APIS.websiteDataUpdate(configData);
      } else {
        updateRet = await APIS.websiteDataCreate(configData);
      }

      if (updateRet.code == 0) {
        this.dialogVisibleConfig = false;
      } else {
        this.$message.error(updateRet.message || "error");
      }
    },
    articleModify(data = {}) {
      let articleData = {};
      articleData.id = data.id || 0;
      articleData.title = data.title || "";
      articleData.name = data.name || "";
      articleData.description = data.description || "";
      articleData.document_category = data.document_category || "";
      articleData.content = data.content || "";
      articleData.post_time = data.post_time || 0;
      articleData.sort = data.sort || 0;

      this.formItemArticle = articleData;
      this.dialogVisibleArticle = true;
    },
    async articleUpdate() {
      let articleData = this.formItemArticle;
      articleData.category = "document";
      articleData.document_type = "article";
      articleData.name = articleData.title;
      articleData.pid = this.$store.state.dataPid;

      let valid = await this.formValidata("formArticle");
      console.log("articlesUpdate valid:", valid);

      if (!valid) {
        return;
      }

      console.log("articleUpdate articleData:", articleData);

      let updateRet;
      if (articleData.id) {
        updateRet = await APIS.websiteDataUpdate(articleData);
      } else {
        updateRet = await APIS.websiteDataCreate(articleData);
      }

      console.log("articleUpdate updateRet:", updateRet);
      if (updateRet.code == 0) {
        await this.articleDataReload();
        this.dialogVisibleArticle = false;
      } else {
        this.$message.error(updateRet.message || "error");
      }
    },
    async articleDataReload() {
      let page = this.$store.state.dataArticlesPagination.page;
      let limit = this.$store.state.dataArticlesPagination.limit;
      let articlesDataRet = await APIS.getDocumentData({
        pid: this.$store.state.dataPid,
        type: "article",
        page: page,
        limit: limit
      });
      console.log("articleDataReload articlesDataRet:", articlesDataRet);
      let articleRows = articlesDataRet.data.rows || [];
      let articlePagination = {
        page: page,
        limit: limit,
        total: articlesDataRet.data.count
      };
      this.$store.commit("dataArticlesSet", articleRows);
      this.$store.commit("dataArticlesPaginationSet", articlePagination);
    },
    async articleDataStatusUpdate(data, status = 1) {
      let articleData = {};
      articleData = Object.assign({}, articleData, data);
      console.log("articleDataStatusUpdate articleData", articleData);
      articleData.status = status;
      console.log("articleDataStatusUpdate articleData", articleData);
      let updateRet = await APIS.websiteDataUpdate(articleData);
      console.log("articleDataStatusUpdate updateRet", updateRet);
      if (updateRet.code == 0) {
        await this.articleDataReload();
      } else {
        this.$message.error(updateRet.message || "error");
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

<style>
</style>
