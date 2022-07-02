<template>
  <div class="custom-textarea">
    <CustomComponentItem :label="label" :unit="unit">
      <el-input
        :modelValue="value"
        @input="handleChange"
        @change="handleChange"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 10 }"
        size="small"
      ></el-input>
    </CustomComponentItem>
  </div>
</template>

<script>
import CustomComponentItem from 'comps/CustomComponentItem.vue';
export default {
  components: {
    CustomComponentItem
  },
  props: {
    label: String,
    unit: String,
    value: {
      require: true
    }
  },
  setup(props, { emit }) {
    const handleChange = (value) => {
      emit('valueChange', value);
    };
    return {
      handleChange
    };
  }
};
</script>

<style lang="scss" scoped></style>
