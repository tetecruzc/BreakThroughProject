<template>
  <b-col cols="2" class="side-bar" align-self="stretch" sticky>
      <div v-for="(link,i) in links" :key="i">
        <SideNavLink v-if="!link.submenu" :link="link"/>
        <div v-else  class="submenu">
            <b-row class="p-3 link ">
                <b-icon :icon="link.icon" class="icon-dark"></b-icon>
                <div class="ml-3 hide-on-tab-port">{{link.name_route}}</div> 
            </b-row>
            <div class="link-submenu">
                <SideNavLink v-for="(submenu, j) in link.submenu" :key="j" :link="submenu" :submenu="true" :parent_route="link.url_route" />
            </div>
        </div>
      </div>
  </b-col>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Route } from '../../modules/routes/interfaces/routes.interface'
  import SideNavLink from './SideNavLink.vue'

  @Component({
    components:{
      SideNavLink
    }
  })
  export default class SideNav extends Vue {
      @Prop() links! : Route[];

  }
</script>

<style scoped lang="scss">
/*.submenu:hover{
    & > .link-submenu{
      visibility: visible;
      height: 100%;
    }
}
.submenu > .link-submenu{
  visibility: hidden;
  height: 0px;
  transition: all .3s;
} */
</style>