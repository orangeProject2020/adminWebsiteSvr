import axios from './../server/axios';
import utils from './../assets/js/utils'

export const state = () => ({
  token: '',
  categorys: [],
  formDataCategory: {
    title: '',
    name: ''
  },
  templates: {},
  templateInfo: {},
  formDataBanner: {}
})

export const mutations = {
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
