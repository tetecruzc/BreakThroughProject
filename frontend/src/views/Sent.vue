<template>
  <div class="home">
    <h1>{{getUserActivitiesRoutes.name_route}}</h1>
    <b-tabs content-class="mt-3">
        <b-tab v-for="(item,i) in getUserActivitiesRoutes.children" :key="i" :title="getTabName(item)" @click="getSubRoute(item.id_route)"></b-tab>
    </b-tabs>
    <b-tabs content-class="mt-3" v-if="getUserActivitiesSubRoutes.children">
        <b-tab v-for="(item,i) in getUserActivitiesSubRoutes.children" :key="i" :title="getTabName(item)" >
          <p>I'm the first tab</p>
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
export default class Sent extends Vue {

    async created(){
      await this.fetchUserActivitiesRoutes(parseInt(this.$route.params.id));
    }

    @Watch('$route')
    async fetchNewActivitiesRoutes(val : any){
       await this.fetchUserActivitiesRoutes(parseInt(this.$route.params.id));
    }

    getTabName(item: Route) : string{
      if (item.pendings !== undefined) return item.name_route+ ' (' + item.pendings+')'
      else return item.name_route
    }

    async getSubRoute(id: number){
        let activityId = this.$route.params.id
        let routeId = id.toString();
        await this.fetchUserActivitiesSubRoutes(activityId+'/'+routeId)
        console.log('hey')
        console.log(this.getUserActivitiesSubRoutes)
    }

    @users.Getter(UsersMethods.getters.GET_ACTIVITIES_USER_ROUTES)
      getUserActivitiesRoutes!: Route;
    @users.Action(UsersMethods.actions.FETCH_ACTIVITIES_USER_ROUTES)
      fetchUserActivitiesRoutes!: (id: number) => boolean;
    @users.Getter(UsersMethods.getters.GET_ACTIVITIES_USER_SUBROUTES)
      getUserActivitiesSubRoutes!: Route;
    @users.Action(UsersMethods.actions.FETCH_ACTIVITIES_USER_SUBROUTES)
      fetchUserActivitiesSubRoutes!: (id: string) => boolean;
}
</script>

