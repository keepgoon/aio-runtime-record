import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '控制面板', icon: 'dashboard'}
    }]
  },
  {
    path: '/log',
    component: Layout,
    redirect: '/log/aioLogPage',
    name: 'Example',
    meta: {title: '运行记录管理', icon: 'el-icon-s-help'},
    children: [

      {
        path: 'aioLogPage',
        name: 'AioLogPage',
        component: () => import('@/views/log/QueryAioLogPage.vue'),
        meta: {title: '日志', icon: 'el-icon-tickets'}
      }
    ]
  },

  {
    path: '/mapping/log',
    component: Layout,
    redirect: '/mapping/log/apiRecordPage',
    name: 'Example',
    meta: {title: '运行记录管理', icon: 'el-icon-s-help'},
    children: [

      {
        path: 'apiRecordPage',
        name: 'apiRecordPage',
        component: () => import('@/views/mapping/QueryMappingLogPage.vue'),
        meta: {title: '接口访问记录', icon: 'el-icon-tickets'}
      }
    ]
  },
  {
    path: '/subscribe',
    component: Layout,
    redirect: '/subscribe/apiRecordPage',
    name: 'subscribe',
    meta: {title: '订阅管理', icon: 'el-icon-s-help'},
    children: [

      {
        path: 'logSubscribePage',
        name: 'logSubscribePage',
        component: () => import('@/views/log/QueryLogSubscribePage.vue'),
        meta: {title: '日志订阅', icon: 'el-icon-notebook-1'}
      },
      {
        path: 'environmentPage',
        name: 'EnvironmentPage',
        component: () => import('@/views/environment/QueryEnvironmentPage.vue'),
        meta: {title: '项目配置', icon: 'el-icon-setting'}
      },
      {
        path: 'beanPage',
        name: 'BeanPage',
        component: () => import('@/views/beans/QueryBeanPage.vue'),
        meta: {title: 'Bean查询', icon: 'el-icon-copy-document'}
      },
      {
        path: 'mappingPage',
        name: 'MappingPage',
        component: () => import('@/views/mapping/QueryMappingPage.vue'),
        meta: {title: '接口列表', icon: 'el-icon-c-scale-to-original'}
      },
      {
        path: 'cachePage',
        name: 'CachePage',
        component: () => import('@/views/cache/QueryAioCachePage.vue'),
        meta: {title: '缓存管理', icon: 'el-icon-refresh'}
      },
      {
        path: 'logLevelPage',
        name: 'LogLevelPage',
        component: () => import('@/views/log/QueryLogLevelPage.vue'),
        meta: {title: '日志级别', icon: 'el-icon-guide'}
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/info',
    name: 'user',
    hidden: true,
    meta: {title: '用户中心', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'info',
        name: 'userInfo',
        component: () => import('@/views/user/index.vue'),
        meta: {title: '个人中心', icon: 'table'}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
