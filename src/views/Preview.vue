<!--
 * @Author: your name
 * @Date: 2021-07-24 16:17:28
 * @LastEditTime: 2021-07-25 02:25:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/views/Preview.vue
-->
<template>
  <div
    class="preview"
    :style="{
      width: `${changeStyleWithScale(
        canvasStyleData.width,
        canvasStyleData.scale
      )}px`,
      height: `${changeStyleWithScale(
        canvasStyleData.height,
        canvasStyleData.scale
      )}px`,
    }"
  >
    <ComponentWrapper
      v-for="item in componentData"
      :key="item.id"
      :component="item"
    />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { changeStyleWithScale } from "utils/translate";
import ComponentWrapper from "comps/ComponentWrapper.vue";

export default {
  name: "preview",
  components: {
    ComponentWrapper,
  },
  setup() {
    const store = useStore();
    const canvasData = JSON.parse(sessionStorage.getItem("canvasData"));
    const componentData = canvasData.componentData;
    const canvasStyleData = canvasData.canvasStyleData;

    return {
      changeStyleWithScale,
      componentData,
      canvasStyleData,
    };
  },
};
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100%;
  background: #fff;
  border: 1px solid #999;
}
</style>
