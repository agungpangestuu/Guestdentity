<template>
<div>
  <div class="container" is-white>
    <div class="notification">
      <div class="columns">
      <div class="column">
        
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input is-success" type="text" v-model="user.username" placeholder="Text input" value="bulma">
          </div>
        </div>
        
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" v-model="user.email" placeholder="Email input">
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-warning"></i>
            </span>
          </div>
        </div>
      
        <button id="fbLogin" @click="loginBtn">Submit</button>
      </div>

      <div class="column">
        <div id="app" class="component">
          <webcam ref="webcam"></webcam>
          <img :src="this.photo" style="width:300px;height:300px; display:none"/>
          <!-- <button type="button" @click="take_photo">Capture Photo</button> -->
        </div>
      </div>
    </div>
  </div>
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
      'logout'
    ]),
    loginBtn: function () {
      localStorage.setItem('flag', 'signup')
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
