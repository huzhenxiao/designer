<template>
  <div class="attr-list">
    <p class="component-name">{{ curComponent.label }}</p>
    <component
      v-for="item in styleList"
      :key="item.key"
      :label="item.label"
      :unit="item.unit"
      :is="item.type"
      :value="item.value"
      :options="item.options"
      @valueChange="handleValueChange(item.key, $event)"
    ></component>
  </div>
</template>

<script>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import InputNumber from './customComponent/InputNumber.vue';
import Input from './customComponent/Input.vue';
import Select from './customComponent/Select.vue';
import ColorPicker from './customComponent/ColorPicker.vue';

import { useMainStore } from '@/store';

export default {
  components: {
    InputNumber,
    Input,
    Select,
    ColorPicker
  },
  setup() {
    const mainainStore = useMainStore();
    const { curComponent } = storeToRefs(mainainStore);
    const styleList = computed(() =>
      Object.keys(curComponent.value.style).map((key) => ({
        key,
        ...curComponent.value.style[key]
      }))
    );

    const handleValueChange = (key, value) => {
      mainainStore.setCurComponentStyle({ key, value });
    };
    return {
      curComponent,
      styleList,
      handleValueChange
    };
  }
};
</script>

<style lang="scss" scoped>
.attr-list {
  width: 100%;
  height: 100%;

  .component-name {
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
