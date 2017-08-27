// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import Utils from './utils'
import router from './router'
import Resource from 'vue-resource'
import './assets/css/style.css'

Vue.use(Utils);
Vue.use(Resource);
Vue.config.productionTip = false;

Vue.filter('substring', function (val, start, end) {
  if (!val) return '';
  return val.substring(start, end) + '......'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
