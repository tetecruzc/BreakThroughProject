<template>
  <div class="home">
    <UsersTable />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UsersTable from '../modules/users/components/UsersTable.vue'; // @ is an alias to /src
@Component({
  components: {
    UsersTable,
  },
})
export default class Home extends Vue {

}
</script>
