import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";
import axios from "axios";
import VueRouter from "vue-router";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import "material-design-icons-iconfont/dist/material-design-icons.css"; 

let _axios = axios.create({
	baseURL: process.env.VUE_APP_ROOT_API
})

Plugin.install = function(Vue) {
	Object.defineProperties(Vue.prototype, {
		axios: {
			get() {
				return _axios
			}
		}
	})
}

Vue.use(Plugin)
Vue.use(Vuetify);
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  VueRouter,
  router,
  icons: {
    iconfont: "mdiSvg", // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },

  render: (h) => h(App),
}).$mount("#app");
