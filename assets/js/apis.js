import axios from './axios'

export default {

  async getTemplates() {
    let ret = await axios.post('/api/templates')
    return ret
  },

  async getTemplateInfo(data = {}) {
    let ret = await axios.post('/api/template/info', {
      name: data.name
    })
    return ret
  },

  async getCategoryData(data = {}) {
    let ret = await axios.post('/api/website/info/getDataList', {
      category: data.category
    })
    return ret
  },

  async getDocumentData(data = {}) {
    let ret = await axios.post('/api/website/info/getDataList', {
      category: "document",
      type: data.type || 'config',
      page: data.page || 1,
      limit: data.limit || 0,
      pid: data.pid
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
