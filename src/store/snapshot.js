import { deepClone } from 'utils/utils';
import { defineStore } from 'pinia';
import { useMainStore } from './main';

const mainStore = useMainStore();

export const useSnapshotStore = defineStore({
  id: 'snapshot',
  state: () => ({
    snapshotData: [],
    snapshotIndex: -1
  }),
  actions: {
    recordSnapshot() {
      this.snapshotData[++this.snapshotIndex] = deepClone(mainStore.componentData);
      // undo过程中，添加新快照需要删除它后面的快照
      if (this.snapshotIndex < this.snapshotData.length - 1) {
        this.snapshotData = this.snapshotData.slice(0, this.snapshotIndex + 1);
      }
    },
    undo() {
      if (this.snapshotIndex < 0) return;
      this.snapshotIndex--;
      mainStore.setComponentData(deepClone(this.snapshotData[this.snapshotIndex]));
    },
    redo() {
      if (this.snapshotIndex === this.snapshotData.length - 1) return;
      this.snapshotIndex++;
      mainStore.setComponentData(deepClone(this.snapshotData[this.snapshotIndex]));
    }
  }
});
