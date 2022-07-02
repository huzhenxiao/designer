
import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'
import "styles/index.scss";
import * as ElIcons from '@element-plus/icons-vue'
const app = createApp(App);

for (const icon in ElIcons) {
  app.component(icon,ElIcons[icon])
}

// 异步加载元件
const metaComponents = import.meta.glob('./metaComponent/*.vue')
Object.entries(metaComponents).forEach(([key, value]) => {
  const name = key.split('/').pop().replace(/\.vue/g, '').toLowerCase();
  app.component(
    `iot-${name}`,
    defineAsyncComponent(value)
  );
  
  
})

app.use(router).use(createPinia()).mount("#app");

