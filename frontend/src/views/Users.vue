<template>
  <div class="home">
    <UsersTable />
    <TableTest/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UsersTable from '../modules/users/components/UsersTable.vue'; // @ is an alias to /src
import TableTest from '../components/TableTest.vue'
@Component({
  components: {
    UsersTable,
    TableTest
  },
})
export default class Home extends Vue {}
</script>
