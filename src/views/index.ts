import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './Home.vue';

Vue.use(VueRouter);

export const Router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/packages',
      name: 'packages',
      component: () => import('./Packages.vue'),
    },
    {
      path: '/options',
      name: 'options',
      component: () => import('./Options.vue'),
    },
  ],
});
