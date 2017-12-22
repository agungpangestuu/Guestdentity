<template>
<div>
  <h1>Halaman Login</h1>
  <a class="button is-primary is-outlined" @click="loginBtn">Login</a>
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
  name: 'Login',
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
      'logout'
    ]),
    loginBtn: function () {
      localStorage.setItem('flag', 'login')
      this.take_photo()
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
