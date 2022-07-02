<template>
  <div class="rect-shape">
    <iot-text :propValue="element.propValue" :element="element" />
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: Object
    }
  },
  setup() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.rect-shape {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
