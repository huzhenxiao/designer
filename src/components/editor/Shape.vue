<template>
  <div
    class="shape"
    :class="{ active }"
    ref="shapeDom"
    @click="selectCurComponent"
    @mousedown="handleMouseDownOnShape"
  >
    <el-icon
      class="el-icon-refresh-right"
      v-show="isActive"
      @mousedown="handleRotate"
    ><refresh-right /></el-icon>
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
import { ref, computed } from "vue";
import { useGetPointStyle } from "./useShape";
import { throttle } from "utils/utils";
import { mod360 } from "utils/translate";
import calculateComponentPositonAndSize from "utils/calculateComponentPositonAndSize";
import emitter from "utils/eventBus";

import { storeToRefs } from "pinia";
import { useMainStore,useComposeStore,useSnapshotStore } from "@/store";

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
    const mainStore = useMainStore();
    const composeStore = useComposeStore();
    const snapshotStore = useSnapshotStore();
    const { curComponent,throttleDelay } = storeToRefs(mainStore);
    const { editor } = storeToRefs(composeStore);
    
    const isActive = computed(() => props.active && !props.element.isLock);
    const shapeDom = ref(null);
    const { pointList, getCursor, getPointStyle } = useGetPointStyle();

    const selectCurComponent = (e) => {};

    const handleMouseDownOnShape = (e) => {
      console.log("handleMouseDownOnShape");
      e.stopPropagation();
      mainStore.setClickComponentStatus(true);
      mainStore.setCurComponent({
        component: props.element,
        index: props.index,
      });
      if (props.element.isLock) return;
      getCursor(curComponent.value); // 根据旋转角度获取光标位置
      const pos = { ...props.defaultStyle };
      const startX = e.clientX;
      const startY = e.clientY;
      const startLeft = pos.left.value;
      const startTop = pos.top.value;

      // 如果没有移动不保存快照，避免点击产生无效快照
      let hasMove = false;
      let disX = 0;
      let disY = 0;
      const move = (moveEvent) => {
        console.log("shape mouse move");
        
        hasMove = true;
        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        disX = curX - startX;
        disY = curY - startY;
        let shapeDom = e.target;
        while (shapeDom.parentElement && !shapeDom.classList.contains('shape')) {
          shapeDom = shapeDom.parentElement;
        }
        const rotate = pos.rotate.value
        shapeDom.style.transform = `translateX(${disX}px) translateY(${disY}px) rotate(${rotate}deg)`
        
      };
      const throttleMove = throttle(move, throttleDelay.value);
      const up = (e) => {
        pos.left.value = disX + startLeft;
        pos.top.value = disY + startTop;
        mainStore.setShapeStyle(pos);
        hasMove && snapshotStore.recordSnapshot();
        document.removeEventListener("mousemove", throttleMove);
        document.removeEventListener("mouseup", up);
        emitter.off("shapeMouseup", up);
      };
      emitter.on("shapeMouseup", up);
      document.addEventListener("mouseup", up);
      document.addEventListener("mousemove", throttleMove);
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
      const style = { ...props.defaultStyle };
      // 宽高比
      const proportion = style.width.value / style.height.value;

      // 初始中心点
      const center = {
        x: style.left.value + style.width.value / 2,
        y: style.top.value + style.height.value / 2,
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

      // 如果没有移动不保存快照，避免点击产生无效快照
      let hasMove = false;
      const move = (moveEvent) => {
        hasMove = true;
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
       mainStore.setShapeStyle(style);
      };
      const throttleMove = throttle(move, throttleDelay.value);
      const up = () => {
        hasMove && snapshotStore.recordSnapshot();
        document.removeEventListener("mousemove", throttleMove);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mouseup", up);
      document.addEventListener("mousemove", throttleMove);
    };

    const handleRotate = (e) => {
      e.stopPropagation();
      e.preventDefault();

      // 初始坐标和初始角
      const pos = { ...props.defaultStyle };
      const startX = e.clientX;
      const startY = e.clientY;
      const startRotate = pos.rotate.value;

      // 获取元素中心坐标
      const rect = shapeDom.value.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 旋转前的角度
      const rotateDegBefore =
        (Math.atan2(startY - centerY, startX - centerX) * 180) / Math.PI;

      // 如果没有移动不保存快照，避免点击产生无效快照
      let hasMove = false;
      const move = (moveEvent) => {
        hasMove = true;
        const curY = moveEvent.clientY;
        const curX = moveEvent.clientX;
        const rotateDegAfter =
          (Math.atan2(curY - centerY, curX - centerX) * 180) / Math.PI;

        pos.rotate.value = rotateDegAfter - rotateDegBefore + startRotate;
        mainStore.setShapeStyle(pos);
      };
      const throttleMove = throttle(move, throttleDelay.value);
      const up = () => {
        hasMove && snapshotStore.recordSnapshot();
        document.removeEventListener("mousemove", throttleMove);
        document.removeEventListener("mouseup", up);
        getCursor(curComponent.value);
      };
      document.addEventListener("mouseup", up);
      document.addEventListener("mousemove", throttleMove);
    };
    // onMounted(() => {
    //   emitter.on("shapeMouseup", hideArea);
    // });
    // onBeforeUnmount(() => {
    //   emitter.off("shapeMouseup", hideArea);
    // });

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
