/*
 * @Author: your name
 * @Date: 2021-06-30 17:38:26
 * @LastEditTime: 2021-07-21 23:51:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /designer/my-designer/src/main.js
 */
import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "styles/index.scss";
import {
  ElButton,
  ElIcon,
  ElMessage,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElColorPicker,
} from "element-plus";

const app = createApp(App);

const components = [
  ElButton,
  ElIcon,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElColorPicker,
];
const plugins = [ElMessage];
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
  pic: "Picture",
  "rect-shape": "RectShape",
};
Object.keys(customComponentsMap).forEach((key) => {
  app.component(
    key,
    defineAsyncComponent(() =>
      import(`./custom-component/${customComponentsMap[key]}.vue`)
    )
  );
});

app.use(router).use(store).mount("#app");
