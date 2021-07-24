<!--
 * @Author: your name
 * @Date: 2021-07-19 21:48:46
 * @LastEditTime: 2021-07-24 15:58:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /designer/my-designer/src/components/SetupItem.vue
-->
<template>
  <div class="custom-component-item">
    <span v-if="label" class="label">
      {{ label }}
    </span>
    <div class="content">
      <slot></slot>
    </div>
    <span v-if="unit" class="unit">
      {{unit}}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    unit: String,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.custom-component-item {
  width: 100%;
  display: flex;
  margin-bottom: 20px;

  .label {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #666;
    padding: 0 10px;
    flex: 0 0 60px;
  }
  .content {
    flex: 1 1 calc(100% - 90px);
  }
  .unit{
    line-height: 30px;
    font-size: 14px;
    color: #666;
    flex: 0 0 30px;
  }
}
</style>
