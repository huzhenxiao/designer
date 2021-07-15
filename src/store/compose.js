/*
 * @Author: your name
 * @Date: 2021-07-05 21:43:23
 * @LastEditTime: 2021-07-16 00:19:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/store/compose.js
 */
import { $ } from "utils/utils";

export default {
  state: {
    editor: null,
    areaData: {
      style: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      },
      components: [],
    },
  },
  mutations: {
    getEditor(state) {
      state.editor = $("#editor");
    },
    setAreaData(state, data) {
      state.areaData = data;
    },
  },
};
