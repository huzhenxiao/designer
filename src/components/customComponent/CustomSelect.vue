<!--
 * @Author: your name
 * @Date: 2021-07-19 22:50:44
 * @LastEditTime: 2021-07-24 15:08:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/components/setupComponent.vue/Input-number.vue
-->
<template>
  <div class="custom-select">
    <CustomComponentItem :label="label" :unit="unit">
      <el-select v-model="value" placeholder="请选择" size="mini" @change="handleChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
    options:{
      require: true,
      type:Array
    }
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
