<template>
  <div id="app">
    <b-navbar sticky toggleable="lg">
    <b-icon icon="compass" class="icon-light mr-2" font-scale="2"></b-icon>
    <b-navbar-brand href="#">IntraSys</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
  </b-navbar>
   <b-row style="min-height:100vh">
    <b-col cols="2"  class="side-bar" align-self="stretch" sticky>
        <b-row class="p-3 link link-active">
          <b-icon icon="people-fill" class="icon-dark"></b-icon>
           <div class="ml-3 hide-on-tab-port">Usuarios</div> 
           </b-row>
           <b-row class="p-3 link">
          <b-icon icon="chat-text-fill" class="icon-dark"></b-icon>
          <div class="ml-3 hide-on-tab-port"> Mensajes</div> </b-row>
        <b-row class="p-3 link">
          <b-icon icon="bell-fill" class="icon-dark"></b-icon>
          <div class="ml-3 hide-on-tab-port"> Notificaciones</div> </b-row>
    </b-col>
    <b-col cols="10"  class="content" align-self="stretch"><router-view/></b-col>
   </b-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop,Watch } from 'vue-property-decorator';

@Component(
  {
    components:{
      
    }
  }
)
export default class App extends Vue {
}
</script>

<style lang="scss">
@mixin respond($breakpoint){
 
    
    @if $breakpoint == phone {
        @media only screen and (max-width:37.5em) {@content}; // 600px 600/16
    }
    @if $breakpoint == tab-port{
        @media only screen and (max-width:56.25em) {@content}; //900px
    }
    @if $breakpoint == tab-land {
        @media only screen and (max-width:75em) {@content }; //1200 px
    }
    @if $breakpoint == big-desktop {
        @media only screen and (min-width:112.5em) {@content }; //1800 px
    }
}

.hide-on-tab-port{
  @include respond (tab-port){display: none;} 
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //min-height: 100vh;
}
.col-10, .row{
  margin: 0 !important;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.navbar{
 // background-color: rgb(32, 41, 54);
 background: #141e30; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #141e30, #243b55); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #141e30, #243b55); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.side-bar{
  // background-color: rgb(32, 41, 54);
  // box-shadow: 5px 5px 1.5px 5px rgba(32, 41, 54, .1);
  // width: 22.5vw;
   padding: 0 !important;
   @include respond (tab-land){width: max-content !important;} 
   
}
.content{
  $primary: #11998e;
  $secondary: #38ef7d;
//  background-image: linear-gradient(to bottom, $primary 0px,$secondary 300px, #f4f4fc 100px, #f4f4fc 100%);;
  background-color: #f4f4fc;
}
.icon-dark{
  fill: #243b55;//#000046;
  cursor: pointer;
}
.icon-light{
  fill: #fff;//#000046;
  cursor: pointer;
}
.link-active, .link:hover{
  border-left: 4px solid #2c3e50 !important;
  background-color: #ededf1;
  transition: all .3s;
}
.link{
  border-left: 4px solid transparent;
  cursor: pointer;
}
.navbar-brand{
  color: #fff !important;
}
</style>
