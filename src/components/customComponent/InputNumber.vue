
<template>
  <div class="custom-input-number">
    <CustomComponentItem :label="label" :unit="unit">
      <el-input-number
        :modelValue="+value"
        @change="handleChange"
        size="small"
        controls-position="right"
      ></el-input-number>
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

<style lang="scss" scoped>
</style>
