import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  base: "/",
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      home: "home",
      component: () => import("views/Home.vue"),
    },
  ],
});

export default router;
