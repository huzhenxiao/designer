import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  base: "/",
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect:"/designer"
    },
    {
      path: "/designer",
      name: "designer",
      component: () => import("views/Home.vue"),
    },
    {
      path: "/preview",
      name: "preview",
      component: () => import("views/Preview.vue"),
    },
  ],
});

export default router;
