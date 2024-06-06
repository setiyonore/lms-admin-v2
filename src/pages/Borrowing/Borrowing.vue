<template>
  <div>
    <card class="mt-3">
      <h4 class="card-title">List Books</h4>
      <TableIndex :data="borrowings" />
    </card>
  </div>
</template>
<script>
import axios from "axios";
import TableIndex from "./components/IndexTable.vue";
export default {
  components: {
    TableIndex,
  },
  data() {
    return {
      borrowings: [],
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
        if (response.status == 200) {
          this.borrowings = response.data.data.map((borrowing, index) => ({
            ...borrowing,
            index: index + 1,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
