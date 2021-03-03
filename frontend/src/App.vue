<template>
  <Layout>
    <router-view/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop,Watch } from 'vue-property-decorator';
import Layout from './components/layout/Layout.vue';

@Component(
  {
    components:{
        Layout
    }
  }
)
export default class App extends Vue {

  

}
</script>

<style lang="scss">
@import '@/styles/main.scss';

</style>
