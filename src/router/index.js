import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/tokens',
      name: 'tokens',
      component: () => import('@/views/Tokens')
    },
    {
      path: '/token/:addr',
      name: 'token',
      component: () => import('@/views/Token')
    },
    {
      path: '/market',
      name: 'market',
      component: () => import('@/views/Marketplace')
    },
    {
      path: '/configure',
      name: 'configure',
      component: () => import('@/views/Configure')
    },
    {
      path: '/vrig/:id/update',
      name: 'vrig',
      component: () => import('@/views/Vrig')
    },
    {
      path: '/vgpu/:id',
      name: 'vgpu',
      component: () => import('@/views/Vgpu')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test')
    }
  ]
})
