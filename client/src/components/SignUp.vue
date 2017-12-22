<template>
<div>
  <div class="container" is-white>
    <div class="notification">
      <div class="columns">
      <div class="column">
        
        <div class="field">
          <label class="label">Upload KTP</label>
          <div class="control">
              <div v-if="!image">
                <h2>Select an image</h2>
                <input type="file" @change="onfileChange">
              </div>
              <div v-else>
                <img :src="imagePreview" />
                <button @click="removeImage">Remove image</button>
              </div>
          </div>
        </div>
        
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email input">
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
      photo: null,
      image: null,
      imagePreview: ''
    }
  },
  computed: mapState([
    'user',
  ]),
  methods: {
    ...mapActions([
      'login',
      'logout',
      'postKtp',
      'postVision'
    ]),
    onfileChange: function (e) {
      console.log('hello')
      var files = e.target.files || e.dataTransfer.files
       if (!files.length)
        return;
      this.image = files[0]
      this.createImage(files[0]);
    },
     createImage: function (file) {
      var image = new Image()
      var reader = new FileReader()
      var vm = this
      reader.onload = (e) => {
        vm.imagePreview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e) {
      this.image = ''
    },
    loginBtn: function () {
      localStorage.setItem('flag', 'signup')
      this.postKtp(this.image)
      this.take_photo()
    },
    take_photo: function () {
      this.photo = this.$refs.webcam.capture()
    }
  }
}
</script>

<style>
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
button {
  
}

</style>
