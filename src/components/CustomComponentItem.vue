<template>
  <div class="meta-component-item">
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
.meta-component-item {
  width: 100%;
  display: flex;
  margin-bottom: 20px;

  .label {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #666;
    padding: 0 10px;
    flex: 0 0 70px;
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
