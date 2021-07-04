<template>
  <div
    class="shape"
    :class="{ active }"
    @click="selectCurComponent"
    @mousedown="handleMouseDownOnShape"
  >
    <i class="el-icon-refresh-right" v-show="isActive"></i>
    <i class="el-icon-lock" v-show="element.isLock"></i>
    <span
      class="shape-point"
      v-for="item in isActive ? pointList : []"
      :key="item"
      :style="getPointStyle(item, defaultStyle)"
    ></span>
    <slot></slot>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useGetPointStyle } from "./shape";
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    element: {
      require: true,
      type: Object,
    },
    defaultStyle: {
      require: true,
      type: Object,
    },
    index: {
      require: true,
      type: [Number, String],
    },
  },
  setup(props, context) {
    const store = useStore();
    const isActive = computed(() => props.active && !props.element.isLock);
    const curComponent = computed(() => store.state.curComponent);
    const { pointList, getCursor, getPointStyle } = useGetPointStyle();
    const selectCurComponent = () => {};
    const handleMouseDownOnShape = (e) => {
      console.log("handleMouseDownOnShape");
      e.stopPropagation();
      store.commit("setClickComponentStatus", true);
      store.commit("setCurComponent", {
        component: props.element,
        index: props.index,
      });
      getCursor(curComponent.value); // 根据旋转角度获取光标位置
    };

    return {
      isActive,
      pointList,
      selectCurComponent,
      handleMouseDownOnShape,
      getPointStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.shape {
  position: absolute;

  &:hover {
    cursor: move;
  }
}
.active {
  outline: 1px solid #70c0ff;
  user-select: none;
}

.el-icon-refresh-right {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  cursor: grab;
  color: #59c7f9;
  font-size: 20px;
}
.el-icon-lock {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 16px;
  color: #999;
  z-index: 1;
}
.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}
</style>
