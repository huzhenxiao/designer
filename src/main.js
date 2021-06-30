import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "styles/index.scss";

import { ElButton,ElIcon, ElMessage, ElLoading } from "element-plus";

const components = [ElButton,ElIcon];

const plugins = [ElLoading, ElMessage];

const app = createApp(App);

components.forEach((component) => {
  app.use(component);
});

plugins.forEach((plugin) => {
  app.use(plugin);
});

app.use(router).use(store).mount("#app");
