import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue,BootstrapVueIcons   } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.filter('formatPrice', function(){
  let separator = ',';
  if(arguments[2])
      separator = arguments[2];
  let kseparator = '.';
  if(arguments[3])
      kseparator = arguments[3];
  let decimals = 2;
  if(arguments[1] != undefined)
      decimals = arguments[1];
  let val = (arguments[0]/1).toFixed(decimals).replace('.', separator)
  let output = val.toString();
  if(!kseparator)
      return output;
  else
      return output.replace(/\B(?=(\d{3})+(?!\d))/g, kseparator);
});

new Vue({
   router,
  render: h => h(App), 
}).$mount('#app')
