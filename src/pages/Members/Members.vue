<template>
  <div>
    <base-button type="primary" @click="create()"> Add Member </base-button>
    <card class="mt-3">
      <h4 class="card-title">List Members</h4>
      <base-table :data="members">
        <template slot="columns">
          <th>No</th>
          <th>Name</th>
          <th>Phone</th>
        </template>
        <template slot-scope="{ row }">
          <td>{{ row.index }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.phone_number }}</td>
          <td class="td-actions text-right" width="17%">
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
      modal-classes="modal-sm"
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
              v-model="member.name"
            >
            </base-input>
            <base-input
              label="Phone Number"
              type="text"
              placeholder="Enter Phone Number"
              v-model="member.phone_number"
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
import Modal from "@/components/Modal.vue";
import { BaseTable } from "@/components";
import Swal from "sweetalert2";
export default {
  name: "MemberPage",
  components: {
    BaseTable,
    modal: Modal,
  },
  data() {
    return {
      members: [],
      member: {},
      modals: {
        modalForm: false,
        modalTitle: "",
      },
      error: "",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await axios.get(this.$baseURL + "/library_members", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (response.status === 200) {
          this.members = response.data.data.map((member, index) => ({
            ...member,
            index: index + 1,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    create() {
      this.member = {
        name: "",
        phone_number: "",
        id: 0,
      };
      this.modals.modalTitle = "Add New Member";
      this.modals.modalForm = true;
    },
    async edit(id) {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(
          this.$baseURL + `/library_members/${id}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        if (response.status === 200) {
          this.member = response.data.data;
          this.modals.modalTitle = "Edit Member";
          this.modals.modalForm = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async submit() {
      const authToken = localStorage.getItem("authToken");

      if (this.member.id === 0) {
        //add new member
        try {
          const response = await axios.post(
            this.$baseURL + "/library_members",
            this.member,
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
      } else {
        //update member
        try {
          const response = await axios.put(
            this.$baseURL + `/library_members/` + this.member.id,
            this.member,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
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
    async del(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const authToken = localStorage.getItem("authToken");
            const response = await axios.delete(
              this.$baseURL + `/library_members/${id}`,
              {
                headers: { Authorization: `Bearer ${authToken}` },
              }
            );
            if (response.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "Your data has been deleted.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              this.fetchData();
            }
          } catch (error) {
            console.error(error);
          }
        }
      });
    },
  },
};
</script>
