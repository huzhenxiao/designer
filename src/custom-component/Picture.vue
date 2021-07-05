<template>
  <div class="picture">
    <img :src="propValue" draggable="false"/>
  </div>
</template>

<script>
export default {
  props: {
    propValue: {
      type: String,
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
