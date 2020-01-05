import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.compact.css';
import ruMessages from 'devextreme/localization/messages/ru.json';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import { locale, loadMessages } from 'devextreme/localization';
import App from './App.vue';
import router from './router';
import store from './store';


// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    loadMessages(ruMessages);
    locale('ru');
  },
}).$mount('#app');
