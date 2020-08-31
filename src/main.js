import Vue from 'vue'
import router from './router/router'
import App from './App.vue'
import store from './store/store'
import Vuex from 'vuex'
Vue.use(Vuex);

import locale from 'element-ui/lib/locale'
const ElementUI = require('element-ui');
import { Loading } from 'element-ui';
import env from '../env'
const lang = () => import('element-ui/lib/locale/lang/' + env.LANG);
Vue.use(ElementUI);
locale.use(lang);
import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside);
Vue.prototype.$loading = Loading.service;

import 'core-js';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/scss/index.scss';
import './config/registerServiceWorker'

Vue.config.productionTip = false;
//todo remove on prod
Vue.config.devtools = true;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
