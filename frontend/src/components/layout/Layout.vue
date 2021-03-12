<template>
   <div class="app">
            <Header></Header>
            <b-row style="min-height:100vh">
                <SideNav :links="getUserRoutes"/>
                <b-col cols="10" class="content" align-self="stretch">
                    <slot></slot>
                </b-col>
            </b-row>        
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Header from './Header.vue';
import SideNav from './SideNav.vue';
import {users} from '../../store/namespaces';
import UsersMethods from '../../store/users/methods/users.methods';
import { Route } from '../../modules/routes/interfaces/routes.interface';

@Component({
    components:{
        Header,
        SideNav
    }
})
export default class Layout extends Vue {
    
   async mounted(){
        await this.fetchUserRoutes(1);
        let { routes } = this.$router.options;
        let id = ''
        for (var i=0;i<this.getUserRoutes.length;i++){
            const component = () =>  import('../../views/'+this.getUserRoutes[i].component)
            if (this.getUserRoutes[i].submenu) id = '/:id' 
            else id=''
            let object = { path: '/'+this.getUserRoutes[i].url_route + id, component: component, name: this.getUserRoutes[i].name_route }
           // routes!.push(object)
            this.$router.addRoute(object)         
        }
       // this.$router.addRoutes(routes!)
        console.log(this.$router.getRoutes())
    }

  @users.Getter(UsersMethods.getters.GET_USER_ROUTES)
    getUserRoutes!: Route[];
  @users.Action(UsersMethods.actions.FETCH_USER_ROUTES)
    fetchUserRoutes!: (id: number) => boolean;
}
</script>