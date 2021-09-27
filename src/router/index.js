import Vue from "vue";
import VueRouter from "vue-router";
import Student from "../views/Student.vue";
import School from "../views/School.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/student",
    name: "Student",
    component: Student,
  },
  {
    path: "/school",
    name: "School",
    component: School,
    // component: () => import('../views/About.vue')
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
