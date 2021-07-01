<template>
  <div
    class="editor"
    id="editor"
    :class="{ edit: isEdit }"
    :style="{
      width: `${changeStyleWithScale(
        canvasStyleData.width,
        canvasStyleData.scale
      )}px`,
      height: `${changeStyleWithScale(
        canvasStyleData.width,
        canvasStyleData.scale
      )}px`,
    }"
  >
    <!-- 网格线 -->
    <Grid />

    <!-- 画布组件展示 -->
    <component
      v-for="(item, index) in componentData"
      :key="item.id"
      class="component"
      :is="item.component"
      :style="getComponentStyle(item.style)"
      :propValue="item.propValue"
      :element="item"
      :id="'component' + item.id"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { changeStyleWithScale } from "utils/translate";
import { getStyle } from "utils/style";
import Grid from "./Grid.vue";

export default {
  components: {
    Grid,
  },
  setup() {
    const isEdit = ref(true);
    const store = useStore();
    const componentData = computed(() => store.state.componentData);
    const canvasStyleData = computed(() => store.state.canvasStyleData);
    const getComponentStyle = (style) =>
      getStyle(style, ["top", "left", "width", "height", "rotate"]);

    return {
      isEdit,
      componentData,
      canvasStyleData,
      changeStyleWithScale,
      getComponentStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  background: #fff;
  margin: auto;
}
.edit {
  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>
