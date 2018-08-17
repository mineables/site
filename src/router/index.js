import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/site',
      name: 'home',
      component: () => import('@/views/Home'),
      children: []
    },
    {
      path: '/site/create',
      name: 'create',
      component: () => import('@/views/CreateToken'),
      children: []
    },
    {
      path: '/site/quarry',
      name: 'quarry',
      component: () => import('@/views/Quarry')
    },
    {
      path: '/site/token/:addr',
      name: 'token',
      component: () => import('@/views/Token')
    },
    {
      path: '/site/market',
      name: 'market',
      component: () => import('@/views/Marketplace')
    },
    {
      path: '/site/configure',
      name: 'configure',
      component: () => import('@/views/Configure')
    },
    {
      path: '/site/vrig/configure/:id',
      name: 'vrig',
      component: () => import('@/views/Vrig')
    }
  ]
})
