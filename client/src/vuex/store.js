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
  nama: '',
  ktp: null
}

const mutations = {
  setKtp (state, payload) {
    state.ktp = payload
  },
  setData (state, payload) {
    localStorage.setItem('name', payload)
    state.nama = payload
  }
}
const actions = {
  postVision ({state, commit}, payload) {
    console.log('payload post: ', state.ktp)
    let formData = new FormData()
    formData.append('file', state.ktp)
    console.log('form data ====== :', formData)
    axios.post('http://localhost:8000/api/upload/', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(({data}) => {
      console.log('dataVision :', data)
      commit('setData', data.guest.nama)
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