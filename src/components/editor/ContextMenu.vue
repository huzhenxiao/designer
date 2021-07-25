<template>
  <div
    class="contextmenu"
    v-show="menuShow"
    :style="{ left: `${menuLeft}px`, top: `${menuTop}px` }"
  >
    <ul @mouseup="handleMouseUp">
      <template v-if="curComponent">
        <template v-if="!curComponent.isLock">
          <li @click="copy">复制</li>
          <li @click="cut">剪切</li>
          <li @click="deleteComponent">删除</li>
          <li @click="lock">锁定</li>
          <li @click="setTop">置顶</li>
          <li @click="setBottom">置底</li>
          <li @click="setUp">上移</li>
          <li @click="setDown">下移</li>
        </template>
        <li v-else @click="unlock">解锁</li>
      </template>
      <li v-else @click="paste">粘贴</li>
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

    const handleMouseUp = (e) => {
      store.commit("setClickComponentStatus", true);
    };
    const lock = (e) => {
      store.commit("lock");
    };
    const unlock = (e) => {
      store.commit("unlock");
    };
    const deleteComponent = (e) => {
      store.commit("deleteComponent");
    };
    const setTop = () => {
      store.commit("setTopComponent");
    };
    const setBottom = () => {
      store.commit("setBottomComponent");
    };
    const setUp = () => {
      store.commit("setUpComponent");
    };
    const setDown = () => {
      store.commit("setDownComponent");
    };
    const copy = () =>{
      store.commit("copy");
    }
    const cut = () =>{
      store.commit("cut");
    }
    const paste = () =>{
      store.commit("paste",true);
    }
    
    return {
      menuShow,
      menuLeft,
      menuTop,
      curComponent,
      handleMouseUp,
      lock,
      unlock,
      deleteComponent,
      setTop,
      setBottom,
      setUp,
      setDown,
      copy,
      cut,
      paste,
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
