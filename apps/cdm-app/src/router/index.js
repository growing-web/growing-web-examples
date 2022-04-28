import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home.vue'
import Page1 from '../pages/Page1.vue'
import Page2 from '../pages/Page2.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/cdm-app',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/page1',
      name: 'Page1',
      component: Page1,
    },
    {
      path: '/page2',
      name: 'Page2',
      component: Page2,
    },
  ],
})
