<!--
 * @Author: your name
 * @Date: 2021-07-24 17:24:58
 * @LastEditTime: 2021-07-24 21:15:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/components/ComponentWrapper.vue
-->
<template>
  <div class="component-wrapper" @click="handleClick">
    <component
      class="component"
      :is="component.component"
      :style="getStyle(component.style)"
      :propValue="component.propValue"
      :element="component"
    ></component>
  </div>
</template>

<script>
import { getStyleExclude } from "utils/style";
export default {
  props: {
    component: {
      require: true,
      type: Object,
    },
  },
  setup(props, context) {
    const handleClick = () => {};
    const getStyle = (style) => getStyleExclude(style, []);

    return {
      handleClick,
      getStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.component{
  position: absolute;
}
</style>
