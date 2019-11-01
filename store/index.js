import axios from './../server/axios';

export const state = () => ({
  token: '',
  categorys: [],
  formDataCategory: {
    title: '',
    name: ''
  },
  templateInfo: {},
  formDataBanner: {}
})

export const mutations = {
  categorysSet(state, data) {
    state.categorys = data
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
