<template>
  <div
    class="area"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      left: `${start.x}px`,
      top: `${start.y}px`,
    }"
  ></div>
</template>

<script>
export default {
  props: {
    start: {
      type: Object,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.area {
  position: absolute;
  border: 1px solid #70c0ff;
}
</style>
