<template>
  <div
    class="shape"
    :class="{ active }"
    ref="shapeDom"
    @click="selectCurComponent"
    @mousedown="handleMouseDownOnShape"
  >
    <i
      class="el-icon-refresh-right"
      v-show="isActive"
      @mousedown="handleRotate"
    ></i>
    <i class="el-icon-lock" v-show="element.isLock && active"></i>
    <span
      class="shape-point"
      v-for="item in isActive ? pointList : []"
      :key="item"
      :style="getPointStyle(item, defaultStyle)"
      @mousedown="handleMouseDownOnPoint(item, $event)"
    ></span>
    <slot></slot>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { useGetPointStyle } from "./shape";
import { throttle } from "utils/utils";
import { mod360 } from "utils/translate";
import calculateComponentPositonAndSize from "utils/calculateComponentPositonAndSize";

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
    const editor = computed(() => store.state.editor);
    const shapeDom = ref(null);
    const { pointList, getCursor, getPointStyle } = useGetPointStyle();

    const selectCurComponent = (e) => {};

    const handleMouseDownOnShape = (e) => {
      console.log("handleMouseDownOnShape");
      e.stopPropagation();
      store.commit("setClickComponentStatus", true);
      store.commit("setCurComponent", {
        component: props.element,
        index: props.index,
      });
      if (props.element.isLock) return;

      getCursor(curComponent.value); // 根据旋转角度获取光标位置
      const pos = { ...props.defaultStyle };
      const startX = e.clientX;
      const startY = e.clientY;
      const startLeft = pos.left;
      const startTop = pos.top;

      const move = (moveEvent) => {
        console.log("shape mouse move");

        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        pos.left = curX - startX + startLeft;
        pos.top = curY - startY + startTop;
        store.commit("setShapeStyle", pos);
      };
      // const throttleMove = throttle(move,16);
      const up = (e) => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mouseup", up);
      document.addEventListener("mousemove", move);
    };

    const isNeedLockProportion = () => {
      if (props.element.component !== "Group") return false;
      const ratates = [0, 90, 180, 360];
      for (const component of props.element.propValue) {
        if (!ratates.includes(mod360(parseInt(component.style.rotate)))) {
          return true;
        }
      }
      return false;
    };

    // 8个点拉伸
    const handleMouseDownOnPoint = (point, e) => {
      e.stopPropagation();
      e.preventDefault();
      // const style = { ...props.defaultStyle };
      // const {
      //   left: startLeft,
      //   top: startTop,
      //   width: startWidth,
      //   height: startHeight,
      // } = style;

      // const startX = e.clientX;
      // const startY = e.clientY;

      // const move = (moveEvent) => {
      //   const curX = moveEvent.clientX;
      //   const curY = moveEvent.clientY;
      //   const distanceX = curX - startX;
      //   const distanceY = curY - startY;

      //   switch (point) {
      //     case "t":
      //       style.top = Math.min(startTop + distanceY, startTop + startHeight);
      //       style.height = Math.abs(startHeight - distanceY);
      //       store.commit("setShapeStyle", style);
      //       break;
      //     case "r":
      //       style.left = Math.min(
      //         startLeft,
      //         startLeft + startWidth + distanceX
      //       );
      //       style.width = Math.abs(startWidth + distanceX);
      //       store.commit("setShapeStyle", style);
      //       break;
      //     case "b":
      //       style.top = Math.min(startTop, startTop + startHeight + distanceY);
      //       style.height = Math.abs(startHeight + distanceY);
      //       store.commit("setShapeStyle", style);
      //       break;
      //     case "l":
      //       style.left = Math.min(
      //         startLeft + distanceX,
      //         startLeft + startWidth
      //       );
      //       style.width = Math.abs(startWidth - distanceX);
      //       store.commit("setShapeStyle", style);
      //       break;
      //     case "lt":
      //       style.top = Math.min(startTop + distanceY, startTop + startHeight);
      //       style.height = Math.abs(startHeight - distanceY);
      //       style.left = Math.min(
      //         startLeft + distanceX,
      //         startLeft + startWidth
      //       );
      //       style.width = Math.abs(startWidth - distanceX);
      //       store.commit("setShapeStyle", style);
      //       break;
      //     case "rt":
      //       style.top = Math.min(startTop + distanceY, startTop + startHeight);
      //       style.height = Math.abs(startHeight - distanceY);
      //       style.left = Math.min(
      //         startLeft,
      //         startLeft + startWidth + distanceX
      //       );
      //       style.width = Math.abs(startWidth + distanceX);
      //       store.commit("setShapeStyle", style);
      //       break;
      //     case "rb":
      //       style.top = Math.min(startTop, startTop + startHeight + distanceY);
      //       style.height = Math.abs(startHeight + distanceY);
      //       style.left = Math.min(
      //         startLeft,
      //         startLeft + startWidth + distanceX
      //       );
      //       style.width = Math.abs(startWidth + distanceX);
      //       store.commit("setShapeStyle", style);
      //       break;
      //     case "lb":
      //       style.top = Math.min(startTop, startTop + startHeight + distanceY);
      //       style.height = Math.abs(startHeight + distanceY);
      //       style.left = Math.min(
      //         startLeft + distanceX,
      //         startLeft + startWidth
      //       );
      //       style.width = Math.abs(startWidth - distanceX);
      //       store.commit("setShapeStyle", style);
      //       break;
      //     default:
      //       break;
      //   }
      // };
      
      const style = { ...props.defaultStyle };
      // 宽高比
      const proportion = style.width / style.height;

      // 初始中心点
      const center = {
        x: style.left + style.width / 2,
        y: style.top + style.height / 2,
      };
      const rect = editor.value.getBoundingClientRect();
      // 当前点击坐标
      const curPoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      // 对称点坐标
      const symmetricPoint = {
        x: 2 * center.x - curPoint.x,
        y: 2 * center.y - curPoint.y,
      };
      const needLockProportion = isNeedLockProportion();
      const move = (moveEvent) => {
        const curPosition = {
          x: moveEvent.clientX - rect.left,
          y: moveEvent.clientY - rect.top,
        };
        calculateComponentPositonAndSize(
          point,
          style,
          curPosition,
          proportion,
          needLockProportion,
          {
            center,
            curPoint,
            symmetricPoint,
          }
        );
        store.commit("setShapeStyle", style);
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mouseup", up);
      document.addEventListener("mousemove", move);
    };

    const handleRotate = (e) => {
      e.stopPropagation();
      e.preventDefault();

      // 初始坐标和初始角
      const pos = { ...props.defaultStyle };
      const startX = e.clientX;
      const startY = e.clientY;
      const startRotate = pos.rotate;

      // 获取元素中心坐标
      const rect = shapeDom.value.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 旋转前的角度
      const rotateDegBefore =
        (Math.atan2(startY - centerY, startX - centerX) * 180) / Math.PI;

      const move = (moveEvent) => {
        const curY = moveEvent.clientY;
        const curX = moveEvent.clientX;
        const rotateDegAfter =
          (Math.atan2(curY - centerY, curX - centerX) * 180) / Math.PI;

        pos.rotate = rotateDegAfter - rotateDegBefore + startRotate;
        store.commit("setShapeStyle", pos);
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        getCursor(curComponent.value);
      };

      document.addEventListener("mouseup", up);
      document.addEventListener("mousemove", move);
    };

    return {
      shapeDom,
      isActive,
      pointList,
      selectCurComponent,
      handleMouseDownOnShape,
      handleMouseDownOnPoint,
      handleRotate,
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
