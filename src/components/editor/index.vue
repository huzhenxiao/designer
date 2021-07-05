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
    <!-- 右键菜单 -->
    <ContextMenu />
    <!-- 选中区域 -->
    <Area v-show="isShowArea" :width="width" :height="height" :start="start" />
  </div>
</template>

<script>
import { ref, computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { changeStyleWithScale } from "utils/translate";
import { getStyle } from "utils/style";
import Grid from "./Grid.vue";
import Shape from "./Shape.vue";
import Area from "./Area.vue";
import ContextMenu from "./ContextMenu.vue";

export default {
  components: {
    Grid,
    Shape,
    Area,
    ContextMenu,
  },
  setup() {
    onMounted(() => {
      store.commit("getEditor");
    });

    const isEdit = ref(true);
    const store = useStore();
    const componentData = computed(() => store.state.componentData);
    const canvasStyleData = computed(() => store.state.canvasStyleData);
    const curComponent = computed(() => store.state.curComponent);
    const editor = computed(() => store.state.editor);

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

    const width = ref(0);
    const height = ref(0);
    let editorX = 0;
    let editorY = 0;
    const start = reactive({
      x: 0,
      y: 0,
    });
    const isShowArea = ref(false);

    const hideArea = () => {
      width.value = 0;
      height.value = 0;
      isShowArea.value = false;
    };
    const handleMouseDown = (e) => {
      console.log("editor handleMouseDown");
      // 0 左击 1 滚轮 2 右击
      if (e.button !== 2) {
        store.commit("hideContextMenu");
      }
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
      start.x = startX - editorX;
      start.y = startY - editorY;
      // 展示选中区域
      isShowArea.value = true;

      const move = (moveEvent) => {
        console.log("editor mouse move");

        width.value = Math.abs(moveEvent.clientX - startX);
        height.value = Math.abs(moveEvent.clientY - startY);
        if (moveEvent.clientX < startX) {
          start.x = moveEvent.clientX - editorX;
        }
        if (moveEvent.clientY < startY) {
          start.y = moveEvent.clientY - editorY;
        }
      };
      const up = (e) => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);

        if (e.clientX === startX && e.clientY === startY) {
          return hideArea();
        }
        // this.createGroup()
      };
      document.addEventListener("mouseup", up);
      document.addEventListener("mousemove", move);
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
      width,
      height,
      start,
      isShowArea,
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
