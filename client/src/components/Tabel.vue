<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Keperluan</th>
          <th>Tanggal</th>
        </tr>
      </thead>
      <tbody> 
        <tr>
          <td>{{name}}</td>
          <td>Mo ketemu mbak ica</td>
          <td>Malam JUmat</td>
          
        </tr>  
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data () {
    return {
      name: localStorage.getItem('name')
    }
  }
}
</script>

<style>

</style>
