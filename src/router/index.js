import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  // { path: '/release01', component: () => import('@/views/publish/release/release.vue') },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: false,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'example' }
    }]
  },
  {
    path: '/assets',
    component: Layout,
    children: [
      {
        path: '', // 显示uri
        name: 'Assets',
        component: () => import('@/views/assets/index'),
        meta: { title: '资产管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    name: 'Users',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'userlist',
        name: 'User',
        component: () => import('@/views/users/user/index'),
        meta: { title: '用户列表' }
      },
      {
        path: 'grouplist',
        name: 'Group',
        component: () => import('@/views/users/group/index'),
        meta: { title: '用户组' }
      }
    ]
  },
  {
    path: '/publish',
    component: Layout,
    name: 'Publish',
    meta: { title: '发布管理', icon: 'nested' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/publish/list/index'),
        meta: { title: '项目列表' }
      },
      {
        path: 'release',
        name: 'Release',
        component: () => import('@/views/publish/release/index'),
        meta: { title: '待发布' }
      },
      {
        path: 'history',
        name: 'History',
        component: () => import('@/views/publish/history/index'),
        meta: { title: '发布历史' }
      }
    ]
  },
  {
    path: '/release',
    component: Layout,
    redirect: '',
    name: 'Release',
    hidden: true,
    children: [{
      path: '',
      name: 'Release',
      component: () => import('@/views/publish/release/release.vue'),
      meta: { title: '发布详情', icon: '' }
    }]
  },
  {
    path: '/workorder',
    component: Layout,
    name: 'Workorder',
    meta: { title: '故障处理', icon: 'tree' },
    children: [
      {
        path: 'workorderlist',
        name: 'List',
        component: () => import('@/views/workorder/list/index.vue'),
        meta: { title: '故障列表' }
      },
      {
        path: 'history',
        name: 'History',
        component: () => import('@/views/workorder/history/index.vue'),
        meta: { title: '故障历史' }
      }
    ]
  },
  {
    path: '/jumpserver',
    component: Layout,
    name: 'Jumpserver',
    meta: { title: '跳板机', icon: 'tree' },
    children: [
      {
        path: 'auth',
        name: 'Auth',
        component: () => import('@/views/jumpserver/auth/index.vue'),
        meta: { access: ['admin'], title: '授权' }
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/jumpserver/list/index.vue'),
        meta: { title: '我的机器' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

