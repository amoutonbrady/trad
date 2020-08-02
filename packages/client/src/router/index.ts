import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Home, Login } from "/@pages/index";
import { useMainStore } from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter(_, __, next) {
      const store = useMainStore();
      if (store.loggedIn.value) next();
      else next("/login");
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("/@pages/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
