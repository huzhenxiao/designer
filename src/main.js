import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "styles/index.scss";
import { ElButton, ElIcon, ElMessage, ElLoading } from "element-plus";

const app = createApp(App);

const components = [ElButton, ElIcon];
const plugins = [ElLoading, ElMessage];
components.forEach((component) => {
  app.use(component);
});
plugins.forEach((plugin) => {
  app.use(plugin);
});

// 异步加载自定义组件
const customComponentsMap = {
  "v-text": "VText",
  "v-button": "VButton",
};
Object.keys(customComponentsMap).forEach((key) => {
  app.component(
    key,
    defineAsyncComponent(() => import(`./custom-component/${customComponentsMap[key]}.vue`))
  );
});

app.use(router).use(store).mount("#app");
