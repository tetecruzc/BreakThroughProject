import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

function getRoutes() : Array<any>{
  return [{path: 'atc-activity'}, {path: 'activity-2'}]
}

export let routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue')
  },
  {
    path: '/table-test',
    name: 'TableTest',
    component: () => import('../views/TableViewExample.vue')
  },
  {
    path: '/requests',
    name: 'Requests',
    component: () => import('../views/Requests.vue')
  },
  {
    path: '/sent',
    name: 'Sent',
    component: () => import('../views/Sent.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
