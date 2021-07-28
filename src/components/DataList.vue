<!--
 * @Author: your name
 * @Date: 2021-07-18 22:35:47
 * @LastEditTime: 2021-07-27 23:50:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /designer/my-designer/src/components/ComponentDataList.vue
-->
<template>
  <div class="data-list">
    <p class="component-name">{{curComponent.label}}</p>
    <component
      v-for="item in dataList"
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
import CustomTextarea from "./customComponent/CustomTextarea.vue";
export default {
  components: {
    CustomTextarea,
  },
  setup() {
    const dataMap = {
      propValue: {
        label: "内容",
        component: "custom-textarea",
      },
    };
    const store = useStore();
    const curComponent = computed(() => store.state.curComponent);
    const dataList = computed(() => {
      const result = Object.keys(store.state.curComponent.businessData).map((key) => ({
        key,
        value: store.state.curComponent.businessData[key],
        label: dataMap[key].label,
        unit: dataMap[key].unit,
        component: dataMap[key].component,
        options: dataMap[key].options,
      }));
      if(curComponent.value.component !== 'Group'){
        result.unshift({
          key: "propValue",
          value: store.state.curComponent.propValue,
          label: dataMap["propValue"].label,
          unit: dataMap["propValue"].unit,
          component: dataMap["propValue"].component,
          options: dataMap["propValue"].options,
        });
      }
      return result;
    });
    const handleValueChange = (key, value) => {
      console.log("key", key);
      console.log("value", value);
      store.commit("setCurComponentBusinessData", { key, value });
    };
    return {
      curComponent,
      dataList,
      handleValueChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.data-list {
  width: 100%;
  height: 100%;

  .component-name{
    font-size: 16px;
    color: #999;
    height: 30px;
    line-height: 30px;
    margin-bottom: 15px;
    padding: 10px 30px;
    border-bottom: 1px solid #ddd;
  }
}
</style>
