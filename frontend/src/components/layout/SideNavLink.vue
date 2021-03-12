<template>
    <router-link :to="submenu === true ? '/'+parent_route+'/'+link.id_route : '/'+link.url_route">
        <b-row  :class="submenu === true ? 'p-3 pl-4 link' : 'p-3 link'" style="align-items: center;">
            <b-icon v-if="link.icon" :icon="link.icon" class="icon-dark"></b-icon>
            <b-icon v-else icon="dot" class="icon-dark"></b-icon>
            <div class="ml-3 hide-on-tab-port">{{link.name_route}}</div>         
            <b-badge variant="light" v-if="link.pending">{{link.pending}}</b-badge>
        </b-row>
    </router-link>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Route } from '../../modules/routes/interfaces/routes.interface'

  @Component
  export default class SideNavLink extends Vue {
    @Prop() link! : Route;
    @Prop() submenu? : boolean;
    @Prop() parent_route? : string;
  }

</script>