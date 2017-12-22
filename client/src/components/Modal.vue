<template>
  <div>
  <a class="button is-success" @click="showModal">Add</a>
    <card-modal :visible="active" :title="title" transition="zoom">
      <div class="content">
        <p>Selamat Datang Apa Keperluan Mu disini?</p>
        </div>
    </card-modal>
</div>
</template>

<script>
import { Modal, ImageModal, CardModal } from 'vue-bulma-modal'
import { mapActions } from 'vuex'
export default {
  name: 'Modal',
  components: {
    Modal,
    ImageModal,
    CardModal
  },
  data () {
    return {
      active: false,
      title: 'Add'
    }
  },
  methods: {
    ...mapActions([
    ]),
    showModal: function () {
      console.log('helo')
      this.active = this.active = !this.active
    }
  }
}
</script>
<style scoped>

</style>
