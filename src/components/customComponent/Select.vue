<template>
  <div class="custom-select">
    <CustomComponentItem :label="label" :unit="unit">
      <el-select v-model="value" placeholder="请选择" size="small" @change="handleChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
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
    },
    options: {
      require: true,
      type: Array
    }
  },
  setup(props, { emit }) {
    console.log('props', props);

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
