import Vue from "vue";
import VueRouter from "vue-router";
import Student from "../views/Student.vue";
import School2 from "../views/School2.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/student",
    name: "Student",
    component: Student,
  },
  {
    path: "/school2",
    name: "School2",
    component: School2,
    // component: () => import('../views/About.vue')
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
