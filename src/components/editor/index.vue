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
    @mousedown="handleMouseDown"
    @contextmenu="handleContextMenu"
  >
    <!-- 网格线 -->
    <Grid />

    <!-- 画布组件展示 -->
    <Shape
      v-for="(item, index) in componentData"
      :key="item.id"
      :defaultStyle="item.style"
      :style="getShapeStyle(item.style)"
      :active="item === curComponent"
      :element="item"
      :index="index"
      :class="{ lock: item.isLock }"
    >
      <component
        class="component"
        :is="item.component"
        :style="getComponentStyle(item.style)"
        :propValue="item.propValue"
        :element="item"
        :id="`component${item.id}`"
        @input="handleInput"
      />
    </Shape>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { changeStyleWithScale } from "utils/translate";
import { getStyle } from "utils/style";
import Grid from "./Grid.vue";
import Shape from "./Shape.vue";

export default {
  components: {
    Grid,
    Shape,
  },
  setup() {
    const isEdit = ref(true);
    const store = useStore();
    const componentData = computed(() => store.state.componentData);
    const canvasStyleData = computed(() => store.state.canvasStyleData);
    const curComponent = computed(() => store.state.curComponent);

    const getShapeStyle = (style) => {
      return ["width", "height", "top", "left", "rotate"].reduce((pre, key) => {
        if (key === "rotate") {
          pre["transform"] = `rotate(${style[key]}deg)`;
        } else {
          pre[key] = `${style[key]}px`;
        }
        return pre;
      }, {});
    };
    const getComponentStyle = (style) =>
      getStyle(style, ["top", "left", "width", "height", "rotate"]);

    const handleInput = (element, { height, width }) => {
      // 根据文本组件高度调整shape高度
      store.commit("setShapeStyle", { height, width });
    };

    const handleMouseDown = (e) => {
      // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
      if (!curComponent.value) {
        e.preventDefault();
      }
      // this.hideArea()

    };
    const handleContextMenu = () => {};
    return {
      isEdit,
      componentData,
      canvasStyleData,
      curComponent,
      changeStyleWithScale,
      getComponentStyle,
      handleInput,
      getShapeStyle,
      handleMouseDown,
      handleContextMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  background: #fff;
  margin: auto;

  .lock {
    opacity: 0.5;
  }
}
.edit {
  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>
