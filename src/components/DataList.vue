<template>
  <div class="data-list">
    <p class="component-name">{{ curComponent.label }}</p>
    <component
      class="data-list-item"
      v-for="(item, key) in businessData"
      :is="item.type"
      :key="key"
      :label="item.label"
      :unit="item.unit"
      :value="item.value"
      :propName="key"
      :options="item.options"
      :data="item"
      :businessData="businessData"
      @valueChange="handleValueChange(key, $event)"
    ></component>
  </div>
</template>

<script>
import { computed, watch, watchEffect, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import Select from './customComponent/Select.vue';
import Textarea from './customComponent/Textarea.vue';
import Click from './customComponent/CustomClick/index.vue';
import IoTDataSource from './customComponent/IoTDataSource/index.vue';
import ThirdDataSource from './customComponent/ThirdDataSource/index.vue';
import ShowRule from './customComponent/ShowRule/index.vue';
import DataDetail from './customComponent/DataDetail/index';
import { useMainStore } from '@/store';

export default {
  components: {
    Select,
    Textarea,
    Click,
    IoTDataSource,
    ThirdDataSource,
    ShowRule,
    DataDetail
  },
  setup() {
    const mainStore = useMainStore();
    const { curComponent } = storeToRefs(mainStore);

    const { businessData } = curComponent.value;
    console.log('businessData', businessData);

    const handleValueChange = (key, value) => {
      console.log('==========businessDataChange============', key, value);
      mainStore.setCurComponentBusinessData({ key, value });
    };
    return {
      curComponent,
      businessData,
      handleValueChange
    };
  }
};
</script>

<style lang="scss" scoped>
.data-list {
  width: 100%;
  height: 100%;
  .data-list-item {
    margin-bottom: 10px;
  }

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
