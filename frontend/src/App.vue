<template>
  <Layout>
    <router-view/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop,Watch } from 'vue-property-decorator';
import Layout from './components/layout/Layout.vue';
import router from './router/index'
import Received from './views/Resume.vue';

@Component(
  {
    components:{
        Layout
    }
  }
)
export default class App extends Vue {
/*
  created() {
    let { routes } = this.$router.options;
    console.log(routes);
    let routeData = routes.find(r => r.path === this.$route.path);
    routeData.children = [
      { path: 'bar', component: () => import('./views/Received.vue') }    
    ];
    console.log(routeData);
    this.$router.addRoutes([routeData])
  } */

  created() {
    let { routes } = this.$router.options;
    routes!.push({ path: '/bar', component: () => import('./views/Resume.vue'), name: 'Bar' }  )!
    this.$router.addRoutes(routes!)
  }
}

</script>

<style lang="scss">
@import '@/styles/main.scss';

</style>
