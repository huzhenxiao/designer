/*
 * @Author: your name
 * @Date: 2021-07-25 22:46:21
 * @LastEditTime: 2021-07-26 22:31:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/store/snapshot.js
 */

import { deepClone } from "utils/utils";

export default {
  state: {
    snapshotData: [],
    snapshotIndex: -1,
  },
  mutations: {
    recordSnapshot(state) {
      state.snapshotData[++state.snapshotIndex] = deepClone(
        state.componentData
      );
      // undo过程中，添加新快照需要删除它后面的快照
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotData = state.snapshotData.slice(
          0,
          state.snapshotIndex + 1
        );
      }
    },
    undo(state) {
      if (state.snapshotIndex < 0) return;
      state.snapshotIndex--;
      this.commit(
        "setComponentData",
        deepClone(state.snapshotData[state.snapshotIndex])
      );
    },
    redo(state) {
      if (state.snapshotIndex === state.snapshotData.length - 1) return;
      state.snapshotIndex++;
      this.commit(
        "setComponentData",
        deepClone(state.snapshotData[state.snapshotIndex])
      );
    },
  },
};
