import Vue from 'vue';
import { Router as router } from './views';
import store from './store';

import * as ServiceWorker from '@/service-worker/register';

import { Hero, View } from './sections';

import './plugins/styles.scss';

ServiceWorker.Register();

Vue.config.productionTip = false;

const register = (section, el) => new Vue({
  router,
  store,
  render: (h) => h(section),
  el,
});

register(Hero, '#hero');
register(View, '#view');
