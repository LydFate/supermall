import Axios from 'axios';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount("#app");
