<template>
  <div>
    <base-button type="primary" @click="addBorrowing">
      Add Borrowing
    </base-button>
    <card class="mt-3">
      <h4 class="card-title">List Books</h4>
      <TableIndex :data="borrowings" />
    </card>
    <!-- modal add borrowing -->
    <modal
      body-classes="p-0"
      :centered="true"
      :show="modals.modalAdd"
      :showClose="false"
      @close="modals.modal0 = true"
      modal-classes="modal-lg"
    >
      <card
        type="secondary"
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0 mb-0"
      >
        <template v-slot:default>
          <div class="text-muted mb-4">
            <h4>{{ modals.modalTitle }}</h4>
          </div>
          <form @submit.prevent>
            <base-input
              label="Borrowing Date"
              type="date"
              v-model="borrowing.borrowing_date"
            ></base-input>
            <base-input
              label="Return Date"
              type="date"
              v-model="borrowing.return_date"
            ></base-input>
            <span style="color: #83848f; font-size: 12px">Member</span>
            <v-select
              v-model="borrowing.member_id"
              class="dark-mode-select"
              :options="options"
              :reduce="(option) => option.id"
            ></v-select>
          </form>
          <div class="text-right">
            <base-button type="warning btn-sm" @click="modals.modalAdd = false"
              >Close</base-button
            >
            <base-button type="success ml-2 btn-sm" @click="submit"
              >Save</base-button
            >
          </div>
        </template>
      </card>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
import TableIndex from "./components/IndexTable.vue";
import Modal from "@/components/Modal.vue";
import BaseInput from "../../components/Inputs/BaseInput.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    TableIndex,
    Modal,
    BaseInput,
    vSelect,
  },
  data() {
    return {
      borrowings: [],
      borrowing: {
        borrowing_date: "",
        return_date: "",
        member_id: "",
        books: [],
      },
      modals: {
        modalAdd: false,
        modalTitle: "",
      },
      options: [
        {
          id: 1,
          label: "foo",
        },
        {
          id: 2,
          label: "bar",
        },
      ],
    };
  },
  async mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(this.$baseURL + "/book_borrowings", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.status === 200) {
          this.borrowings = response.data.data.map((borrowing, index) => ({
            ...borrowing,
            index: index + 1,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    addBorrowing() {
      this.modals.modalTitle = "Add Borrowing";
      this.modals.modalAdd = true;
    },
    submit() {
      // Add your submit logic here
    },
  },
};
</script>

<style scoped>
.dark-mode-select >>> .vs__dropdown-toggle {
  background-color: #27293d !important; /* Dark background for the dropdown toggle */
  color: white !important; /* Light text for the dropdown toggle */
  border: 1.5px solid #2a314b !important; /* Adding a border */
}

.dark-mode-select >>> .vs__dropdown-menu {
  background-color: #333 !important; /* Dark background for the dropdown menu */
  color: white !important; /* Light text for the dropdown menu */
}

.dark-mode-select >>> .vs__search,
.dark-mode-select >>> .vs__selected {
  color: white !important; /* Light text for the search input and selected items */
}
</style>
