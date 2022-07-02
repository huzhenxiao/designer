<template>
  <div class="event-list">
    <p class="component-name">{{ curComponent.label }}</p>
    <component
      v-for="item in dataList"
      :is="item.type"
      :key="item.key"
      :label="item.label"
      :unit="item.unit"
      :value="item.value"
      :options="item.options"
      @valueChange="handleValueChange(item.key, $event)"
    ></component>
  </div>
</template>

<script>
import { computed,watch } from "vue";
import Textarea from "./customComponent/Textarea.vue";
import Click from "./customComponent/CustomClick/index.vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store";

export default {
  components: {
    Textarea,
    Click
  },
  setup() {
    const mainStore = useMainStore();
    const { curComponent } = storeToRefs(mainStore);
    
    const dataList = computed(() => {
      const result = Object.keys(curComponent.value.events).map(key => ({
        key,
        ...curComponent.value.events[key]
      }));
      return result;
    });
    const handleValueChange = (key, value) => {
      mainStore.setCurComponentBusinessData({ key, value });
    };
    return {
      curComponent,
      dataList,
      handleValueChange
    };
  }
};
</script>

<style lang="scss" scoped>
.event-list {
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
