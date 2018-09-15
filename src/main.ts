import Vue from 'vue';
import App from './App.vue';
import { Router as router } from './views';
import store from './store';
import { Plugin as Fragments } from 'vue-fragments';

import * as ServiceWorker from '@/service-worker/register';

ServiceWorker.Register();

Vue.use(Fragments);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
