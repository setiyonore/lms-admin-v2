<template>
  <div>
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
          <base-button
            type="primary"
            size="sm"
            icon
            @click="getListItem(row.id)"
          >
            <i class="tim-icons icon-bullet-list-67"></i>
          </base-button>
          <base-button type="info ml-2" size="sm" icon @click="detil(row.id)">
            <i class="tim-icons icon-image-02"></i>
          </base-button>
          <base-button type=" ml-2" size="sm" icon @click="edit(row.id)">
            <i class="tim-icons icon-pencil"></i>
          </base-button>
          <base-button type="danger ml-2" size="sm" icon @click="del(row.id)">
            <i class="tim-icons icon-simple-remove"></i>
          </base-button>
        </td>
      </template>
    </base-table>
  </div>
</template>

<script>
import { BaseTable } from "@/components";
export default {
  components: {
    BaseTable,
  },
  props: {
    books: Array,
  },
  methods: {
    async getListItem(id) {
      this.$emit("list-item", id);
    },
    async detil(id) {
      this.$emit("detil", id);
    },
    edit(id) {
      this.$emit("edit", id);
    },
    async del(id) {
      this.$emit("del", id);
    },
  },
};
</script>
