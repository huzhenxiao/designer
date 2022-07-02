<template>
  <div class="picture">
    <img :src="propValue.value" draggable="false"/>
  </div>
</template>

<script>
export default {
  props: {
    propValue: {
      type: Object,
      require: true,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.picture {
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
