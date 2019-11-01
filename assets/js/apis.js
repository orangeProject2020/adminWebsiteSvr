import axios from './axios'

export default {

  async getTemplates() {
    let ret = await axios.post('/api/templates')
    return ret
  },

  async getTemplateInfo() {
    let ret = await axios.post('/api/template/info')
    return ret
  },

  async getCategoryData(data = {}) {
    let ret = await axios.post('/api/website/info/getDataList', {
      category: data.category
    })
    return ret
  },

  async websiteDataCreate(data = {}) {
    let ret = await axios.post('/api/website/admin/dataCreate', data)
    return ret
  },

  async websiteDataUpdate(data = {}) {
    let ret = await axios.post('/api/website/admin/dataUpdate', data)
    return ret
  }


}
