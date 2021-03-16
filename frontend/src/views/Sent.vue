<template>
  <h1 class="">
    SENT
  </h1>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import {users} from '../store/namespaces';
import UsersMethods from '../store/users/methods/users.methods';
import { Route } from '../modules/routes/interfaces/routes.interface';

@Component({
  components: {

  },
})
export default class Sent extends Vue {

}
</script>

