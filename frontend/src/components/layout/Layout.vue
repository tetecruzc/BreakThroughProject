<template>
   <div class="app min-vh-100 d-flex flex-column bd-highlight">
            <Header></Header>
            <SideNav :links="getUserRoutes"/>
            <div class="content flex-grow-1 d-flex justify-content-center align-items-center">
                <slot></slot>
            </div>
            <!--FOOTER-->
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