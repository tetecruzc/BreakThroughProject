<template>
   <div class="app min-vh-100">
            <Header></Header>
            <SideNav :links="getUserRoutes"/>
            <!-- <b-row style="min-height:100vh">
                <SideNav :links="getUserRoutes"/>
                <b-col cols="10" class="content" align-self="stretch">
                    <slot></slot>
                </b-col>
            </b-row>        -->
            <div class="content">
                <slot></slot>
            </div>
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Header from './Header.vue';
import SideNav from './SideNav.vue';
import {users} from '../../store/namespaces';
import UsersMethods from '../../store/users/methods/users.methods';
import { Route } from '../../modules/routes/interfaces/routes.interface';
import {getRoutes} from '../../utils/routes-functions'

@Component({
    components:{
        Header,
        SideNav
    }
})
export default class Layout extends Vue {
    
   async mounted(){
        await this.fetchUserRoutes(1);
        getRoutes(this.getUserRoutes,this.$router)
        console.log(this.getUserRoutes)
    }

  @users.Getter(UsersMethods.getters.GET_USER_ROUTES)
    getUserRoutes!: Route[];
  @users.Action(UsersMethods.actions.FETCH_USER_ROUTES)
    fetchUserRoutes!: (id: number) => boolean;
}
</script>