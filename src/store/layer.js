/*
 * @Author: your name
 * @Date: 2021-07-17 16:28:46
 * @LastEditTime: 2021-07-17 17:08:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/store/layer.js
 */

import { swap } from "utils/utils";
export default {
  mutations: {
    setTopComponent(state) {
      const { componentData, curComponentIndex } = state;
      if (curComponentIndex === componentData.length - 1) return;
      swap(componentData, curComponentIndex, componentData.length - 1);
      state.curComponentIndex = componentData.length - 1;
    },
    setBottomComponent(state) {
      const { componentData, curComponentIndex } = state;
      if (curComponentIndex === 0) return;
      swap(componentData, curComponentIndex, 0);
      state.curComponentIndex = 0;
    },
    setUpComponent(state) {
      const { componentData, curComponentIndex } = state;
      if (curComponentIndex === componentData.length - 1) return;
      swap(componentData, curComponentIndex, curComponentIndex + 1);
      state.curComponentIndex = curComponentIndex + 1;
    },
    setDownComponent(state) {
      const { componentData, curComponentIndex } = state;
      if (curComponentIndex === 0) return;
      swap(componentData, curComponentIndex, curComponentIndex - 1);
      state.curComponentIndex = curComponentIndex - 1;
    },
  },
};
