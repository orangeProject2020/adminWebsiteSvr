import axios from './../server/axios';
import utils from './../assets/js/utils'

export const state = () => ({
  token: '',
  subNavIndex: "1",
  categorys: [],
  formDataCategory: {
    title: '',
    name: ''
  },
  templates: {},
  templateInfo: {},
  dataPid: 0,
  dataConfigs: {},
  dataBanners: [],
  dataArticles: [],
  dataArticlesPagination: {
    page: 1,
    limit: 10,
    total: 0
  },
  formDataBanner: {}
})

export const mutations = {
  subNavIndexSet(state, data) {
    state.subNavIndex = data
  },
  categorysSet(state, data) {
    let categorys = data
    let arr = utils.unLimitTreeLevel(categorys)
    console.log('categorysSet categorys:', arr)
    state.categorys = arr
  },
  templatesSet(state, data) {
    let templates = data
    let templatesData = {
      index: [],
      category: [],
      article: []
    }
    Object.keys(templates).forEach(key => {
      let item = templates[key]
      // console.log('templatesSet item:', item)
      let type = item.type
      if (!templatesData[type]) {
        templatesData[type] = []
      }
      templatesData[type].push({
        id: key,
        name: item.name,
        type: type,
        configs: item.configs,
        banners: item.banners,
        articles: item.articles
      })
    })
    state.templates = templatesData
  },
  templateInfoSet(state, data) {
    state.templateInfo = data
  },
  dataPidSet(state, data) {
    state.dataPid = data
  },
  dataConfigsSet(state, data) {
    let dataConfigs = {}
    data.forEach(item => {
      dataConfigs[item.name] = {
        id: item.id,
        value: item.content
      }
    })
    state.dataConfigs = dataConfigs
  },
  dataBannnersSet(state, data) {
    state.dataBanners = data
  },
  dataArticlesSet(state, data) {
    state.dataArticles = data
  },
  dataArticlesPaginationSet(state, data) {
    state.dataArticlesPagination = data
  }
}

export const actions = {

  async getTemplateByName({
    state
  }, data) {
    let ret = await axios.post('/api/template/' + data.name)
    console.log('/action getTemplateByName ret:', ret)
    return ret
  }
}
