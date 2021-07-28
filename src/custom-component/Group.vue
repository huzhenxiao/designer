<!--
 * @Author: your name
 * @Date: 2021-07-26 23:12:26
 * @LastEditTime: 2021-07-27 23:42:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/custom-component/Group.vue
-->
<template>
  <div class="group">
    <div class="relative-box">
      <component
        class="component"
        v-for="item in propValue"
        :key="item.id"
        :is="item.component"
        :propValue="item.propValue"
        :element="item"
        :id="`component${item.id}`"
        :style="item.groupStyle"
      ></component>
    </div>
  </div>
</template>

<script>
import { getStyleExclude } from "utils/style";
import { toPercent } from "utils/translate";
export default {
  props: {
    propValue: {
      type: Array,
      default: () => [],
    },
    element: {
      type: Object,
    },
  },
  setup(props, context) {
    const parentStyle = props.element.style;
    props.propValue.forEach((component) => {
      // component.groupStyle的top、left是相对于group组件的位置
      // 如果已存在component.groupStyle,说明已经计算过一次了，不需要再次计算
      if (!Object.keys(component.groupStyle).length) {
        const style = { ...component.style };
        component.groupStyle = getStyleExclude(style);
        component.groupStyle.left = toPercent(
          (style.left - parentStyle.left) / parentStyle.width
        );
        component.groupStyle.top = toPercent(
          (style.top - parentStyle.top) / parentStyle.height
        );
        component.groupStyle.width = toPercent(style.width / parentStyle.width);
        component.groupStyle.height = toPercent(
          style.height / parentStyle.height
        );
      }
    });

    return {};
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
