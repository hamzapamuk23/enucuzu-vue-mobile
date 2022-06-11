import Vue from "vue";
import VueRouter from "vue-router";
import ProductDetailMobile from "../views/ProductDetailMobile.vue";
import ProductMobile from "../views/ProductMobile.vue";
import Main from "../views/Main.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/ProductDetailMobile",
    name: "ProductDetailMobile",
    component: ProductDetailMobile,
  },
  {
    path: "/ProductMobile",
    name: "ProductMobile",
    component: ProductMobile,
    // component: () => import('../views/About.vue')
  },
  {
    path: "/Main",
    name: "Main",
    component: Main,
    // component: () => import('../views/About.vue')
  },
];

['push','replace'].forEach(method => {
  const originalMethod = VueRouter.prototype[method];
  VueRouter.prototype[method] = function m(location) {
    return originalMethod.call(this, location).catch(error => {
      if (error.name !== 'NavigationDuplicated') {
        // capture exception
      }
    })
  };
});

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
