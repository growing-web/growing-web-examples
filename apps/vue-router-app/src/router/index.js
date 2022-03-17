import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../layout/Layout.vue';
import HomePage from '../pages/Home.vue';
import Page1 from '../pages/Page1.vue';
import Page1Header from '../layout/Page1Header.vue';
import Page2 from '../pages/Page2.vue';
import Page2Footer from '../layout/Page2Footer.vue';
import VuejsDialog from "vuejs-dialog"

Vue.use(Router);
Vue.use(VuejsDialog);

export default new Router({
  mode: 'history',
  base: '/vue-router-demo',
  routes: [
    {
      path: '/vue-router',
      component: Layout,
      props(route) {
        const matched = route.matched;
        /*
        let header = null;
        let footer = null;
        */
        if (matched.length > 1) {
          /*
          console.log(matched[1]);
          if ('header' in matched[1].meta) {
            header = matched[1].meta.header;
          }
          if ('footer' in matched[1].meta) {
            footer = matched[1].meta.footer;
          }
          */
          return matched[1].meta;
        }
        return {};
      },
      children: [
        {
          path: '',
          name: 'home',
          component: HomePage,
        },
        {
          path: 'page-1',
          name: 'page-1',
          component: Page1,
          meta: {
            header: Page1Header,
            footer: false
          },
        },
        {
          path: 'page-2',
          name: 'page-2',
          component: Page2,
          meta: {
            footer: Page2Footer,
          },
        },
      ],
    },
  ],
})
