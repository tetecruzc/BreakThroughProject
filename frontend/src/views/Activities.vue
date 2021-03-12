<template>
  <div class="home">
    <h1>Activities</h1>
    <b-tabs content-class="mt-3">
        <b-tab v-for="(item,i) in getUserActivitiesRoutes.children" :key="i" :title="item.name_route" ><p>I'm the first tab</p></b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {users} from '../store/namespaces';
import UsersMethods from '../store/users/methods/users.methods';
import { Route } from '../modules/routes/interfaces/routes.interface';

@Component({
  components: {

  },
})
export default class Activities extends Vue {

    async created(){
        await this.fetchUserActivitiesRoutes(3);
    }

    @users.Getter(UsersMethods.getters.GET_ACTIVITIES_USER_ROUTES)
      getUserActivitiesRoutes!: Route[];
    @users.Action(UsersMethods.actions.FETCH_ACTIVITIES_USER_ROUTES)
      fetchUserActivitiesRoutes!: (id: number) => boolean;
}
</script>