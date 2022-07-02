<template>
  <div
    class="editor"
    id="editor"
    :class="{ edit: isEdit }"
    :style="{
      width: `${changeStyleWithScale(canvasStyleData.width, canvasStyleData.scale)}px`,
      height: `${changeStyleWithScale(canvasStyleData.height, canvasStyleData.scale)}px`
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
        :is="`iot-${item.component}`"
        :style="getComponentStyle(item.style)"
        :propValue="item.propValue"
        :element="item"
        :id="`component${item.id}`"
        :editMode="editMode"
        :isLock="item.isLock"
        :scale="canvasStyleData.scale"
        @input="handleInput"
      />
    </Shape>
    <!-- 右键菜单 -->
    <ContextMenu />
    <!-- 选中区域 -->
    <Area v-show="areaIsShow" :width="areaWidth" :height="areaHeight" :start="areaStart" />
  </div>
</template>

<script>
import { ref, computed, onMounted, reactive, onBeforeUnmount } from 'vue';
import { changeStyleWithScale } from 'utils/translate';
import { getStyleExclude, getComponentRotatedStyle } from 'utils/style';
import { throttle } from 'utils/utils';
import Grid from './Grid.vue';
import Shape from './Shape.vue';
import Area from './Area.vue';
import ContextMenu from './ContextMenu.vue';
import { useGetStyle, useGetArea } from './useEditor';
import { $ } from 'utils/utils';
import emitter from 'utils/eventBus';
import { storeToRefs } from 'pinia';
import { useMainStore, useComposeStore, useContextmenuStore } from '@/store';

export default {
  components: {
    Grid,
    Shape,
    Area,
    ContextMenu
  },
  setup() {
    const isEdit = ref(true);
    const mainStore = useMainStore();
    const composeStore = useComposeStore();
    const contextmenuStore = useContextmenuStore();
    const { editMode, componentData, canvasStyleData, curComponent, throttleDelay } =
      storeToRefs(mainStore);
    const { editor } = storeToRefs(composeStore);

    const { getShapeStyle, getComponentStyle } = useGetStyle();

    const { areaWidth, areaHeight, areaStart, areaIsShow, hideArea } = useGetArea();

    let editorX = 0;
    let editorY = 0;

    const handleMouseDownOnEditor = (e) => {
      console.log('handleMouseDownOnEditor');

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
      areaIsShow.value = true;

      const move = (moveEvent) => {
        console.log('editor mouse move');
        areaWidth.value = Math.abs(moveEvent.clientX - startX);
        areaHeight.value = Math.abs(moveEvent.clientY - startY);
        if (moveEvent.clientX < startX) {
          areaStart.x = moveEvent.clientX - editorX;
        }
        if (moveEvent.clientY < startY) {
          areaStart.y = moveEvent.clientY - editorY;
        }
      };
      const throttleMove = throttle(move, throttleDelay.value);
      const up = (e) => {
        document.removeEventListener('mousemove', throttleMove);
        document.removeEventListener('mouseup', up);

        if (e.clientX === startX && e.clientY === startY) {
          return hideArea();
        }
        createGroup();
      };
      document.addEventListener('mouseup', up);
      document.addEventListener('mousemove', throttleMove);
    };

    function createGroup() {
      const areaData = getSelectAreaData();
      if (areaData.length === 0) {
        return hideArea();
      }
      let top = Infinity,
        left = Infinity,
        right = -Infinity,
        bottom = -Infinity;
      areaData.forEach((component) => {
        let style = {};
        if (component.component === 'Group') {
          component.propValue.forEach((item) => {
            const rectInfo = $(`#component${item.id}`).getBoundingClientRect();
            style.left = rectInfo.left - editorX;
            style.top = rectInfo.top - editorY;
            style.right = rectInfo.right - editorX;
            style.bottom = rectInfo.bottom - editorY;

            if (style.left < left) left = style.left;
            if (style.top < top) top = style.top;
            if (style.right > right) right = style.right;
            if (style.bottom > bottom) bottom = style.bottom;
          });
        } else {
          style = getComponentRotatedStyle(component.style);
        }
        if (style.left < left) left = style.left;
        if (style.top < top) top = style.top;
        if (style.right > right) right = style.right;
        if (style.bottom > bottom) bottom = style.bottom;
      });

      areaStart.x = left;
      areaStart.y = top;
      areaWidth.value = right - left;
      areaHeight.value = bottom - top;

      // 保存选中区域大小信息和区域内的组件数据
      composeStore.setAreaData({
        style: {
          left,
          top,
          width: areaWidth.value,
          height: areaHeight.value
        },
        components: areaData
      });
    }

    function getSelectAreaData() {
      const result = [];
      const { x, y } = areaStart;

      componentData.value.forEach((component) => {
        if (component.isLock) return;
        const { left, top, width, height } = component.style;
        if (
          x <= left.value &&
          y <= top.value &&
          left.value + width.value <= x + areaWidth.value &&
          top.value + height.value < y + areaHeight.value
        ) {
          result.push(component);
        }
      });
      return result;
    }

    const handleContextMenu = (e) => {
      console.log('handleContextMenu');
      e.stopPropagation();
      e.preventDefault();
      const rectInfo = editor.value.getBoundingClientRect();
      const left = e.clientX - rectInfo.x + 1; // +1防止误触发ContextMenu上的mouseup事件
      const top = e.clientY - rectInfo.y + 1;
      contextmenuStore.showContextMenu({ left, top });
    };

    const handleInput = (element, { height, width }) => {
      // 根据文本组件高度调整shape高度
      mainStore.setShapeStyle({ height, width });
    };

    onMounted(() => {
      composeStore.getEditor();
      emitter.on('hideArea', hideArea);
    });
    onBeforeUnmount(() => {
      emitter.off('hideArea', hideArea);
    });

    return {
      isEdit,
      editMode,
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
      areaIsShow
    };
  }
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
