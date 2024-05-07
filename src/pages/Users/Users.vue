<template>
  <div>
    <base-button type="primary" @click="create()"> Add User </base-button>
    <card class="mt-3">
      <h4 class="card-title">List Users</h4>
      <base-table :data="users">
        <template slot="columns">
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
        </template>
        <template slot-scope="{ row }">
          <td>{{ row.index }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.email }}</td>
          <td class="td-actions text-right">
            <base-button type=" ml-2" size="sm" icon @click="edit(row.id)">
              <i class="tim-icons icon-pencil"></i>
            </base-button>
            <base-button type="danger ml-2" size="sm" icon @click="del(row.id)">
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </td>
        </template>
      </base-table>
    </card>
    <modal
      body-classes="p-0"
      :centered="false"
      :show="modals.modalForm"
      :showClose="false"
      @close="modals.modalForm = true"
      modal-claseses="modal-sm"
    >
      <card
        type="secondary"
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0 mb-0"
      >
        <template>
          <div class="text-muted mb-4">
            <h4>{{ modals.modalTitle }}</h4>
          </div>
          <form>
            <base-input
              label="Name"
              type="text"
              placeholder="Enter Name"
              v-model="user.name"
            >
            </base-input>
            <base-input
              label="Email"
              type="email"
              placeholder="Enter Email"
              v-model="user.email"
            >
            </base-input>
            <base-input
              label="Password"
              type="password"
              :placeholder="label.password"
              v-model="user.password"
            >
            </base-input>
          </form>
          <div class="text-right">
            <base-button type="warning btn-sm" @click="modals.modalForm = false"
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
import { BaseTable } from "@/components";
import Modal from "@/components/Modal.vue";
import Swal from "sweetalert2";
export default {
  name: "UserPage",
  components: {
    BaseTable,
    modal: Modal,
  },
  data() {
    return {
      users: [],
      modals: {
        modalForm: false,
        modalTitle: "",
      },
      user: {},
      label: {
        password: "",
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const authoToken = localStorage.getItem("authToken");
      try {
        const response = await axios.get(this.$baseURL + "/users", {
          headers: { Authorization: `Bearer ${authoToken}` },
        });
        if (response.status === 200) {
          this.users = response.data.data.map((member, index) => ({
            ...member,
            index: index + 1,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    create() {
      this.user = {
        name: "",
        email: "",
        password: "",
        id: 0,
      };
      this.modals.modalTitle = "Add New User";
      this.label.password = "Enter Password";
      this.modals.modalForm = true;
    },
    async submit() {
      const authoToken = localStorage.getItem("authToken");
      if (this.user.id === 0) {
        //new user
        try {
          const response = await axios.post(
            this.$baseURL + "/users",
            this.user,
            {
              headers: { Authorization: `Bearer ${authoToken}` },
            }
          );
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success Save Data",
              showConfirmButton: false,
              timer: 1500,
            });
            this.fetchData();
            this.modals.modalForm = false;
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            const errorMessages = error.response.data.meta.message;
            this.error = errorMessages.map((msg) => `${msg}`).join("");
            Swal.fire({
              icon: "error",
              title: "Failed To Save Data",
              html: this.error,
              showConfirmButton: true,
            });
            console.error("Submission error:", this.error);
          } else if (error.response && error.response.status === 500) {
            const errorMessages = error.response.data.meta.message;
            this.error = errorMessages;
            console.error("Server error:", this.error);
          } else {
            console.error("Unexpected error:", error);
          }
        }
      } else {
        //update user
        const authToken = localStorage.getItem("authToken");
        try {
          const response = await axios.put(
            this.$baseURL + `/users/${this.user.id}`,
            this.user,
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success Save Data",
              showConfirmButton: false,
              timer: 1500,
            });
            this.fetchData();
            this.modals.modalForm = false;
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            const errorMessages = error.response.data.meta.message;
            this.error = errorMessages.map((msg) => `${msg}`).join("");
            Swal.fire({
              icon: "error",
              title: "Failed To Save Data",
              html: this.error,
              showConfirmButton: true,
            });
            console.error("Submission error:", this.error);
          } else if (error.response && error.response.status === 500) {
            const errorMessages = error.response.data.meta.message;
            this.error = errorMessages;
            console.error("Server error:", this.error);
          } else {
            console.error("Unexpected error:", error);
          }
        }
      }
    },
    async edit(id) {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(this.$baseURL + `/users/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (response.status === 200) {
          this.user = response.data.data;
          this.user.password = "";
          this.modals.modalTitle = "Edit User";
          this.label.password = "Keep blank if not update password";
          this.modals.modalForm = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
