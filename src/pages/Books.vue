<template>
  <div>
    <base-button type="primary" @click="toggleModal">
      Launch demo modal
    </base-button>
    <card>
      This is some text within a card body.
    </card>

    <modal :show="modals.modal0" @close="modals.modal0 = false">
      <template v-slot:header>
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
      </template>
      <div>
        <!-- Konten modal di sini -->
      </div>
      <template v-slot:footer>
        <base-button type="secondary" @click="modals.modal0 = false">Close</base-button>
        <base-button type="primary">Save changes</base-button>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  mounted() {
    console.log(process.env.VUE_APP_API_BASE_URL);
  },
  components: {
    'modal': Modal
  },
  data() {
    return {
      modals: {
        modal0: false
      }
    };
  },
  methods: {
    toggleModal() {
      this.modals.modal0 = !this.modals.modal0;
    }
  }
};
</script>
