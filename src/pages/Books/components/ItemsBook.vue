<template>
  <div>
    <base-table :data="bookItems">
      <template slot="columns">
        <th>No</th>
        <th>ISBN</th>
        <th>Status</th>
      </template>
      <template slot-scope="{ row }">
        <td>{{ row.index }}</td>
        <td>{{ row.Isbn }}</td>
        <td v-if="row.Status == 1">
          <span class="badge badge-success text-dark">Tersedia</span>
        </td>
        <td v-else>
          <span class="badge badge-danger text-dark">Tidak Tersedia</span>
        </td>
        <td class="td-actions text-right" width="17%">
          <base-button
            @click="edit(row.ID)"
            type="default"
            size="sm"
            icon
            data-toggle="collapse"
          >
            <i class="tim-icons icon-pencil"></i>
          </base-button>
          <base-button type="danger ml-2" size="sm" icon data-toggle="collapse">
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
    bookItems: Array,
  },
  methods: {
    async edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>
