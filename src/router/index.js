import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import List from '@/components/List'
import Detail from '@/components/Detail'
import Login from '@/components/Login'
import New from '@/components/New'
import Edit from '@/components/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/list',
      name: 'List',
      component: List
    }, {
      path: '/blog/detail/:id',
      name: 'Detail',
      component: Detail
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/new',
      name: 'New',
      component: New
    }, {
      path: '/blog/edit/:id',
      name: 'Edit',
      component: Edit
    }
  ]
})
