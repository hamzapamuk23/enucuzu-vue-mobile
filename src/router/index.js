import Vue from "vue";
import VueRouter from "vue-router";
import ProductDetailMobile from "../views/ProductDetailMobile.vue";
import ProductMobile from "../views/ProductMobile.vue";

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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
