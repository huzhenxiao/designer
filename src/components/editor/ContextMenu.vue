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
import { computed } from "vue";
import { storeToRefs } from "pinia";
import {
  useMainStore,
  useContextmenuStore,
  useCopyStore,
  useLockStore,
  useSnapshotStore,
  useLayerStore
} from "@/store";
export default {
  setup() {
    const mainStore = useMainStore();
    const copyStore = useCopyStore();
    const lockStore = useLockStore();
    const snapshotStore = useSnapshotStore();
    const layerStore = useLayerStore();
    const { curComponent } = storeToRefs(mainStore);
    const { menuShow, menuLeft, menuTop } = storeToRefs(useContextmenuStore());

    const handleMouseUp = e => {
      mainStore.setClickComponentStatus(true);
    };
    const lock = e => {
      lockStore.lock();
    };
    const unlock = e => {
      lockStore.unlock();
    };
    const deleteComponent = e => {
      mainStore.deleteComponent();
      snapshotStore.recordSnapshot();
    };
    const setTop = () => {
      layerStore.setTopComponent();
      snapshotStore.recordSnapshot();
    };
    const setBottom = () => {
      layerStore.setBottomComponent();
      snapshotStore.recordSnapshot();
    };
    const setUp = () => {
      layerStore.setUpComponent();
      snapshotStore.recordSnapshot();
    };
    const setDown = () => {
      layerStore.setDownComponent();
      snapshotStore.recordSnapshot();
    };
    const copy = () => {
      copyStore.copy();
    };
    const cut = () => {
      copyStore.cut();
      snapshotStore.recordSnapshot();
    };
    const paste = () => {
      copyStore.paste(true);
      snapshotStore.recordSnapshot();
    };

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
      paste
    };
  }
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
