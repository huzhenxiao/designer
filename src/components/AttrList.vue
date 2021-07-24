<!--
 * @Author: your name
 * @Date: 2021-07-18 22:35:47
 * @LastEditTime: 2021-07-24 16:02:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /designer/my-designer/src/components/ComponentDataList.vue
-->
<template>
  <div class="attr-list">
    <component
      v-for="item in styleList"
      :key="item.label"
      :label="item.label"
      :unit="item.unit"
      :is="item.component"
      :value="item.value"
      :options="item.options"
      @valueChange="handleValueChange(item.key, $event)"
    ></component>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import CustomInputNumber from "./customComponent/CustomInputNumber.vue";
import CustomInput from "./customComponent/CustomInput.vue";
import CustomSelect from "./customComponent/CustomSelect.vue";
import CustomColorPicker from './customComponent/CustomColorPicker.vue'
export default {
  components: {
    CustomInputNumber,
    CustomInput,
    CustomSelect,
    CustomColorPicker,
  },
  setup() {
    const styleMap = {
      width: {
        label: "宽",
        component: "custom-input-number",
        unit: 'px',
      },
      height: {
        label: "高",
        component: "custom-input-number",
        unit: 'px',
      },
      left: {
        label: "x坐标",
        component: "custom-input-number",
        unit: 'px',
      },
      top: {
        label: "y坐标",
        component: "custom-input-number",
        unit: 'px',
      },
      rotate: {
        label: "旋转",
        component: "custom-input-number",
        unit: '°',
      },
      color: {
        label: "字体颜色",
        component: "custom-color-picker",
      },
      fontSize: {
        label: "字体大小",
        component: "custom-input-number",
        unit: 'px',
      },
      fontWeight: {
        label: "字体粗细",
        component: "custom-input-number",
      },
      lineHeight: {
        label: "行高",
        component: "custom-input-number",
        unit: 'px',
      },
      letterSpacing: {
        label: "字间距",
        component: "custom-input-number",
        unit: 'px',
      },
      backgroundColor: {
        label: "背景颜色",
        component: "custom-color-picker",
      },
      borderWidth: {
        label: "边框宽度",
        component: "custom-input-number",
        unit: 'px',
      },
      borderStyle: {
        label: "边框风格",
        component: "custom-select",
        options: [
          {
            value: "solid",
            label: "实线",
          },
          {
            value: "dotted",
            label: "点线",
          },
          {
            value: "dashed",
            label: "虚线",
          },
        ],
      },
      borderColor: {
        label: "边框颜色",
        component: "custom-color-picker",
      },
      borderRadius: {
        label: "边框半径",
        component: "custom-input-number",
        unit: 'px',
      },
      opacity: {
        label: "透明度",
        component: "custom-input-number",
      },
      textAlign: {
        label: "左右对齐",
        component: "custom-select",
        options: [
          {
            value: "left",
            label: "左对齐",
          },
          {
            value: "center",
            label: "居中",
          },
          {
            value: "right",
            label: "右对齐",
          },
        ],
      },
      verticalAlign: {
        label: "垂直对齐",
        component: "custom-select",
        options: [
          {
            value: "top",
            label: "顶对齐",
          },
          {
            value: "middle",
            label: "居中",
          },
          {
            value: "bottom",
            label: "底对齐",
          },
        ],
      },
    };
    const store = useStore();
    const style = computed(() => store.state.curComponent.style);
    const styleList = computed(() =>
      Object.keys(style.value).map((key) => ({
        key,
        value: store.state.curComponent.style[key],
        label: styleMap[key].label,
        unit: styleMap[key].unit,
        component: styleMap[key].component,
        options: styleMap[key].options,
      }))
    );
    const handleValueChange = (key, value) => {
      console.log('key',key);
      console.log('value',value);
      store.commit("setCurComponentStyle", { key, value });
    };
    return {
      styleList,
      handleValueChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.attr-list {
  width: 100%;
  height: 100%;
}
</style>
