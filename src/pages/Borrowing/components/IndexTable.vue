<template>
  <div>
    <base-table :data="data">
      <template slot="columns">
        <th>No</th>
        <th>Member</th>
        <th>Borrowing Date</th>
        <th>Status</th>
      </template>
      <template slot-scope="{ row }">
        <td>{{ row.index }}</td>
        <td>{{ row.LibrarryMember.name }}</td>
        <td>{{ row.borrowing_date }}</td>
        <td v-if="row.is_return == 1">
          <span class="badge badge-success text-dark">returned</span>
        </td>
        <td v-else>
          <span class="badge badge-warning text-dark">un returned</span>
        </td>
        <td>
          <base-button type="info ml-2" size="sm" icon @click="detil(row.id)">
            <i class="tim-icons icon-image-02"></i>
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
    data: Array,
  },
};
</script>
