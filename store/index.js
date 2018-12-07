import Vuex from 'vuex'
import axios from 'axios'
import client from '~/plugins/contentful'

export const state = () => ({
  counter: 12,
  address: []
})

const mutations = {
  increment (state) {
    state.counter++
  },
  getAddress (state, address) {
    state.address = address
    console.log(state.address)
  }
}

const actions = {
  async callApi ({commit}, payload) {
    let api = axios.create()
    api.defaults.baseURL = "http://zipcloud.ibsnet.co.jp"

    await api({
      url: payload.url,
      method: payload.method,
      params: payload.params
    }).then(res => {
      commit('getAddress', res.data.results[0])
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
