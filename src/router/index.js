import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home'),
      children: []
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('@/views/CreateToken'),
      children: []
    },
    {
      path: '/quarry',
      name: 'quarry',
      component: () => import('@/views/Quarry')
    },
    {
      path: '/token/:addr',
      name: 'token',
      component: () => import('@/views/Token')
    }
  ]
})
