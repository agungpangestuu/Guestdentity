<template>
  <div class="hello">
    <div class="container">
      <div class="notification">
        <h1>Selamat Datang Di Hacktiv8</h1>
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
