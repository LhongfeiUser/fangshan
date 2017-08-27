import Vue from 'vue'
import Router from 'vue-router'
import Works from '@/pages/Works'
import WorksDetail from '@/pages/WorksDetail'
import Lottery from '@/pages/Lottery'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/works',
      name: 'works',
      component: Works
    },
    {
      path: '/works/:worksId',
      name: 'works-detail',
      component: WorksDetail
    },
    {
      path: '/lottery',
      name: 'lottery',
      component: Lottery
    }
  ]
})
