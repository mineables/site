import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: 'home',
      name: 'home',
      component: () => import('@/views/Home'),
      children: []
    },
    {
      path: 'create',
      name: 'create',
      component: () => import('@/views/CreateToken'),
      children: []
    },
    {
      path: 'quarry',
      name: 'quarry',
      component: () => import('@/views/Quarry')
    },
    {
      path: 'token/:addr',
      name: 'token',
      component: () => import('@/views/Token')
    },
    {
      path: 'market',
      name: 'market',
      component: () => import('@/views/Marketplace')
    },
    {
      path: 'configure',
      name: 'configure',
      component: () => import('@/views/Configure')
    },
    {
      path: 'vrig/configure/:id',
      name: 'vrig',
      component: () => import('@/views/Vrig')
    }
  ],
  path: '*',
  redirect: 'home'
})
