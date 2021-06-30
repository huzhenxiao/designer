<template>
  <div class="component-list" @dragstart="handleDragStart">
    <div
      v-for="(item, index) in componentList"
      :key="index"
      class="component-item"
      draggable="true"
      :data-index="index"
    >
      <div class="wrap-img">
        <i class="" :class="item.icon"></i>
      </div>
      <span class="text">{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
import componentList from "@/custom-component/componentList";
export default {
  name: "componentList",
  setup() {
    const handleDragStart = (e) => {
      e.dataTransfer.setData('index', e.target.dataset.index)
    };
    return {
      handleDragStart,
      componentList,
    };
  },
};
</script>

<style lang="scss" scoped>
.component-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;

  .component-item {
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
    text-align: center;
    border-radius: 2px;
    margin-bottom: 10px;
    color: #333;
    cursor: grab;

    &:hover {
      border-color: #3c78ff;
      color: #3c78ff;
    }
    .wrap-img {
      width: 30px;
      height: 30px;
      line-height: 30px;
      padding-top: 13px;
      margin: 0 auto;
    }

    .text {
      line-height: 24px;
      font-size: 15px;
    }

    &:active {
      cursor: grabbing;
    }
  }
}
</style>
