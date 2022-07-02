<template>
  <div class="group">
    <div class="relative-box">
      <component
        class="component"
        v-for="item in children"
        :key="item.id"
        :is="`iot-${item.component}`"
        :propValue="item.propValue"
        :element="item"
        :id="`component${item.id}`"
        :style="item.groupStyle"
      ></component>
    </div>
  </div>
</template>

<script>
import {computed} from 'vue';
import { getStyleExclude } from "utils/style";
import { toPercent } from "utils/translate";
export default {
  props: {
    propValue: {
      require:true,
    },
    element: {
      type: Object,
    },
  },
  setup(props, context) {
    const children = computed(()=>props.element.children);
    const parentStyle = props.element.style;
    
    props.element.children.forEach((component) => {
      // component.groupStyle的top、left是相对于group组件的位置
      // 如果已存在component.groupStyle,说明已经计算过一次了，不需要再次计算
      if (!Object.keys(component.groupStyle).length) {
        const style = { ...component.style };
        component.groupStyle = getStyleExclude(style);
        component.groupStyle.left = toPercent(
          (style.left.value - parentStyle.left.value) / parentStyle.width.value
        );
        component.groupStyle.top = toPercent(
          (style.top.value - parentStyle.top.value) / parentStyle.height.value
        );
        component.groupStyle.width = toPercent(style.width.value / parentStyle.width.value);
        component.groupStyle.height = toPercent(
          style.height.value / parentStyle.height.value
        );
      }
    });

    return {children};
  },
};
</script>

<style lang="scss" scoped>
.group {
  .relative-box {
    position: relative;
    width: 100%;
    height: 100%;

    .component {
      position: absolute;
    }
  }
}
</style>
