<template>
  <div class="hello">
    <div class="container">
      <div class="notification">
        <h1> Selamat Datang Di  GuestDentity</h1>
        <a class="button is-primary is-outlined" @click="logout">logout</a>
      </div>
      <Modal/>
      <Tabel/>

    </div>

  </div>
</template>

<script>
import Tabel from './Tabel'
import Modal from './Modal'
export default {
  name: 'Hompage',
  components: { Tabel, Modal },
  data () {
    return {
      name: localStorage.getItem('name')
    }
  },
  methods: {
    logout: function () {
      localStorage.removeItem('faceId')
      localStorage.removeItem('name')
      localStorage.removeItem('flag')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
