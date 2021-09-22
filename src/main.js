import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";
import axios from "axios";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import router from "./router";

Vue.use(VueAxios, axios);
Vue.use(Vuetify);
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  VueRouter,
  router,
  render: (h) => h(App),
}).$mount("#app");
