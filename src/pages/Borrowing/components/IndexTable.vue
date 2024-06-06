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
