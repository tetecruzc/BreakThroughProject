<template>
  <div class="home">
    <h1>{{getUserActivitiesRoutes.name_route}}</h1>
    <b-tabs content-class="mt-3">
        <b-tab v-for="(item,i) in getUserActivitiesRoutes.children" :key="i" :title="item.name_route" @click="getSubRoutes(item.id_route)" >         
        </b-tab>
    </b-tabs>
    <b-tabs content-class="mt-3" v-if="getUserActivitiesSubRoutes.children">
        <b-tab v-for="(item2,j) in getUserActivitiesSubRoutes.children" :key="j" :title="item2.name_route +' ('+item2.pendings+')'" >

        </b-tab>
    </b-tabs>
  </div>
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
export default class Activities extends Vue {

    async created(){
        let id = parseInt(this.$route.params.id);
        await this.fetchUserActivitiesRoutes(id);
    }

    @Watch('$route')
      async changeRoute(newVal : any){
          await this.fetchUserActivitiesRoutes(parseInt(newVal.params.id));
      }

    async getSubRoutes(id: number){
        var ids = this.$route.params.id  +'/'+ id.toString()
        await this.fetchUserActivitiesSubRoutes(ids)
    }

    @users.Getter(UsersMethods.getters.GET_ACTIVITIES_USER_ROUTES)
      getUserActivitiesRoutes!: Route[];
    @users.Action(UsersMethods.actions.FETCH_ACTIVITIES_USER_ROUTES)
      fetchUserActivitiesRoutes!: (id: number) => boolean;
    @users.Getter(UsersMethods.getters.GET_ACTIVITIES_USER_SUBROUTES)
      getUserActivitiesSubRoutes!: Route[];
    @users.Action(UsersMethods.actions.FETCH_ACTIVITIES_USER_SUBROUTES)
      fetchUserActivitiesSubRoutes!: (id: string) => boolean;
}
</script>