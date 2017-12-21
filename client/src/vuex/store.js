/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const http = axios.create({
  baseURL: 'http://localhost:8000/'

})

Vue.use(Vuex)
const state = {
  dataKtp: {},
}

const mutations = {

}
const actions = {
  postVision ({commit}, payload) {
    http.post('/api/vision', {
      uri: payload
    })
    .then({data})
    console.log('dataVision :', data)
    .catch(err => {
      console.log('err :', err)
    })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store