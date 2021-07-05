<template>
  <div
    class="contextmenu"
    v-show="menuShow"
    :style="{ left: `${menuLeft}px`, top: `${menuTop}px` }"
  >
    <ul>
      <template v-if="curComponent">
        <template v-if="!curComponent.isLock">
          <li>复制</li>
          <li>剪切</li>
          <li>删除</li>
          <li>锁定</li>
          <li>置顶</li>
          <li>置底</li>
          <li>上移</li>
          <li>下移</li>
        </template>
        <li v-else>解锁</li>
      </template>
      <li v-else>粘贴</li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();
    const menuShow = computed(() => store.state.menuShow);
    const menuLeft = computed(() => store.state.menuLeft);
    const menuTop = computed(() => store.state.menuTop);
    const curComponent = computed(() => store.state.curComponent);
    return {
      menuShow,
      menuLeft,
      menuTop,
      curComponent,
    };
  },
};
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;

  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: 6px 0;

    li {
      font-size: 14px;
      padding: 0 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background: #f5f7fa;
      }
    }
  }
}
</style>
