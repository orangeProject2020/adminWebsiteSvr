import axios from './axios'

export default {

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

  async categoryUpdate(data = {}) {

  }


}
