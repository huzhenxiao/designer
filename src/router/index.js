/*
 * @Author: your name
 * @Date: 2021-06-30 17:59:37
 * @LastEditTime: 2021-07-24 17:53:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/router/index.js
 */
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  base: "/",
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
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
