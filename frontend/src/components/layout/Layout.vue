.<template>
   <div class="app">
            <Header></Header>
            <b-row style="min-height:100vh">
                <SideNav  :links="links"/>
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
@Component({
    components:{
        Header,
        SideNav
    }
})
export default class Layout extends Vue {
    links=[
    {name: 'Usuarios', icon: 'people-fill', url:'', active: true},
    {name: 'Mensajes', icon: 'chat-text-fill', url:'', active: false},
    {name: 'Notificaciones', icon: 'bell-fill', url:'', active: false}
  ]
}
</script>

<style>

</style>