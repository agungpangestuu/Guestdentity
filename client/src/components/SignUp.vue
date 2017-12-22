<template>
<div>
  
  <form @submit.prevent="loginBtn">
    <label for="Username"></label>
    <input type="text" v-model="user.username" placeholder="username">
    <br>
    <label for="Email"></label>
    <input type="text" v-model="user.email" placeholder="email">
  </form>
  <button id="fbLogin" @click="loginBtn">Submit</button>
     <div id="app" class="component">
      <webcam ref="webcam"></webcam>
      <img :src="this.photo" style="width:300px;height:300px; display:none"/>
      <!-- <button type="button" @click="take_photo">Capture Photo</button> -->
    </div>
</div>
  
</template>

<script>
/* eslint-disable */
import webcam from './WebCam'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'SignUp',
  components: {webcam},
  data: function () {
    return {
      photo: null
    }
  },
  computed: mapState([
    'user'
  ]),
  methods: {
    ...mapActions([
      'login',
      'logout',
      'postVision'
    ]),
    loginBtn: function () {
      localStorage.setItem('flag', 'signup')
      this.take_photo()
      this.postVision()
      // this.login(user)
    },
    take_photo: function () {
      this.photo = this.$refs.webcam.capture()
    }
  }
}
</script>

<style>

</style>
