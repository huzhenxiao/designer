<template>
  <div class="custom-input">
    <CustomComponentItem :label="label" :unit="unit">
      <el-color-picker v-model="value" @change="handleChange" size="small"></el-color-picker>
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
