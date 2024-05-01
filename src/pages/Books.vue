<template>
  <div>
    <base-button type="primary" @click="toggleModal"> Add Book </base-button>
    <card class="mt-3">
      <h4 class="card-title">List Books</h4>
      <base-table :data="books">
        <template slot="columns">
          <th>No</th>
          <th>Title</th>
          <th>Year Of Publication</th>
        </template>
        <template slot-scope="{ row }">
          <td>{{ row.index }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.year_of_publication }}</td>
          <td class="td-actions text-right" width="17%">
            <base-button type="info" size="sm" icon @click="detil(row.id)">
              <i class="tim-icons icon-image-02"></i>
            </base-button>
            <base-button type=" ml-2" size="sm" icon>
              <i class="tim-icons icon-pencil"></i>
            </base-button>
            <base-button type="danger ml-2" size="sm" icon>
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </td>
        </template>
      </base-table>
    </card>
    <modal
      body-classes="p-0"
      :centered="true"
      :show="modals.modal0"
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
        <template>
          <div class="text-muted mb-4">
            <h4>Add New Book</h4>
          </div>
          <form @submit.prevent>
            <base-input
              label="Title"
              type="text"
              placeholder="Enter title book"
              v-model="book.name"
            >
            </base-input>
            <base-input
              label="ISBN"
              type="text"
              placeholder="Enter ISBN"
              v-model="book.isbn"
            >
            </base-input>
            <base-input
              label="Year Of Publication"
              type="number"
              placeholder="Enter Year Of Publication"
              v-model="book.year_of_publication"
            >
            </base-input>
            <base-input
              label="URL image cover"
              type="text"
              placeholder="Enter URL image cover"
              v-model="book.img_url_cover"
            >
            </base-input>
            <base-input
              label="URL Image Thumbnail"
              type="text"
              placeholder="Enter URL Image Thumbnail"
              v-model="book.img_url_thumbnail"
            >
            </base-input>
            <base-input label="Auhtor">
              <select class="form-control" v-model="book.author_id">
                <option value="0">Select Author</option>
                <option
                  v-for="(data, index) in authors"
                  :key="index"
                  :value="data.id"
                >
                  {{ data.name }}
                </option>
              </select>
            </base-input>
            <base-input label="Publisher">
              <select class="form-control" v-model="book.publisher_id">
                <option value="0">Select Publiser</option>
                <option
                  v-for="(data, index) in publishers"
                  :key="index"
                  :value="data.id"
                >
                  {{ data.name }}
                </option>
              </select>
            </base-input>
            <base-input label="Description">
              <editor
                :api-key="tinymceConfig.api_key"
                :init="{
                  skin: 'oxide-dark',
                  content_css: 'dark',
                  min_height: 400,
                }"
                v-model="book.description"
              />
            </base-input>
          </form>
          <div class="text-right">
            <base-button type="warning" @click="modals.modal0 = false"
              >Close</base-button
            >
            <base-button type="success ml-2" @click="submit">Save</base-button>
          </div>
        </template>
      </card>
    </modal>
    <modal
      :centered="true"
      :show="modals.modalDetil"
      :showClose="true"
      @close="modals.modalDetil = false"
      modal-classes="modal-lg"
    >
      <template slot="header">
        <h3 class="modal-title" id="exampleModalLabel">
          Detil Book: {{ book.name }}
        </h3>
      </template>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-6">
            <img
              class="img-fluid rounded shadow mb-3"
              :src="book.img_url_cover"
              alt="Cover image"
            />
          </div>
          <div class="col-md-6">
            <h5>Details</h5>
            <p><strong>ISBN:</strong> {{ book.isbn }}</p>
            <p>
              <strong>Year of Publication:</strong>
              {{ book.year_of_publication }}
            </p>
            <p><strong>Author:</strong> {{ book.author }}</p>
            <p><strong>Publisher:</strong> {{ book.publiser }}</p>
            <base-button type="default"
              ><i class="tim-icons icon-bullet-list-67"></i> List Item
              Books</base-button
            >
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-12">
            <div class="description-text" v-html="book.description"></div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <base-button type="warning" @click="modals.modalDetil = false"
          >Close</base-button
        >
      </div>
    </modal>
  </div>
</template>
<style>
.description-text h1 {
  color: #011038;
}
</style>
<script>
import Modal from "@/components/Modal.vue";
import axios from "axios";
import { BaseTable } from "@/components";
import Editor from "@tinymce/tinymce-vue";
import Swal from "sweetalert2";
export default {
  components: {
    modal: Modal,
    BaseTable,
    Editor,
  },
  data() {
    return {
      modals: {
        modal0: false,
        modalDetil: false,
      },
      books: [],
      authors: [],
      publishers: [],
      book: {},
      tinymceConfig: {
        api_key: this.$tinyKey,
      },
      error: [],
    };
  },
  mounted() {
    this.fetchData();
    console.log(this.tinymceConfig);
  },
  methods: {
    toggleModal() {
      this.modals.modal0 = !this.modals.modal0;
      this.book = {
        name: "",
        isbn: "",
        year_of_publication: "",
        img_url_thumbnail: "",
        img_url_cover: "",
        description: "",
        author_id: 0,
        publisher_id: 0,
      };
    },
    async fetchData() {
      try {
        const authToken = localStorage.getItem("authToken");
        const book = await axios.get(this.$baseURL + "/books", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        this.books = book.data.data.map((book, index) => ({
          ...book,
          index: index + 1, // Menambahkan properti index ke setiap buku
        }));
        const authors = await axios.get(this.$baseURL + "/authors", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        this.authors = authors.data.data.map((authors) => ({
          id: authors.id,
          name: authors.name,
        }));
        const publishers = await axios.get(this.$baseURL + "/publishers", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        this.publishers = publishers.data.data.map((publishers) => ({
          id: publishers.id,
          name: publishers.name,
        }));
      } catch (error) {
        console.log(error);
      }
    },
    async submit() {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await axios.post(this.$baseURL + "/books", this.book, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        console.log(response);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Success Save Data",
          showConfirmButton: false,
          timer: 3000,
        });
        this.fetchData();
        this.modals.modal0 = false;
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
    },
    async detil(id) {
      try {
        const authToken = localStorage.getItem("authToken");
        const book = await axios.get(this.$baseURL + `/books/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        this.book = book.data.data;
        this.book.author = book.data.data.Author.name;
        this.book.publiser = book.data.data.Publisher.name;
        this.modals.modalDetil = true;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
