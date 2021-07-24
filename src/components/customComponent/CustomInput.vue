<!--
 * @Author: your name
 * @Date: 2021-07-19 22:50:44
 * @LastEditTime: 2021-07-24 15:36:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/components/setupComponent.vue/Input-number.vue
-->
<template>
  <div class="custom-input">
    <CustomComponentItem :label="label" :unit="unit">
      <el-input
        :modelValue="value"
        @input="handleChange"
        @change="handleChange"
        size="mini"
      ></el-input>
    </CustomComponentItem>
  </div>
</template>

<script>
import CustomComponentItem from "comps/CustomComponentItem.vue";
export default {
  components: {
    CustomComponentItem,
  },
  props: {
    label: String,
    unit: String,
    value: {
      require: true,
    },
  },
  setup(props, { emit }) {
    const handleChange = (value) => {
      emit("valueChange", value);
    };
    return {
      handleChange,
    };
  },
};
</script>

<style lang="scss" scoped></style>
