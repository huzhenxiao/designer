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
    @mousedown="handleMouseDownOnEditor"
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
    <!-- 右键菜单 -->
    <ContextMenu />
    <!-- 选中区域 -->
    <Area
      v-show="areaIsShow"
      :width="areaWidth"
      :height="areaHeight"
      :start="areaStart"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { changeStyleWithScale } from "utils/translate";
import { getStyleExclude } from "utils/style";
import { throttle } from "utils/utils";
import Grid from "./Grid.vue";
import Shape from "./Shape.vue";
import Area from "./Area.vue";
import ContextMenu from "./ContextMenu.vue";
import { useGetStyle, useGetArea } from "./index";

export default {
  components: {
    Grid,
    Shape,
    Area,
    ContextMenu,
  },
  setup() {
    const isEdit = ref(true);
    const store = useStore();
    const componentData = computed(() => store.state.componentData);
    const canvasStyleData = computed(() => store.state.canvasStyleData);
    const curComponent = computed(() => store.state.curComponent);
    const editor = computed(() => store.state.editor);
    const throttleDelay = computed(() => store.state.throttleDelay).value;

    const { getShapeStyle, getComponentStyle } = useGetStyle();

    const {
      areaWidth,
      areaHeight,
      areaStart,
      areaIsShow,
      hideArea,
    } = useGetArea();

    let editorX = 0;
    let editorY = 0;

    const handleMouseDownOnEditor = (e) => {
      console.log("handleMouseDownOnEditor");

      // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
      if (!curComponent.value) {
        e.preventDefault();
      }
      hideArea();

      // 获取编辑器的位移信息，每次点击时都需要获取一次
      const rectInfo = editor.value.getBoundingClientRect();
      editorX = rectInfo.x;
      editorY = rectInfo.y;
      const startX = e.clientX;
      const startY = e.clientY;
      areaStart.x = startX - editorX;
      areaStart.y = startY - editorY;
      // 展示选中区域
      areaIsShow.value = true;

      const move = (moveEvent) => {
        console.log("editor mouse move");
        areaWidth.value = Math.abs(moveEvent.clientX - startX);
        areaHeight.value = Math.abs(moveEvent.clientY - startY);
        if (moveEvent.clientX < startX) {
          areaStart.x = moveEvent.clientX - editorX;
        }
        if (moveEvent.clientY < startY) {
          areaStart.y = moveEvent.clientY - editorY;
        }
      };
      const throttleMove = throttle(move, throttleDelay);
      const up = (e) => {
        document.removeEventListener("mousemove", throttleMove);
        document.removeEventListener("mouseup", up);

        if (e.clientX === startX && e.clientY === startY) {
          return hideArea();
        }
        // this.createGroup()
      };
      document.addEventListener("mouseup", up);
      document.addEventListener("mousemove", throttleMove);
    };
    const handleContextMenu = (e) => {
      console.log("handleContextMenu");
      e.stopPropagation();
      e.preventDefault();
      const rectInfo = editor.value.getBoundingClientRect();
      const left = e.clientX - rectInfo.x;
      const top = e.clientY - rectInfo.y;
      store.commit("showContextMenu", { left, top });
    };

    const handleInput = (element, { height, width }) => {
      // 根据文本组件高度调整shape高度
      store.commit("setShapeStyle", { height, width });
    };

    onMounted(() => {
      store.commit("getEditor");
    });
    return {
      isEdit,
      componentData,
      canvasStyleData,
      curComponent,
      changeStyleWithScale,
      getComponentStyle,
      handleInput,
      getShapeStyle,
      handleMouseDownOnEditor,
      handleContextMenu,
      areaWidth,
      areaHeight,
      areaStart,
      areaIsShow,
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
