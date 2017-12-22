/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { log } from 'util';
import { stat } from 'fs';

const http = axios.create({
  baseURL: 'http://localhost:8000/'

})

Vue.use(Vuex)
const state = {
  user: {
    username: '',
    email: '',
    alamat: ''
  },
  ktp: null
}

const mutations = {
  setKtp (state, payload) {
    state.ktp = payload
  }
}
const actions = {
  postVision ({state, commit}, payload) {
    console.log('payload post: ', state.ktp)
    let formData = new FormData()
    formData.append('image', state.ktp)
    console.log('form data ====== :', formData)
    axios.post('http://localhost:8000/api/upload/', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(result => {
      console.log('dataVision :', result)
    })
    .catch(err => {
      console.log('err :', err)
    })
  },
  postKtp ({commit}, payload) {
    console.log(payload)
    commit('setKtp', payload)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store